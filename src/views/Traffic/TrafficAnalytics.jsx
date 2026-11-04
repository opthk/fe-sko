import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_heatmap from 'highcharts/modules/heatmap';
import PageHeader, { PageHeaderButton } from '../../components/PageHeader/PageHeader';
import { fetchPageAccess, fetchTrafficData } from './trafficAnalyticsApi';
import { buildAnalytics, toDateKey, addDays, formatDuration, HOUR_BLOCKS } from './trafficAnalyticsUtils';
import './TrafficAnalytics.css';

if (!Highcharts.seriesTypes.heatmap) HC_heatmap(Highcharts);

// ---- Chart tokens (dark surface #0f222c; palettes validated for CVD) ----
const C = {
  senkom: '#3987e5',    // categorical slot 1 (blue)  -> Gangguan / Senkom
  accident: '#d95926',  // categorical slot 2 (orange) -> Kecelakaan
  surface: '#0f222c',
  grid: 'rgba(255, 255, 255, 0.06)',
  axis: 'rgba(255, 255, 255, 0.18)',
  text: 'rgba(255, 255, 255, 0.88)',
  textMuted: 'rgba(255, 255, 255, 0.55)',
};

// Weather donut: categorical slots 3-7 (blue/orange already mean Gangguan/Kecelakaan).
// Ring adjacency (incl. wrap-around) validated on the dark surface; "Lainnya" is neutral grey.
const DONUT_COLORS = ['#199e70', '#c98500', '#d55181', '#9085e9'];
const DONUT_OTHER = '#5b6770';

const REDUCED_MOTION = typeof window !== 'undefined' && window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const easeOutQuart = t => 1 - Math.pow(1 - t, 4);
const ANIM = REDUCED_MOTION ? false : { duration: 900, easing: easeOutQuart };

const MAX_RANGE_DAYS = 366;

const PRESETS = [
  { key: '7d', label: '7 Hari', range: () => [addDays(new Date(), -6), new Date()] },
  { key: '30d', label: '30 Hari', range: () => [addDays(new Date(), -29), new Date()] },
  { key: '90d', label: '90 Hari', range: () => [addDays(new Date(), -89), new Date()] },
  { key: 'ytd', label: 'Tahun Ini', range: () => [new Date(new Date().getFullYear(), 0, 1), new Date()] },
];

Highcharts.setOptions({
  lang: {
    months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
    shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
    weekdays: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
    thousandsSep: '.',
    decimalPoint: ',',
  },
});

const fmt = n => Number(n || 0).toLocaleString('id-ID');
const pct = n => `${Math.round(n)}%`;
const perDay = (total, days) => (days ? (total / days).toLocaleString('id-ID', { maximumFractionDigits: 1 }) : '0');
const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));

const baseChart = (extra = {}) => Highcharts.merge({
  chart: {
    backgroundColor: 'transparent',
    style: { fontFamily: 'inherit' },
    spacing: [8, 4, 8, 4],
    animation: REDUCED_MOTION ? false : { duration: 500 },
  },
  title: { text: null },
  credits: { enabled: false },
  exporting: { enabled: false },
  legend: {
    itemStyle: { color: C.text, fontWeight: '500', fontSize: '12px' },
    itemHoverStyle: { color: '#fff' },
    symbolRadius: 2,
  },
  tooltip: {
    backgroundColor: '#0b1a22',
    borderColor: 'rgba(255, 255, 255, 0.14)',
    borderRadius: 10,
    shadow: false,
    style: { color: C.text, fontSize: '12px' },
  },
  xAxis: {
    lineColor: C.axis,
    tickColor: C.axis,
    gridLineColor: C.grid,
    labels: { style: { color: C.textMuted, fontSize: '11px' } },
  },
  yAxis: {
    gridLineColor: C.grid,
    title: { text: null },
    allowDecimals: false,
    labels: { style: { color: C.textMuted, fontSize: '11px' } },
  },
  plotOptions: {
    series: { animation: ANIM },
    column: { borderWidth: 0, borderRadius: 4, groupPadding: 0.12, pointPadding: 0.06 },
    bar: { borderWidth: 0, borderRadius: 4, groupPadding: 0.1, pointPadding: 0.08 },
    line: { lineWidth: 2, marker: { radius: 4, symbol: 'circle', lineWidth: 2, lineColor: C.surface } },
  },
}, extra);

const categoryAxis = labels => ({
  categories: labels,
  lineWidth: 0,
  tickLength: 0,
  labels: { style: { color: C.text, fontSize: '12px' } },
});

/** Number of leading categories that make up >= 80% of the total. */
const vitalFew = list => {
  const idx = list.findIndex(x => x.cum >= 80);
  return idx === -1 ? list.length : idx + 1;
};

/**
 * Pareto bar: sorted horizontal bars labelled "count · share", the "vital few"
 * (cumulative <= 80%) in full colour and the rest dimmed. Cumulative share is
 * shown in the tooltip, never on a second axis.
 */
const paretoBar = (data, color, seriesName) => {
  const few = vitalFew(data);
  const dim = Highcharts.color(color).setOpacity(0.38).get();
  return baseChart({
    chart: { type: 'bar', height: Math.max(220, data.length * 34 + 40) },
    legend: { enabled: false },
    xAxis: categoryAxis(data.map(d => d.name)),
    yAxis: { labels: { enabled: false }, gridLineWidth: 0 },
    tooltip: {
      useHTML: true,
      formatter() {
        const p = this.point;
        return `<b>${esc(p.category)}</b><br/>${seriesName}: <b>${fmt(p.y)}</b> (${pct(p.pct)})<br/>`
          + `<span style="color:${C.textMuted}">Kumulatif: ${pct(p.cum)}</span>`;
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          formatter() { return `${fmt(this.y)} · ${pct(this.point.pct)}`; },
          style: { color: C.text, textOutline: 'none', fontWeight: '600', fontSize: '11px' },
        },
      },
    },
    series: [{
      name: seriesName,
      data: data.map((d, i) => ({ y: d.y, pct: d.pct, cum: d.cum, color: i < few ? color : dim })),
    }],
  });
};

/** Lollipop: thin stem (bar) + dot (scatter). Same information as a bar, lighter ink. */
const lollipop = (data, color, seriesName) => baseChart({
  chart: { type: 'bar', height: Math.max(220, data.length * 34 + 40) },
  legend: { enabled: false },
  xAxis: categoryAxis(data.map(d => d.name)),
  yAxis: { labels: { enabled: false }, gridLineColor: C.grid, gridLineDashStyle: 'Dot' },
  tooltip: { pointFormat: `${seriesName}: <b>{point.y}</b>` },
  series: [
    {
      type: 'bar',
      name: seriesName,
      data: data.map(d => d.y),
      color: Highcharts.color(color).setOpacity(0.55).get(),
      pointWidth: 2,
      borderRadius: 0,
      enableMouseTracking: false,
    },
    {
      type: 'scatter',
      name: seriesName,
      data: data.map(d => d.y),
      color,
      marker: { symbol: 'circle', radius: 7, lineWidth: 2, lineColor: C.surface },
      dataLabels: {
        enabled: true,
        format: '{y}',
        align: 'left',
        verticalAlign: 'middle',
        x: 10,
        y: 0,
        style: { color: C.text, textOutline: 'none', fontWeight: '600', fontSize: '11px' },
      },
    },
  ],
});

const donut = (data) => baseChart({
  chart: { type: 'pie', height: 220, spacing: [0, 0, 0, 0] },
  legend: { enabled: false },
  tooltip: {
    pointFormat: 'Kecelakaan: <b>{point.y}</b> ({point.percentage:.0f}%)',
  },
  plotOptions: {
    pie: {
      innerSize: '70%',
      borderWidth: 2,
      borderColor: C.surface,
      dataLabels: { enabled: false },
      states: { hover: { halo: { size: 6, opacity: 0.15 } } },
      startAngle: -90,
    },
  },
  series: [{
    name: 'Kecelakaan',
    data: data.map((d, i) => ({
      name: d.name,
      y: d.y,
      color: d.name === 'Lainnya' ? DONUT_OTHER : DONUT_COLORS[i % DONUT_COLORS.length],
    })),
  }],
});

const heatmap = ({ categories, points, max }) => baseChart({
  chart: { type: 'heatmap', height: Math.max(240, categories.length * 42 + 90) },
  xAxis: {
    categories: HOUR_BLOCKS,
    lineWidth: 0,
    tickLength: 0,
    opposite: true,
    labels: { style: { color: C.textMuted, fontSize: '11px' } },
  },
  yAxis: {
    categories,
    reversed: true,
    gridLineWidth: 0,
    labels: { style: { color: C.text, fontSize: '12px' } },
  },
  // Sequential, one hue (orange = Kecelakaan): near-surface -> bright
  colorAxis: {
    min: 0,
    max: Math.max(1, max),
    minColor: '#1c3440',
    maxColor: '#ff8a4c',
    labels: { style: { color: C.textMuted, fontSize: '11px' } },
  },
  legend: {
    align: 'right',
    verticalAlign: 'bottom',
    symbolHeight: 8,
    symbolWidth: 200,
    title: { text: 'Jumlah kecelakaan', style: { color: C.textMuted, fontWeight: '500', fontSize: '11px' } },
  },
  tooltip: {
    useHTML: true,
    formatter() {
      const p = this.point;
      return `<b>${esc(categories[p.y])}</b><br/>Pukul ${HOUR_BLOCKS[p.x]}: <b>${fmt(p.value)}</b> kecelakaan`;
    },
  },
  plotOptions: {
    heatmap: { animation: REDUCED_MOTION ? false : { duration: 700 } },
  },
  series: [{
    name: 'Kecelakaan',
    borderWidth: 2,
    borderColor: C.surface,
    borderRadius: 4,
    data: points.map(([x, y, value]) => (value === 0
      ? { x, y, value, color: 'rgba(255, 255, 255, 0.03)' }
      : { x, y, value })),
    dataLabels: { enabled: false },
  }],
});

// ---- Small presentational components ----

const Panel = ({ title, subtitle, children, empty, className }) => (
  <div className={`sko-panel${className ? ` ${className}` : ''}`}>
    <div className="sko-panel__head">
      <h3 className="sko-panel__title">{title}</h3>
      {subtitle && <span className="sko-panel__subtitle">{subtitle}</span>}
    </div>
    {empty ? <div className="sko-panel__empty"><i className="icon-info" /> Tidak ada data pada periode ini</div> : children}
  </div>
);

/** Animated number (count-up). Instant when the user prefers reduced motion. */
class CountUp extends Component {
  constructor(props) {
    super(props);
    this.state = { shown: REDUCED_MOTION ? props.value : 0 };
  }

  componentDidMount() { this.animate(0, this.props.value); }

  componentDidUpdate(prev) {
    if (prev.value !== this.props.value) this.animate(this.state.shown, this.props.value);
  }

  componentWillUnmount() { cancelAnimationFrame(this.raf); }

  animate(from, to) {
    cancelAnimationFrame(this.raf);
    if (REDUCED_MOTION || from === to) {
      this.setState({ shown: to });
      return;
    }
    const start = performance.now();
    const duration = 800;
    const step = now => {
      const t = Math.min(1, (now - start) / duration);
      this.setState({ shown: Math.round(from + (to - from) * easeOutQuart(t)) });
      if (t < 1) this.raf = requestAnimationFrame(step);
    };
    this.raf = requestAnimationFrame(step);
  }

  render() { return fmt(this.state.shown); }
}

// KPI card: identical anatomy for every card (label + icon, value, footer)
// so all cards in the row are the same height.
const Kpi = ({ icon, label, value, unit, tone, children }) => (
  <div className={`sko-kpi sko-kpi--${tone}`}>
    <div className="sko-kpi__top">
      <span className="sko-kpi__label">{label}</span>
      <span className="sko-kpi__icon"><i className={icon} /></span>
    </div>
    <div className="sko-kpi__value">
      {value}
      {unit && <small>{unit}</small>}
    </div>
    <div className="sko-kpi__foot">{children}</div>
  </div>
);

const DonutLegend = ({ data, total }) => (
  <ul className="sko-donut__legend">
    {data.map((d, i) => (
      <li key={d.name}>
        <span
          className="sko-dot"
          style={{ background: d.name === 'Lainnya' ? DONUT_OTHER : DONUT_COLORS[i % DONUT_COLORS.length] }}
        />
        <span className="sko-donut__name">{d.name}</span>
        <b>{fmt(d.y)}</b>
        <span className="sko-donut__pct">{pct((d.y / (total || 1)) * 100)}</span>
      </li>
    ))}
  </ul>
);

class TrafficAnalytics extends Component {
  constructor(props) {
    super(props);
    const identity = this.getIdentity();
    const [start, end] = PRESETS[1].range();
    this.state = {
      identity,
      access: 'checking', // checking | granted | denied | error
      preset: '30d',
      startDate: toDateKey(start),
      endDate: toDateKey(end),
      ruas: '',
      loading: false,
      error: '',
      raw: null,
    };
  }

  getIdentity() {
    try {
      return JSON.parse(localStorage.getItem('identity')) || {};
    } catch (e) {
      return {};
    }
  }

  componentDidMount() {
    this.mounted = true;
    const { identity } = this.state;
    fetchPageAccess(this.props.location.pathname, identity.ID_GROUP)
      .then(codes => {
        if (!this.mounted) return;
        // Same rule as the CRUD pages: the role needs the "R" (read) action
        if (codes.indexOf('R') !== -1) {
          this.setState({ access: 'granted' }, this.loadData);
        } else {
          this.setState({ access: 'denied' });
        }
      })
      .catch(() => this.mounted && this.setState({ access: 'error' }));
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  loadData = () => {
    const { startDate, endDate, identity } = this.state;
    const span = (new Date(endDate) - new Date(startDate)) / 86400000 + 1;
    if (!startDate || !endDate || span < 1) {
      this.setState({ error: 'Tanggal akhir harus sama atau setelah tanggal mulai.' });
      return;
    }
    if (span > MAX_RANGE_DAYS) {
      this.setState({ error: `Rentang maksimal ${MAX_RANGE_DAYS} hari.` });
      return;
    }
    const reqId = (this.reqId || 0) + 1;
    this.reqId = reqId;
    this.setState({ loading: true, error: '' });
    fetchTrafficData({ startDate, endDate, branch: identity.branch_code })
      .then(raw => {
        if (!this.mounted || reqId !== this.reqId) return;
        this.setState({ raw, loading: false });
      })
      .catch(() => {
        if (!this.mounted || reqId !== this.reqId) return;
        this.setState({ loading: false, error: 'Gagal memuat data traffic. Coba lagi beberapa saat.' });
      });
  }

  applyPreset = (preset) => {
    const [start, end] = preset.range();
    this.setState({ preset: preset.key, startDate: toDateKey(start), endDate: toDateKey(end) }, this.loadData);
  }

  handleDateChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, preset: 'custom' });
  }

  renderAccessState() {
    const { access } = this.state;
    if (access === 'checking') {
      return <div className="sko-state"><span className="sko-state__spinner" /> Memeriksa hak akses...</div>;
    }
    return (
      <div className="sko-state sko-state--denied">
        <i className="icon-lock" />
        <h4>{access === 'denied' ? 'Akses ditolak' : 'Tidak dapat memeriksa hak akses'}</h4>
        <p>
          {access === 'denied'
            ? 'Role Anda tidak memiliki izin untuk melihat Traffic Analytics. Hubungi administrator untuk meminta akses.'
            : 'Terjadi kesalahan saat memeriksa hak akses. Muat ulang halaman atau coba lagi nanti.'}
        </p>
      </div>
    );
  }

  render() {
    const { access, preset, startDate, endDate, ruas, loading, error, raw, identity } = this.state;

    if (access !== 'granted') {
      return (
        <div className="animated fadeIn">
          <PageHeader icon="icon-graph" title="Traffic Analytics" subtitle="Analisis gangguan lalu lintas dan kecelakaan." />
          {this.renderAccessState()}
        </div>
      );
    }

    const isPusat = identity.branch_code === 'PUSAT';
    const ruasOptions = raw
      ? Array.from(new Set(raw.senkom.concat(raw.accident).map(r => r.RUAS_CODE).filter(Boolean))).sort()
      : [];
    const data = raw ? buildAnalytics({ ...raw, startDate, endDate, ruas }) : null;
    const t = data && data.totals;
    const showPerRuas = data && isPusat && !ruas && data.perRuas.length > 1;

    return (
      <div className="animated fadeIn sko-analytics">
        <PageHeader
          icon="icon-graph"
          title="Traffic Analytics"
          subtitle="Analisis gangguan lalu lintas (Senkom) dan kecelakaan berdasarkan periode."
        >
          <PageHeaderButton variant="ghost" icon={loading ? 'fa fa-refresh fa-spin' : 'fa fa-refresh'} onClick={this.loadData} disabled={loading}>
            Muat Ulang
          </PageHeaderButton>
        </PageHeader>

        {/* ---- Filters: one row above the charts ---- */}
        <div className="sko-filterbar">
          <div className="sko-filterbar__presets" role="group" aria-label="Periode">
            {PRESETS.map(p => (
              <button
                key={p.key}
                type="button"
                className={`sko-chip${preset === p.key ? ' is-active' : ''}`}
                onClick={() => this.applyPreset(p)}
                disabled={loading}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="sko-filterbar__range">
            <input type="date" name="startDate" value={startDate} max={endDate} onChange={this.handleDateChange} aria-label="Tanggal mulai" />
            <span>s/d</span>
            <input type="date" name="endDate" value={endDate} min={startDate} onChange={this.handleDateChange} aria-label="Tanggal akhir" />
            {preset === 'custom' && (
              <button type="button" className="sko-chip is-active" onClick={this.loadData} disabled={loading}>Terapkan</button>
            )}
          </div>
          {isPusat && ruasOptions.length > 1 && (
            <select className="sko-filterbar__select" value={ruas} onChange={e => this.setState({ ruas: e.target.value })} aria-label="Ruas">
              <option value="">Semua Ruas</option>
              {ruasOptions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          )}
        </div>

        {error && <div className="sko-alert"><i className="icon-exclamation" /> {error}</div>}

        {!data && loading && <div className="sko-state"><span className="sko-state__spinner" /> Memuat data traffic...</div>}

        {data && (
          <div className={loading ? 'sko-analytics__body is-loading' : 'sko-analytics__body'}>
            {/* ---- KPI tiles ---- */}
            <div className="sko-kpis">
              <Kpi icon="icon-earphones-alt" tone="senkom" label="Gangguan (Senkom)" value={<CountUp value={t.senkom} />} unit="kejadian">
                Rata-rata <b>{perDay(t.senkom, data.daily.senkom.length)}</b> / hari
              </Kpi>
              <Kpi icon="icon-shield" tone="accident" label="Kecelakaan" value={<CountUp value={t.accident} />} unit="kejadian">
                Rata-rata <b>{perDay(t.accident, data.daily.accident.length)}</b> / hari
              </Kpi>
              <Kpi icon="icon-clock" tone="handling" label="Rata-rata Penanganan" value={formatDuration(t.avgHandling)}>
                {t.handlingSamples
                  ? <React.Fragment>Info diterima → TKP clear · <b>{fmt(t.handlingSamples)}</b> data</React.Fragment>
                  : 'Belum ada data TKP clear'}
              </Kpi>
              <Kpi icon="icon-heart" tone="victim" label="Korban Kecelakaan" value={<CountUp value={t.light + t.heavy + t.fatal} />} unit="orang">
                <div className="sko-kpi__split">
                  <span><i>Ringan</i><b>{fmt(t.light)}</b></span>
                  <span><i>Berat</i><b>{fmt(t.heavy)}</b></span>
                  <span className="is-fatal"><i>Meninggal</i><b>{fmt(t.fatal)}</b></span>
                </div>
              </Kpi>
            </div>

            {/* ---- Trend ---- */}
            <Panel title="Tren Harian" subtitle="Jumlah kejadian per hari" empty={!t.senkom && !t.accident}>
              <HighchartsReact highcharts={Highcharts} options={baseChart({
                chart: { type: 'line', height: 300 },
                xAxis: { type: 'datetime', crosshair: { color: C.axis, width: 1 } },
                tooltip: { shared: true, xDateFormat: '%A, %e %B %Y' },
                legend: { align: 'right', verticalAlign: 'top' },
                plotOptions: { line: { marker: { enabled: data.daily.senkom.length <= 45 } } },
                series: [
                  { name: 'Gangguan', color: C.senkom, data: data.daily.senkom },
                  { name: 'Kecelakaan', color: C.accident, data: data.daily.accident },
                ],
              })} />
            </Panel>

            <Row>
              <Col xl="7">
                <Panel title="Distribusi Jam Kejadian" subtitle="Berdasarkan waktu info diterima" empty={!t.senkom && !t.accident}>
                  <HighchartsReact highcharts={Highcharts} options={baseChart({
                    chart: { type: 'column', height: 300 },
                    xAxis: { categories: Array.from({ length: 24 }, (_, h) => String(h).padStart(2, '0')), title: { text: 'Jam', style: { color: C.textMuted } } },
                    tooltip: { shared: true, headerFormat: '<b>Pukul {point.key}:00</b><br/>' },
                    legend: { align: 'right', verticalAlign: 'top' },
                    series: [
                      { name: 'Gangguan', color: C.senkom, data: data.hourly.senkom },
                      { name: 'Kecelakaan', color: C.accident, data: data.hourly.accident },
                    ],
                  })} />
                </Panel>
              </Col>
              <Col xl="5">
                <Panel
                  title="Jenis Gangguan"
                  subtitle={t.senkom ? `${vitalFew(data.interference)} jenis menyumbang 80% gangguan` : 'Senkom'}
                  empty={!t.senkom}
                >
                  <HighchartsReact highcharts={Highcharts} options={paretoBar(data.interference, C.senkom, 'Gangguan')} />
                </Panel>
              </Col>
            </Row>

            <Row>
              <Col xl="5">
                <Panel
                  title="Penyebab Kecelakaan"
                  subtitle={t.accident ? `${vitalFew(data.cause)} penyebab menyumbang 80% kecelakaan` : null}
                  empty={!t.accident}
                >
                  <HighchartsReact highcharts={Highcharts} options={paretoBar(data.cause, C.accident, 'Kecelakaan')} />
                </Panel>
              </Col>
              <Col md="6" xl="4">
                <Panel title="Jenis Kecelakaan" empty={!t.accident}>
                  <HighchartsReact highcharts={Highcharts} options={lollipop(data.accidentType, C.accident, 'Kecelakaan')} />
                </Panel>
              </Col>
              <Col md="6" xl="3">
                <Panel title="Cuaca Saat Kecelakaan" empty={!t.accident}>
                  <div className="sko-donut">
                    <div className="sko-donut__chart">
                      <HighchartsReact highcharts={Highcharts} options={donut(data.weather)} />
                      <div className="sko-donut__center" aria-hidden="true">
                        <b>{fmt(t.accident)}</b>
                        <span>kecelakaan</span>
                      </div>
                    </div>
                    <DonutLegend data={data.weather} total={t.accident} />
                  </div>
                </Panel>
              </Col>
            </Row>

            <Panel
              title="Penyebab Kecelakaan × Jam Kejadian"
              subtitle="Semakin terang, semakin sering terjadi"
              empty={!t.accident}
            >
              <HighchartsReact highcharts={Highcharts} options={heatmap(data.causeByHour)} />
            </Panel>

            <Row>
              {showPerRuas && (
                <Col xl="5">
                  <Panel title="Per Ruas" subtitle="Gangguan & kecelakaan">
                    <HighchartsReact highcharts={Highcharts} options={baseChart({
                      chart: { type: 'bar', height: Math.max(260, data.perRuas.length * 44 + 60) },
                      xAxis: categoryAxis(data.perRuas.map(r => r.name)),
                      yAxis: { gridLineColor: C.grid },
                      tooltip: { shared: true },
                      legend: { align: 'right', verticalAlign: 'top' },
                      series: [
                        { name: 'Gangguan', color: C.senkom, data: data.perRuas.map(r => r.senkom) },
                        { name: 'Kecelakaan', color: C.accident, data: data.perRuas.map(r => r.accident) },
                      ],
                    })} />
                  </Panel>
                </Col>
              )}
              <Col xl={showPerRuas ? 7 : 12}>
                <Panel title="Titik Rawan (STA)" subtitle="10 lokasi dengan kejadian terbanyak" empty={!data.hotspots.length}>
                  <div className="sko-hotspots">
                    <table>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>STA</th>
                          <th>Ruas</th>
                          <th>Jalur</th>
                          <th className="num">Gangguan</th>
                          <th className="num">Kecelakaan</th>
                          <th className="num">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.hotspots.map((h, i) => (
                          <tr key={h.sta} style={{ animationDelay: `${i * 40}ms` }}>
                            <td className="muted">{i + 1}</td>
                            <td className="strong">{h.sta}</td>
                            <td>{h.ruas}</td>
                            <td>{h.lane}</td>
                            <td className="num"><span className="sko-dot" style={{ background: C.senkom }} />{h.senkom}</td>
                            <td className="num"><span className="sko-dot" style={{ background: C.accident }} />{h.accident}</td>
                            <td className="num">
                              <div className="sko-hotspots__total">
                                <span className="sko-hotspots__track">
                                  <span className="sko-hotspots__bar" style={{ width: `${(h.total / data.hotspots[0].total) * 100}%` }} />
                                </span>
                                <b>{h.total}</b>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Panel>
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  myIdentity: state.user.myIdentity,
});

export default connect(mapStateToProps)(TrafficAnalytics);
