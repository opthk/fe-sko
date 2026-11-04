// Pure helpers that turn raw Senkom / Accident rows into chart-ready data.

const pad = n => String(n).padStart(2, '0');

export const toDateKey = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const addDays = (d, n) => {
  const r = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  r.setDate(r.getDate() + n);
  return r;
};

/**
 * Parse the backend date strings. Accepts "YYYY-MM-DD HH:mm[:ss]",
 * ISO strings (with or without Z) and "DD-MM-YYYY HH:mm" / "DD/MM/YYYY HH:mm".
 */
export function parseDateTime(value) {
  if (!value) return null;
  if (value instanceof Date) return isNaN(value) ? null : value;
  const s = String(value).trim();

  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2}))?$/);
  if (m) return new Date(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +(m[6] || 0));

  m = s.match(/^(\d{2})[-/](\d{2})[-/](\d{4})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?$/);
  if (m) return new Date(+m[3], +m[2] - 1, +m[1], +(m[4] || 0), +(m[5] || 0), +(m[6] || 0));

  m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m) return new Date(+m[1], +m[2] - 1, +m[3]);

  const d = new Date(s);
  return isNaN(d) ? null : d;
}

const num = v => {
  const n = Number(v);
  return isFinite(n) ? n : 0;
};

const clean = (v, fallback = 'Tidak diketahui') => {
  const s = v === null || v === undefined ? '' : String(v).trim();
  return s || fallback;
};

/** Count rows by a key, return [{name, y}] sorted desc, folding the tail into "Lainnya". */
export function countBy(rows, getKey, limit = 8) {
  const map = new Map();
  rows.forEach(r => {
    const k = getKey(r);
    map.set(k, (map.get(k) || 0) + 1);
  });
  const sorted = Array.from(map, ([name, y]) => ({ name, y })).sort((a, b) => b.y - a.y);
  if (sorted.length <= limit) return sorted;
  const head = sorted.slice(0, limit);
  const rest = sorted.slice(limit).reduce((s, x) => s + x.y, 0);
  return head.concat([{ name: 'Lainnya', y: rest }]);
}

export function buildAnalytics({ senkom, accident, startDate, endDate, ruas }) {
  const inRuas = r => !ruas || clean(r.RUAS_CODE, '') === ruas;
  const s = senkom.filter(inRuas).map(r => ({ ...r, _t: parseDateTime(r.EVENT_TIME) }));
  const a = accident.filter(inRuas).map(r => ({ ...r, _t: parseDateTime(r.EVENT_TIME) }));

  // ---- KPIs ----
  const injuries = a.reduce((acc, r) => ({
    light: acc.light + num(r.LIGHT_INJURY),
    heavy: acc.heavy + num(r.HEAVY_INJURY),
    fatal: acc.fatal + num(r.FATALITY),
  }), { light: 0, heavy: 0, fatal: 0 });

  // Handling duration: info received -> TKP clear (minutes), ignore bad/outlier rows
  const durations = s
    .map(r => {
      const clear = parseDateTime(r.TKP_CLEAR);
      if (!r._t || !clear) return null;
      const min = (clear - r._t) / 60000;
      return min >= 0 && min <= 24 * 60 ? min : null;
    })
    .filter(v => v !== null);
  const avgHandling = durations.length
    ? durations.reduce((x, y) => x + y, 0) / durations.length
    : null;

  // ---- Daily trend (every day in range, zero-filled) ----
  const start = parseDateTime(startDate);
  const end = parseDateTime(endDate);
  const days = [];
  if (start && end) {
    for (let d = start; d <= end; d = addDays(d, 1)) days.push(toDateKey(d));
  }
  const dayIndex = new Map(days.map((k, i) => [k, i]));
  const dailyS = days.map(() => 0);
  const dailyA = days.map(() => 0);
  s.forEach(r => { if (r._t && dayIndex.has(toDateKey(r._t))) dailyS[dayIndex.get(toDateKey(r._t))]++; });
  a.forEach(r => { if (r._t && dayIndex.has(toDateKey(r._t))) dailyA[dayIndex.get(toDateKey(r._t))]++; });
  const toUTC = k => {
    const [y, m, d] = k.split('-').map(Number);
    return Date.UTC(y, m - 1, d);
  };
  const daily = {
    senkom: days.map((k, i) => [toUTC(k), dailyS[i]]),
    accident: days.map((k, i) => [toUTC(k), dailyA[i]]),
  };

  // ---- Hour of day ----
  const hourlyS = Array(24).fill(0);
  const hourlyA = Array(24).fill(0);
  s.forEach(r => { if (r._t) hourlyS[r._t.getHours()]++; });
  a.forEach(r => { if (r._t) hourlyA[r._t.getHours()]++; });

  // ---- Per ruas ----
  const ruasKeys = Array.from(new Set(
    s.map(r => clean(r.RUAS_CODE)).concat(a.map(r => clean(r.RUAS_CODE)))
  ));
  const perRuas = ruasKeys
    .map(k => ({
      name: k,
      senkom: s.filter(r => clean(r.RUAS_CODE) === k).length,
      accident: a.filter(r => clean(r.RUAS_CODE) === k).length,
    }))
    .sort((x, y) => (y.senkom + y.accident) - (x.senkom + x.accident));

  // ---- STA hotspots ----
  const sta = new Map();
  const bump = (r, field) => {
    const key = clean(r.STA, '').toUpperCase();
    if (!key) return;
    const cur = sta.get(key) || { sta: key, ruas: clean(r.RUAS_CODE, '-'), lane: new Set(), senkom: 0, accident: 0 };
    cur[field]++;
    if (r.LANE) cur.lane.add(String(r.LANE).trim().toUpperCase());
    sta.set(key, cur);
  };
  s.forEach(r => bump(r, 'senkom'));
  a.forEach(r => bump(r, 'accident'));
  const hotspots = Array.from(sta.values())
    .map(x => ({ ...x, lane: Array.from(x.lane).sort().join(', ') || '-', total: x.senkom + x.accident }))
    .sort((x, y) => y.total - x.total)
    .slice(0, 10);

  const cause = countBy(a, r => clean(r.ACCIDENT_CAUSE));

  return {
    totals: { senkom: s.length, accident: a.length, ...injuries, avgHandling, handlingSamples: durations.length },
    daily,
    hourly: { senkom: hourlyS, accident: hourlyA },
    interference: withPareto(countBy(s, r => clean(r.INTERFERENCE_TYPE))),
    cause: withPareto(cause),
    weather: countBy(a, r => clean(r.WEATHER_NAME), 4),
    accidentType: countBy(a, r => clean(r.ACCIDENT_TYPE)),
    causeByHour: crossByHourBlock(a, r => clean(r.ACCIDENT_CAUSE), 6),
    perRuas,
    hotspots,
  };
}

/** Adds share (%) and cumulative share (%) to a sorted count list (Pareto). */
export function withPareto(list) {
  const total = list.reduce((s, x) => s + x.y, 0) || 1;
  let cum = 0;
  return list.map(x => {
    cum += x.y;
    return { ...x, pct: (x.y / total) * 100, cum: (cum / total) * 100 };
  });
}

export const HOUR_BLOCKS = ['00–03', '03–06', '06–09', '09–12', '12–15', '15–18', '18–21', '21–24'];

/**
 * Category × 3-hour block matrix for a heatmap.
 * Rows = top `limit` categories (rest folded into "Lainnya").
 */
export function crossByHourBlock(rows, getKey, limit = 6) {
  const top = countBy(rows, getKey, limit).map(x => x.name);
  const topSet = new Set(top);
  const matrix = top.map(() => Array(HOUR_BLOCKS.length).fill(0));
  rows.forEach(r => {
    if (!r._t) return;
    let k = getKey(r);
    if (!topSet.has(k)) k = 'Lainnya';
    const yi = top.indexOf(k);
    if (yi === -1) return;
    matrix[yi][Math.floor(r._t.getHours() / 3)]++;
  });
  const points = [];
  let max = 0;
  matrix.forEach((row, y) => row.forEach((value, x) => {
    points.push([x, y, value]);
    if (value > max) max = value;
  }));
  return { categories: top, points, max };
}

export function formatDuration(minutes) {
  if (minutes === null || minutes === undefined) return '-';
  const m = Math.round(minutes);
  if (m < 60) return `${m} mnt`;
  return `${Math.floor(m / 60)} j ${pad(m % 60)} mnt`;
}
