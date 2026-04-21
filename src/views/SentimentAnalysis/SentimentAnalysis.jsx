import React, { Component } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { FaCommentAlt, FaThumbsUp } from 'react-icons/fa';
import { FaSmile, FaMeh, FaFrown, FaBullhorn } from 'react-icons/fa';
import { config } from '../../config';
import {
  Alert,
  Badge,
  Button,
  CardBody,
  CardHeader,
  Col,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Row,
  Spinner,
  Table,
} from 'reactstrap';

const THEME_PRIMARY = '#1d4478';
const THEME_PANEL = '#16345d';
const THEME_BORDER = '#3563a0';
const THEME_TEXT = '#eef4fb';
const THEME_MUTED = '#b2c4de';
const THEME_ACCENT = '#5e88bf';
const THEME_GLOW = '0 0 20px rgba(29, 68, 120, 0.28)';

const CAMPAIGNS = [
  { id: 32309, name: 'ATP' },
  { id: 32314, name: 'BENGTABA' },
  { id: 32324, name: 'BETEJAM' },
  { id: 32319, name: 'BINSA' },
  { id: 32322, name: 'INKIS' },
  { id: 32313, name: 'INPRABU' },
  { id: 32310, name: 'JORRS' },
  { id: 32318, name: 'PACIN' },
  { id: 32312, name: 'PALINDRA' },
  { id: 32316, name: 'PEKBANGPAR' },
  { id: 32315, name: 'PERMAI' },
  { id: 32323, name: 'SIBANCEH' },
  { id: 32311, name: 'TERPEKA' },
];

const CHANNEL_MAP = {
  1: 'Twitter',
  2: 'Facebook',
  3: 'Online Media',
  4: 'Forum',
  5: 'Blog',
  6: 'Instagram',
  7: 'Youtube',
  8: 'Printed Media',
  9: 'Radio',
  10: 'TV',
  11: 'Tiktok',
};

let neonBorderInstance = 0;

function buildRoundedRectPath(width, height, radius, inset) {
  const x = inset;
  const y = inset;
  const w = width - inset * 2;
  const h = height - inset * 2;
  const r = Math.min(radius, w / 2, h / 2);

  return `
    M ${x + r} ${y}
    H ${x + w - r}
    Q ${x + w} ${y} ${x + w} ${y + r}
    V ${y + h - r}
    Q ${x + w} ${y + h} ${x + w - r} ${y + h}
    H ${x + r}
    Q ${x} ${y + h} ${x} ${y + h - r}
    V ${y + r}
    Q ${x} ${y} ${x + r} ${y}
  `.replace(/\s+/g, ' ').trim();
}

function getRoundedRectPathLength(width, height, radius, inset) {
  const w = width - inset * 2;
  const h = height - inset * 2;
  const r = Math.min(radius, w / 2, h / 2);

  return 2 * (w + h - 2 * r) + 2 * Math.PI * r;
}

class MovingGlowBorder extends Component {
  constructor(props) {
    super(props);

    this.uid = `moving-glow-border-${neonBorderInstance += 1}`;
    this.rafId = 0;
    this.lastTime = 0;
    this.state = {
      dashOffset: 0,
      angle: 0,
    };

    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    this.setInitialState();
    this.rafId = window.requestAnimationFrame(this.animate);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.rafId);
  }

  getPathLength() {
    const { svgWidth, svgHeight, radius, inset } = this.props;
    return getRoundedRectPathLength(svgWidth, svgHeight, radius, inset);
  }

  setInitialState() {
    const { randomStart, startProgress, startAngle } = this.props;
    const pathLength = this.getPathLength();

    if (randomStart) {
      this.setState({
        dashOffset: -pathLength * Math.random(),
        angle: Math.random() * 360,
      });
      return;
    }

    const safeProgress = Math.max(0, Math.min(1, startProgress));
    this.setState({
      dashOffset: -pathLength * safeProgress,
      angle: startAngle % 360,
    });
  }

  animate(time) {
    const { speed, gradientRotateSpeed } = this.props;

    if (!this.lastTime) {
      this.lastTime = time;
    }

    const delta = time - this.lastTime;
    this.lastTime = time;

    this.setState((prevState) => {
      const pathLength = this.getPathLength();
      let dashOffset = prevState.dashOffset - ((delta * speed) / 18);
      const angle = (prevState.angle + ((delta * gradientRotateSpeed) / 20)) % 360;

      if (Math.abs(dashOffset) > pathLength) {
        dashOffset = 0;
      }

      return {
        dashOffset,
        angle,
      };
    });

    this.rafId = window.requestAnimationFrame(this.animate);
  }

  render() {
    const {
      svgWidth,
      svgHeight,
      radius,
      inset,
      baseColor,
      baseStrokeWidth,
      bandStrokeWidth,
      coreStrokeWidth,
      glowStrokeWidth,
      bandRatio,
      glowBlur,
      glowSpreadX,
      glowSpreadY,
      glowAlpha,
      glowOpacity,
      bandOpacity,
      gradientStops,
    } = this.props;
    const { dashOffset, angle } = this.state;
    const borderPath = buildRoundedRectPath(svgWidth, svgHeight, radius, inset);
    const pathLength = this.getPathLength();
    const bandLength = pathLength * bandRatio;
    const gapLength = Math.max(0, pathLength - bandLength);
    const rad = (angle * Math.PI) / 180;
    const cx = 0.5;
    const cy = 0.5;
    const rx = Math.cos(rad) * 0.8;
    const ry = Math.sin(rad) * 0.8;
    const gradientCoords = {
      x1: cx - rx,
      y1: cy - ry,
      x2: cx + rx,
      y2: cy + ry,
    };

    return (
      <div style={styles.neonSvgOverlay}>
        <svg
          style={styles.neonSvg}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="none"
          shapeRendering="geometricPrecision"
        >
          <defs>
            <filter id={`${this.uid}-glow`} x="-250%" y="-250%" width="600%" height="600%">
              <feGaussianBlur in="SourceGraphic" stdDeviation={glowBlur} result="blur1" />
              <feColorMatrix
                in="blur1"
                type="matrix"
                values={`
                  1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 ${glowAlpha} 0
                `}
                result="glow1"
              />
              <feGaussianBlur
                in="glow1"
                stdDeviation={`${glowSpreadX} ${glowSpreadY}`}
                result="glow2"
              />
              <feMerge>
                <feMergeNode in="glow2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient
              id={`${this.uid}-moving-gradient`}
              x1={gradientCoords.x1}
              y1={gradientCoords.y1}
              x2={gradientCoords.x2}
              y2={gradientCoords.y2}
              gradientUnits="objectBoundingBox"
            >
              {gradientStops.map((stop, index) => (
                <stop
                  key={`${this.uid}-stop-${index}`}
                  offset={stop.offset}
                  stopColor={stop.color}
                  stopOpacity={typeof stop.opacity === 'number' ? stop.opacity : 1}
                />
              ))}
            </linearGradient>
          </defs>

          <path
            d={borderPath}
            fill="none"
            stroke={baseColor}
            strokeWidth={baseStrokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d={borderPath}
            fill="none"
            stroke={`url(#${this.uid}-moving-gradient)`}
            strokeWidth={glowStrokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={`${bandLength} ${gapLength}`}
            strokeDashoffset={dashOffset}
            filter={`url(#${this.uid}-glow)`}
            opacity={glowOpacity}
          />

          <path
            d={borderPath}
            fill="none"
            stroke={`url(#${this.uid}-moving-gradient)`}
            strokeWidth={bandStrokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={`${bandLength} ${gapLength}`}
            strokeDashoffset={dashOffset}
            opacity={bandOpacity}
          />

          <path
            d={borderPath}
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth={coreStrokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={`${bandLength} ${gapLength}`}
            strokeDashoffset={dashOffset}
          />
        </svg>
      </div>
    );
  }
}

MovingGlowBorder.defaultProps = {
  svgWidth: 100,
  svgHeight: 100,
  radius: 1,
  inset: 0.7,
  baseColor: 'rgba(255,255,255,0.07)',
  baseStrokeWidth: 0.8,
  bandStrokeWidth: 1.15,
  coreStrokeWidth: 0.95,
  glowStrokeWidth: 1.95,
  bandRatio: 0.5,
  speed: 0.55,
  gradientRotateSpeed: 0.16,
  glowBlur: 0.7,
  glowSpreadX: 1.35,
  glowSpreadY: 1.35,
  glowAlpha: 1.9,
  glowOpacity: 1,
  bandOpacity: 1,
  randomStart: true,
  startProgress: 0,
  startAngle: 0,
  gradientStops: [
    { offset: '0%', color: '#58E6FF', opacity: 0 },
    { offset: '12%', color: '#58E6FF', opacity: 1 },
    { offset: '38%', color: '#5EA8FF', opacity: 1 },
    { offset: '78%', color: '#217aefff', opacity: 0.95 },
    { offset: '100%', color: '#58E6FF', opacity: 0 },
  ],
};

class NeonCard extends Component {
  render() {
    const { children, className, style, contentStyle, showCorner } = this.props;

    return (
      <div className={className} style={{ ...styles.neonCardShell, ...style }}>
        <MovingGlowBorder />
        <div style={{ ...styles.neonCardFrame, ...contentStyle }}>
          {showCorner ? <div style={styles.neonCorner}></div> : null}
          {children}
        </div>
      </div>
    );
  }
}

NeonCard.defaultProps = {
  className: 'mb-4',
  style: {},
  contentStyle: {},
  showCorner: true,
};

function toInputDate(date) {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
}

function toApiDate(value) {
  return value.replace(/-/g, '');
}

function toStartUnix(value) {
  return Math.floor(new Date(`${value}T00:00:00`).getTime() / 1000);
}

function toEndUnix(value) {
  return Math.floor(new Date(`${value}T23:59:59`).getTime() / 1000);
}

function formatPublishedDate(unixTs) {
  if (!unixTs) {
    return '-';
  }

  return new Date(unixTs * 1000).toLocaleString('id-ID');
}

function getPostTitle(post) {
  // 🔥 kalau channel_id_i = 7, pakai title_t
  if (String(post.channel_id_i) === '7') {
    return post.title_t || '-';
  }

  if (String(post.channel_id_i) === '8') {
    return post.description_t || '-';
  }

  // default fallback
  return post.content_t || post.message_t || post.object_id_s || '-';
}

function getSentimentLabel(value) {
  if (value === 1) {
    return 'Positif';
  }
  if (value === -1) {
    return 'Negatif';
  }
  return 'Netral';
}

function getChannelLabel(channelId) {
  return CHANNEL_MAP[channelId] || '-';
}

function getAuthorLabel(post) {
  return post.channel_title_s || post.channel_name_s || post.channel_title || post.author_name_s || post.author_username_s || post.username_s || post.omni_author_t || 'Anonymous';
}

function getAudienceLabel(post) {
  if (post.author_num_audiences_l) {
    return `${Intl.NumberFormat('id-ID', { notation: 'compact', maximumFractionDigits: 1 }).format(post.author_num_audiences_l)} audience`;
  }

  if (post.author_follower_count_l) {
    return `${Intl.NumberFormat('id-ID', { notation: 'compact', maximumFractionDigits: 1 }).format(post.author_follower_count_l)} followers`;
  }

  return 'Anonymous';
}

function getCampaignNames(post) {
  if (!post.campaign_id_ls || !post.campaign_id_ls.length) {
    return [];
  }

  return post.campaign_id_ls.map((id) => {
    const matched = CAMPAIGNS.find((campaign) => campaign.id === id);
    return matched ? matched.name : String(id);
  });
}

function limitList(items, limit) {
  if (!items || !items.length) {
    return [];
  }

  return items.slice(0, limit);
}

function getDefaultStartDate() {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - 7);
  return toInputDate(start);
}

function getDefaultEndDate() {
  return toInputDate(new Date());
}

function getTodayDate() {
  return toInputDate(new Date());
}

function getDateBefore(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return toInputDate(date);
}

function getSentimentCount(sentiments, key) {
  if (!sentiments) {
    return 0;
  }

  const keyMap = {
    '1': ['1', 'positive'],
    '0': ['0', 'neutral'],
    '-1': ['-1', 'negative'],
  };

  const aliases = keyMap[key] || [key];

  for (let i = 0; i < aliases.length; i += 1) {
    const alias = aliases[i];
    if (typeof sentiments[alias] !== 'undefined' && sentiments[alias] !== null) {
      return Number(sentiments[alias]) || 0;
    }
  }

  return 0;
}

function calculateTotals(campaignSummaries) {
  return campaignSummaries.reduce((accumulator, item) => {
    const positive = getSentimentCount(item.total_sentiments, '1');
    const neutral = getSentimentCount(item.total_sentiments, '0');
    const negative = getSentimentCount(item.total_sentiments, '-1');

    return {
      positive: accumulator.positive + positive,
      neutral: accumulator.neutral + neutral,
      negative: accumulator.negative + negative,
      mentions: accumulator.mentions + positive + neutral + negative,
    };
  }, {
    positive: 0,
    neutral: 0,
    negative: 0,
    mentions: 0,
  });
}

function calculatePercentage(value, total) {
  if (!total) {
    return 0;
  }

  return Math.round((value / total) * 100);
}

function getTopNegativeIssues(campaignSummaries, limit = 4) {
  return campaignSummaries
    .map((item) => {
      const positive = getSentimentCount(item.total_sentiments, '1');
      const neutral = getSentimentCount(item.total_sentiments, '0');
      const negative = getSentimentCount(item.total_sentiments, '-1');
      const mentions = positive + neutral + negative;

      return {
        id: item.id,
        name: item.name,
        negative,
        mentions,
        negativeRate: calculatePercentage(negative, mentions),
      };
    })
    .filter((item) => item.negative > 0)
    .sort((a, b) => {
      if (b.negative !== a.negative) {
        return b.negative - a.negative;
      }

      return b.negativeRate - a.negativeRate;
    })
    .slice(0, limit);
}

class SentimentAnalysis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datePreset: 'last_7',
      startDate: getDefaultStartDate(),
      endDate: getDefaultEndDate(),
      selectedCampaignId: 'ALL',
      filtersExpanded: false,
      postsModalOpen: false,
      loading: false,
      postsLoading: false,
      error: '',
      postsError: '',
      tokenExpiry: null,
      campaignSummaries: [],
      selectedCampaign: null,
      campaignPosts: [],
      totals: {
        positive: 0,
        neutral: 0,
        negative: 0,
        mentions: 0,
      },
      failedCampaigns: [],
      postsSentimentFilter: 'ALL',
      expandedPosts: {},
      failedPostImages: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCampaignFilterChange = this.handleCampaignFilterChange.bind(this);
    this.handleFilterMouseEnter = this.handleFilterMouseEnter.bind(this);
    this.handleFilterMouseLeave = this.handleFilterMouseLeave.bind(this);
    this.loadSummaries = this.loadSummaries.bind(this);
    this.togglePostsModal = this.togglePostsModal.bind(this);
    this.loadCampaignPosts = this.loadCampaignPosts.bind(this);
    this.handlePostImageError = this.handlePostImageError.bind(this);
  }

  componentDidMount() {
    this.loadSummaries();
  }

  handleChange(e) {
    const { name, value } = e.target;

    if (name === 'datePreset') {
      if (value === 'today') {
        const today = getTodayDate();
        this.setState({
          datePreset: value,
          startDate: today,
          endDate: today,
        });
        return;
      }

      if (value === 'last_7') {
        this.setState({
          datePreset: value,
          startDate: getDateBefore(7),
          endDate: getTodayDate(),
        });
        return;
      }

      if (value === 'last_30') {
        this.setState({
          datePreset: value,
          startDate: getDateBefore(30),
          endDate: getTodayDate(),
        });
        return;
      }

      this.setState({
        datePreset: value,
      });
      return;
    }

    if (name === 'startDate' || name === 'endDate') {
      this.setState({
        datePreset: 'custom',
        [name]: value,
      });
      return;
    }

    this.setState({
      [name]: value,
    });
  }

  handleCampaignFilterChange(e) {
    this.setState({
      selectedCampaignId: e.target.value,
    });
  }

  handlePostImageError(postId) {
    this.setState((prevState) => {
      if (prevState.failedPostImages[postId]) {
        return null;
      }

      return {
        failedPostImages: {
          ...prevState.failedPostImages,
          [postId]: true,
        },
      };
    });
  }

  handleFilterMouseEnter() {
    if (!this.state.loading) {
      this.setState({ filtersExpanded: true });
    }
  }

  handleFilterMouseLeave() {
    this.setState({ filtersExpanded: false });
  }

  async applyPreset(preset) {
    if (preset === 'today') {
      this.setState({
        datePreset: preset,
        startDate: getTodayDate(),
        endDate: getTodayDate(),
      }, this.loadSummaries);
      return;
    }

    if (preset === 'last_7') {
      this.setState({
        datePreset: preset,
        startDate: getDateBefore(7),
        endDate: getTodayDate(),
      }, this.loadSummaries);
      return;
    }

    if (preset === 'last_30') {
      this.setState({
        datePreset: preset,
        startDate: getDateBefore(30),
        endDate: getTodayDate(),
      }, this.loadSummaries);
      return;
    }

    this.setState({
      datePreset: preset,
    });
  }

  togglePostsModal() {
    this.setState((prevState) => ({
      postsModalOpen: !prevState.postsModalOpen,
      postsError: '',
      postsLoading: false,
      postsSentimentFilter: 'ALL',
      campaignPosts: prevState.postsModalOpen ? [] : prevState.campaignPosts,
      selectedCampaign: prevState.postsModalOpen ? null : prevState.selectedCampaign,
    }));
  }

  async loadSummaries() {
    const { startDate, endDate } = this.state;
    const token = localStorage.getItem('x-access-token');

    if (!token) {
      this.setState({
        error: 'Token login tidak ditemukan. Silakan login ulang terlebih dahulu.',
      });
      return;
    }

    this.setState({
      loading: true,
      error: '',
      failedCampaigns: [],
    });

    try {
      const response = await axios.get(config.HK_DASHBOARD_GLOBAL_API + '/sentiment/summary', {
        headers: {
          'x-access-token': token,
        },
        params: {
          start_date: toApiDate(startDate),
          end_date: toApiDate(endDate),
          campaign_ids: CAMPAIGNS.map((item) => item.id).join(','),
        },
      });

      const payload = response.data && response.data.data ? response.data.data : {};
      const successResults = payload.campaign_summaries || [];
      const failedCampaigns = payload.failed_campaigns || [];
      const computedTotals = calculateTotals(successResults);

      this.setState({
        loading: false,
        tokenExpiry: payload.token_expiry,
        campaignSummaries: successResults,
        totals: computedTotals,
        failedCampaigns,
      });
    } catch (error) {
      const message = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : (error.message || 'Terjadi kesalahan saat mengambil data sentiment.');

      this.setState({
        loading: false,
        campaignSummaries: [],
        totals: {
          positive: 0,
          neutral: 0,
          negative: 0,
          mentions: 0,
        },
        error: message,
      });
    }
  }

  async loadCampaignPosts(campaign) {
    const token = localStorage.getItem('x-access-token');
    const { startDate, endDate } = this.state;

    if (!token) {
      this.setState({
        postsModalOpen: true,
        postsError: 'Token login tidak ditemukan. Silakan login ulang terlebih dahulu.',
        selectedCampaign: campaign,
        campaignPosts: [],
      });
      return;
    }

    this.setState({
      postsModalOpen: true,
      postsLoading: true,
      postsError: '',
      selectedCampaign: campaign,
      campaignPosts: [],
      postsSentimentFilter: 'ALL',
    });

    try {
      const response = await axios.get(config.HK_DASHBOARD_GLOBAL_API + '/sentiment/posts', {
        headers: {
          'x-access-token': token,
        },
        params: {
          campaign_id: campaign.id,
          start_ts: toStartUnix(startDate),
          end_ts: toEndUnix(endDate),
          limit: 100,
        },
      });

      const payload = response.data && response.data.data ? response.data.data : {};

      this.setState({
        postsLoading: false,
        campaignPosts: payload.data_list || [],
      });
    } catch (error) {
      const message = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : (error.message || 'Terjadi kesalahan saat mengambil postingan campaign.');

      this.setState({
        postsLoading: false,
        postsError: message,
      });
    }
  }

  togglePostExpand(postId) {
    this.setState((prevState) => ({
      expandedPosts: {
        ...prevState.expandedPosts,
        [postId]: !prevState.expandedPosts[postId],
      },
    }));
  }

  getSentimentChartOptions(campaignSummaries = this.state.campaignSummaries) {
    const component = this;

    return {
      chart: {
        type: 'bar',
        backgroundColor: 'transparent',
        borderRadius: 18,
        borderWidth: 0, // 🔥 TAMBAHKAN INI
        style: {
          fontFamily: 'inherit',
        },
      },
      title: {
        text: 'Sentiment Overview',
        style: {
          color: THEME_TEXT,
          fontWeight: '700',
        },
      },
      xAxis: {
        categories: campaignSummaries.map((item) => item.name),
        crosshair: false,
        labels: {
          style: {
            color: THEME_MUTED,
          },
        },
        lineColor: 'transparent',
        tickColor: 'transparent',
        lineWidth: 0,   // 🔥 TAMBAHKAN
        tickWidth: 0,   // 🔥 TAMBAHKAN
      },
      yAxis: {
        min: 0,
        lineWidth: 0,   // 🔥 TAMBAHKAN
        tickWidth: 0,   // 🔥 TAMBAHKAN
        title: {
          text: null,
          style: {
            color: THEME_MUTED,
          },
        },
        gridLineColor: 'rgba(53, 99, 160, 0.12)',
        labels: {
          style: {
            color: THEME_MUTED,
          },
        },
      },
      tooltip: {
        shared: true,
        backgroundColor: 'rgba(22, 52, 93, 0.96)',
        borderColor: THEME_BORDER,
        style: {
          color: THEME_TEXT,
        },
      },
      credits: {
        enabled: false,
      },
      legend: {
        align: 'center',
        verticalAlign: 'bottom',
        itemStyle: {
          color: THEME_TEXT,
        },
      },
      plotOptions: {
        series: {
          stacking: 'normal',
          cursor: 'pointer',
          point: {
            events: {
              click: function clickPoint() {
                if (this.campaignMeta) {
                  component.loadCampaignPosts(this.campaignMeta);
                }
              },
            },
          },
        },
        bar: {
          borderRadius: 8,
        },
      },
      series: [
        {
          name: 'Positif',
          color: '#2eb85c',
          data: campaignSummaries.map((item) => ({
            y: getSentimentCount(item.total_sentiments, '1'),
            campaignMeta: { id: item.id, name: item.name },
          })),
        },
        {
          name: 'Netral',
          color: '#f9b115',
          data: campaignSummaries.map((item) => ({
            y: getSentimentCount(item.total_sentiments, '0'),
            campaignMeta: { id: item.id, name: item.name },
          })),
        },
        {
          name: 'Negatif',
          color: '#e55353',
          data: campaignSummaries.map((item) => ({
            y: getSentimentCount(item.total_sentiments, '-1'),
            campaignMeta: { id: item.id, name: item.name },
          })),
        },
      ],
    };
  }

  getTrendChartOptions(campaignSummaries = this.state.campaignSummaries) {

    return {
      chart: {
        type: 'column',
        backgroundColor: 'transparent',
        borderRadius: 18,
      },
      title: {
        text: 'Top Mentions',
        style: {
          color: THEME_TEXT,
          fontWeight: '700',
        },
      },
      xAxis: {
        categories: campaignSummaries.map((item) => item.name),
        lineColor: 'transparent',
        tickColor: 'transparent',
        labels: {
          style: {
            color: THEME_MUTED,
          },
        },
      },
      yAxis: {
        title: {
          text: 'Total Mentions',
          style: {
            color: THEME_MUTED,
          },
        },
        labels: {
          style: {
            color: THEME_MUTED,
          },
        },
        gridLineColor: 'rgba(53, 99, 160, 0.12)',
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      series: [
        {
          name: 'Mentions',
          color: THEME_PRIMARY,
          data: campaignSummaries.map((item) => ({
            y: getSentimentCount(item.total_sentiments, '1')
              + getSentimentCount(item.total_sentiments, '0')
              + getSentimentCount(item.total_sentiments, '-1'),
          })),
        },
      ],
    };
  }

  renderPill(text, variant) {
    return (
      <span key={`${variant}-${text}`} style={styles[variant] || styles.metaPill}>
        {text}
      </span>
    );
  }

  renderStatCard(title, value, percentage, accentStyle, badgeColor, Icon) {
    return (
      <NeonCard>
        <CardBody style={styles.statCardBody}>
          <div>
            <div style={styles.mutedText}>{title}</div>

            <div style={{ ...styles.valueText, ...accentStyle }}>
              {value}{' '}
              <span style={styles.valuePercent}>({percentage}%)</span>
            </div>

            <Badge color={badgeColor} className="mt-2">
              Sentiment Summary
            </Badge>
          </div>

          {/* 🔥 ICON DI KANAN */}
          <div style={styles.statIconWrap}>
            <Icon style={styles.statIcon} />
          </div>
        </CardBody>
      </NeonCard>
    );
  }

  render() {
    const {
      datePreset,
      startDate,
      endDate,
      selectedCampaignId,
      filtersExpanded,
      loading,
      postsModalOpen,
      postsLoading,
      error,
      postsError,
      campaignSummaries,
      selectedCampaign,
      campaignPosts,
      failedCampaigns,
      postsSentimentFilter
    } = this.state;
    const filteredCampaignPosts = postsSentimentFilter === 'ALL'
      ? campaignPosts
      : campaignPosts.filter((post) => String(post.sentiment_value_i) === String(postsSentimentFilter));
    const visibleCampaignSummaries = selectedCampaignId === 'ALL'
      ? campaignSummaries
      : campaignSummaries.filter((item) => String(item.id) === String(selectedCampaignId));
    const displayTotals = calculateTotals(visibleCampaignSummaries);
    const topNegativeIssues = getTopNegativeIssues(visibleCampaignSummaries);
    const positivePercentage = calculatePercentage(displayTotals.positive, displayTotals.mentions);
    const neutralPercentage = calculatePercentage(displayTotals.neutral, displayTotals.mentions);
    const negativePercentage = calculatePercentage(displayTotals.negative, displayTotals.mentions);

    return (
      <div className="animated fadeIn" style={styles.page}>
        <style>{`
          .sentiment-modal-dialog {
            width: 96vw !important;
            max-width: 1650px !important;
            margin: 1.75rem auto !important;
          }

          .sentiment-modal-dialog .modal-content {
            background: linear-gradient(180deg, rgba(11, 27, 49, 0.99), rgba(22, 52, 93, 0.99));
            border: 1px solid rgba(53, 99, 160, 0.35);
            border-radius: 18px;
            box-shadow: 0 16px 44px rgba(0, 0, 0, 0.52), 0 0 24px rgba(29, 68, 120, 0.18);
          }

          @media (max-width: 992px) {
            .sentiment-modal-dialog {
              width: calc(100vw - 24px) !important;
              margin: 12px auto !important;
            }
          }
        `}</style>
        <div
          style={styles.filterHoverZone}
          onMouseEnter={this.handleFilterMouseEnter}
        />
        <div style={styles.contentWrap}>
          <div
            style={filtersExpanded ? styles.filterDockExpanded : styles.filterDockCollapsed}
            onMouseEnter={this.handleFilterMouseEnter}
            onMouseLeave={this.handleFilterMouseLeave}
          >
            <div style={styles.filterDockHandle}>
              <div style={styles.filterDockTitle}>Filters</div>
              <div style={styles.filterDockHint}>
                {loading ? 'Loading...' : 'Arahkan cursor ke atas untuk membuka'}
              </div>
            </div>
            <div style={styles.filterDockContent}>
              <Row>
                <Col lg="6" className="mb-3 mb-lg-0">
                  <div style={styles.panelLabel}>Period</div>

                  <div style={styles.presetRow}>
                    <Button
                      type="button"
                      disabled={loading}
                      style={datePreset === 'today' ? styles.presetActive : styles.presetButton}
                      onClick={() => this.applyPreset('today')}
                    >
                      Today
                    </Button>
                    <Button
                      type="button"
                      disabled={loading}
                      style={datePreset === 'last_7' ? styles.presetActive : styles.presetButton}
                      onClick={() => this.applyPreset('last_7')}
                    >
                      Last 7D
                    </Button>
                    <Button
                      type="button"
                      disabled={loading}
                      style={datePreset === 'last_30' ? styles.presetActive : styles.presetButton}
                      onClick={() => this.applyPreset('last_30')}
                    >
                      Last 30D
                    </Button>
                    <Button
                      type="button"
                      disabled={loading}
                      style={datePreset === 'custom' ? styles.presetActive : styles.presetButton}
                      onClick={() => this.applyPreset('custom')}
                    >
                      Custom
                    </Button>
                  </div>

                  <div style={styles.dateInlineRow}>
                    <Input
                      type="date"
                      name="startDate"
                      value={startDate}
                      onChange={this.handleChange}
                      disabled={loading}
                      style={styles.dateInput}
                    />
                    <span style={styles.rangeDash}>-</span>
                    <Input
                      type="date"
                      name="endDate"
                      value={endDate}
                      onChange={this.handleChange}
                      disabled={loading}
                      style={styles.dateInput}
                    />
                  </div>
                </Col>

                <Col lg="6">
                  <div style={styles.panelLabel}>Pilih Ruas</div>

                  <div style={styles.focusRowInline}>
                    <Input
                      type="select"
                      value={selectedCampaignId}
                      onChange={this.handleCampaignFilterChange}
                      disabled={loading}
                      style={styles.focusSelect}
                    >
                      <option value="ALL">Semua Ruas</option>
                      {campaignSummaries.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </Input>

                    <Button
                      type="button"
                      disabled={loading || !startDate || !endDate}
                      style={styles.primaryButton}
                      onClick={this.loadSummaries}
                    >
                      Terapkan
                    </Button>

                    {loading ? (
                      <div style={styles.loadingBadge}>
                        <Spinner size="sm" /> <span style={styles.loadingBadgeText}>Loading data</span>
                      </div>
                    ) : null}
                  </div>
                </Col>
              </Row>
            </div>
          </div>

          <Row>
            <Col md="3">
              {this.renderStatCard('Total Positif', displayTotals.positive, positivePercentage, styles.statPositive, 'success', FaSmile)}
            </Col>

            <Col md="3">
              {this.renderStatCard('Total Netral', displayTotals.neutral, neutralPercentage, styles.statNeutral, 'warning', FaMeh)}
            </Col>

            <Col md="3">
              {this.renderStatCard('Total Negatif', displayTotals.negative, negativePercentage, styles.statNegative, 'danger', FaFrown)}
            </Col>

            <Col md="3">
              {this.renderStatCard('Total Mention', displayTotals.mentions, 100, styles.statMention, 'primary', FaBullhorn)}
            </Col>
          </Row>

          {error ? (
            <Row>
              <Col xs="12">
                <Alert color="danger" style={styles.alertDanger}>{error}</Alert>
              </Col>
            </Row>
          ) : null}

          {failedCampaigns.length ? (
            <Row>
              <Col xs="12">
                <Alert color="warning" style={styles.alertWarning}>
                  Beberapa campaign gagal diambil: {failedCampaigns.map((item) => item.name).join(', ')}
                </Alert>
              </Col>
            </Row>
          ) : null}

          {failedCampaigns.length ? (
            <Row>
              <Col xs="12">
                <NeonCard>
                  <CardHeader style={styles.cardHeader}>
                    <strong>Detail Error Campaign</strong>
                  </CardHeader>
                  <CardBody style={{ overflowX: 'auto' }}>
                    <Table bordered responsive striped style={styles.table}>
                      <thead style={styles.tableHead}>
                        <tr>
                          <th>Campaign ID</th>
                          <th>Lokasi</th>
                          <th>Status Code</th>
                          <th>Error Code</th>
                          <th>Pesan</th>
                          <th>Request ID</th>
                        </tr>
                      </thead>
                      <tbody>
                        {failedCampaigns.map((item) => {
                          const errorData = item.error && item.error.data ? item.error.data : {};
                          const lastAttempt = Array.isArray(errorData) && errorData.length ? errorData[errorData.length - 1] : null;
                          const lastData = lastAttempt && lastAttempt.data ? lastAttempt.data : errorData;

                          return (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.name}</td>
                              <td>{item.error && item.error.statusCode ? item.error.statusCode : '-'}</td>
                              <td>{lastData && lastData.error_code ? lastData.error_code : '-'}</td>
                              <td>{lastData && (lastData.error_msg || lastData.message) ? (lastData.error_msg || lastData.message) : (item.error && item.error.message ? item.error.message : '-')}</td>
                              <td>{lastData && lastData.request_id ? lastData.request_id : '-'}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </CardBody>
                </NeonCard>
              </Col>
            </Row>
          ) : null}

          <Row>
            <Col lg="8">
              <NeonCard>
                <CardHeader style={styles.cardHeader}>
                  <strong>Sentiment Overview</strong>
                </CardHeader>
                <CardBody style={styles.chartBody}>
                  {visibleCampaignSummaries.length ? (
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={this.getSentimentChartOptions(visibleCampaignSummaries)}
                    />
                  ) : (
                    <div style={styles.mutedText}>
                      Belum ada data yang ditampilkan.
                    </div>
                  )}
                </CardBody>
              </NeonCard>
            </Col>
            <Col lg="4">
              <NeonCard>
                <CardHeader style={styles.cardHeader}>
                  <strong>Trend Analysis</strong>
                </CardHeader>
                <CardBody style={styles.chartBody}>
                  {visibleCampaignSummaries.length ? (
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={this.getTrendChartOptions(visibleCampaignSummaries)}
                    />
                  ) : (
                    <div style={styles.mutedText}>
                      Trend akan muncul setelah data summary berhasil diambil.
                    </div>
                  )}
                </CardBody>
              </NeonCard>
            </Col>
          </Row>

          <Row>
            <Col lg="12">
              <NeonCard>
                <CardHeader style={styles.cardHeader}>
                  <strong>Top Isu Negatif</strong>
                </CardHeader>
                <CardBody style={styles.chartBody}>
                  {topNegativeIssues.length ? (
                    <div>
                      {topNegativeIssues.map((item, index) => (
                        <div key={item.id} style={index === topNegativeIssues.length - 1 ? styles.negativeIssueRowLast : styles.negativeIssueRow}>
                          <div style={styles.negativeIssueHeader}>
                            <div>
                              <div style={styles.negativeIssueName}>{item.name}</div>
                              <div style={styles.negativeIssueMeta}>
                                {item.negative} mention negatif dari {item.mentions} total mention
                              </div>
                            </div>
                            <div style={styles.negativeIssueValue}>{item.negativeRate}%</div>
                          </div>
                          <div style={styles.negativeIssueTrack}>
                            <div
                              style={{
                                ...styles.negativeIssueFill,
                                width: `${Math.max(item.negativeRate, 6)}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={styles.mutedText}>
                      Belum ada isu negatif yang bisa ditampilkan untuk filter saat ini.
                    </div>
                  )}
                </CardBody>
              </NeonCard>
            </Col>
          </Row>
        </div>

        <Modal isOpen={postsModalOpen} toggle={this.togglePostsModal} centered className="sentiment-modal-dialog" contentClassName="sentiment-modal-content">
          <div style={styles.filterModal}>
            <ModalHeader toggle={this.togglePostsModal} style={styles.filterModalHeader}>
              {selectedCampaign ? `Postingan Ruas ${selectedCampaign.name}` : 'Postingan Ruas'}
            </ModalHeader>
            <ModalBody style={styles.filterModalBody}>
              {postsLoading ? (
                <div style={styles.postsLoading}>
                  <Spinner size="sm" /> <span style={styles.postsLoadingText}>Mengambil daftar postingan...</span>
                </div>
              ) : null}

              {postsError ? (
                <Alert color="danger" style={styles.alertDanger}>{postsError}</Alert>
              ) : null}

              {!postsLoading && !postsError ? (
                <div>
                  <div style={styles.postsToolbar}>
                    <div style={styles.postsToolbarLeft}>
                      <div style={styles.postsToolbarLabel}>Filter Sentimen</div>

                      <div style={styles.postsSentimentButtonGroup}>
                        <Button
                          type="button"
                          onClick={() => this.setState({ postsSentimentFilter: 'ALL' })}
                          style={postsSentimentFilter === 'ALL' ? styles.sentimentFilterActive : styles.sentimentFilterButton}
                        >
                          Semua
                        </Button>

                        <Button
                          type="button"
                          onClick={() => this.setState({ postsSentimentFilter: '1' })}
                          style={postsSentimentFilter === '1' ? styles.sentimentPositiveActive : styles.sentimentFilterButton}
                        >
                          Positif
                        </Button>

                        <Button
                          type="button"
                          onClick={() => this.setState({ postsSentimentFilter: '0' })}
                          style={postsSentimentFilter === '0' ? styles.sentimentNeutralActive : styles.sentimentFilterButton}
                        >
                          Netral
                        </Button>

                        <Button
                          type="button"
                          onClick={() => this.setState({ postsSentimentFilter: '-1' })}
                          style={postsSentimentFilter === '-1' ? styles.sentimentNegativeActive : styles.sentimentFilterButton}
                        >
                          Negatif
                        </Button>
                      </div>
                    </div>

                    <div style={styles.postsToolbarInfo}>
                      Total: {filteredCampaignPosts.length} postingan
                    </div>
                  </div>

                  {filteredCampaignPosts.length ? filteredCampaignPosts.map((post) => (
                    <div key={post.id} style={styles.postCard}>
                      <div style={styles.postMentionColumn}>
                        <div style={styles.postDate}>{formatPublishedDate(post.published_ts_l)}</div>
                        <div style={styles.postMentionBody}>
                          <div style={styles.postThumbnailWrap}>
                            {post.image_url_s && !this.state.failedPostImages[post.id] ? (
                              <img
                                src={post.image_url_s}
                                alt=""
                                style={styles.postThumbnail}
                                onError={() => this.handlePostImageError(post.id)}
                              />
                            ) : (
                              <div style={styles.postThumbnailFallback}>No Image</div>
                            )}
                          </div>
                          <div style={styles.postMentionContent}>
                            {(() => {
                              const fullText = getPostTitle(post) || '';
                              const isExpanded = this.state.expandedPosts[post.id];
                              const isLong = fullText.length > 300;

                              const displayText = isLong && !isExpanded
                                ? fullText.substring(0, 300) + '...'
                                : fullText;

                              return (
                                <div>
                                  <div style={styles.postTitle}>{displayText}</div>

                                  {isLong && (
                                    <span
                                      style={styles.readMore}
                                      onClick={() => this.togglePostExpand(post.id)}
                                    >
                                      {isExpanded ? 'Show less' : 'Read more'}
                                    </span>
                                  )}
                                </div>
                              );
                            })()}
                            {post.link_s ? (
                              <a href={post.link_s} target="_blank" rel="noopener noreferrer" style={styles.postLink}>
                                {post.link_s}
                              </a>
                            ) : null}
                          </div>
                        </div>
                      </div>

                      <div style={styles.postInfoColumn}>
                        <div style={styles.sectionTitle}>Channel/Author</div>
                        <div style={styles.authorBlock}>
                          {post.author_avatar_s ? (
                            <img src={post.author_avatar_s} alt={getAuthorLabel(post)} style={styles.authorAvatar} />
                          ) : (
                            <div style={styles.authorAvatarFallback}>{getAuthorLabel(post).slice(0, 1)}</div>
                          )}
                          <div>
                            <div style={styles.authorName}>{getAuthorLabel(post)}</div>

                          </div>
                        </div>
                        <div style={styles.pillWrap}>
                          {this.renderPill(getChannelLabel(post.channel_id_i), 'channelPill')}
                          {this.renderPill(`Type: ${post.content_type_s || post.type_s || '-'}`, 'metaPill')}
                        </div>
                      </div>

                      <div style={styles.postInfoColumn}>
                        <div style={styles.sectionTitle}>Categorization</div>
                        <div style={styles.metaGroup}>
                          <div style={styles.metaLabel}>Mood</div>
                          <div style={styles.pillWrap}>
                            {this.renderPill(post.nlp_mood_s || '-', 'softPill')}
                          </div>
                        </div>
                        <div style={styles.metaGroup}>
                          <div style={styles.metaLabel}>Topic</div>
                          <div style={styles.pillWrap}>
                            {limitList(post.nlp_topic_ss, 4).length ? limitList(post.nlp_topic_ss, 4).map((item) => this.renderPill(item, 'softPill')) : this.renderPill('-', 'softPill')}
                          </div>
                        </div>
                        <div style={styles.metaGroup}>
                          <div style={styles.metaLabel}>Sentence Type</div>
                          <div style={styles.pillWrap}>
                            {limitList(post.nlp_sentence_type_ss, 4).length ? limitList(post.nlp_sentence_type_ss, 4).map((item) => this.renderPill(item, 'softPill')) : this.renderPill('-', 'softPill')}
                          </div>
                        </div>
                      </div>

                      <div style={styles.postMetricColumn}>
                        <div style={styles.sectionTitle}>Detail & Performance</div>
                        <div style={styles.metricGroup}>
                          <div style={styles.metricItem}>
                            <span style={styles.metricLabel}>Campaign</span>
                            <span style={styles.metricValueText}>{getCampaignNames(post).join(', ') || '-'}</span>
                          </div>
                          <div style={styles.metricItem}>
                            <span style={styles.metricLabel}>Engagements</span>
                            <span style={styles.metricValue}>{post.num_eng_l || 0}</span>
                          </div>
                          <div style={styles.metricItem}>
                            <span style={styles.metricLabel}>Views</span>
                            <span style={styles.metricValue}>{post.num_views_l || 0}</span>
                          </div>
                          <div style={styles.metricItem}>
                            <span style={styles.metricLabel}>Potential Reach</span>
                            <span style={styles.metricValue}>{post.potential_reach_l || 0}</span>
                          </div>
                          <div style={styles.metricItem}>
                            <span style={styles.metricLabel}>Sentiment</span>
                            <span style={post.sentiment_value_i === 1 ? styles.sentimentPositive : post.sentiment_value_i === -1 ? styles.sentimentNegative : styles.sentimentNeutral}>
                              {getSentimentLabel(post.sentiment_value_i)}
                            </span>
                          </div>
                          <div style={styles.metricItem}>
                            <span style={styles.metricLabel}>Likes & Comments</span>
                            <div style={styles.metricInlineRow}>
                              <span style={styles.metricInlineItem}>
                                <FaThumbsUp style={styles.metricIcon} />
                                <span style={styles.metricValue}>{post.num_likes_l || 0}</span>
                              </span>
                              <span style={styles.metricInlineItem}>
                                <FaCommentAlt style={styles.metricIcon} />
                                <span style={styles.metricValue}>{post.num_comments_l || 0}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center" style={styles.mutedText}>
                      Tidak ada postingan untuk campaign ini pada rentang waktu yang dipilih.
                    </div>
                  )}
                </div>
              ) : null}
            </ModalBody>
            <ModalFooter style={styles.postsModalFooter}>
              <Button style={styles.primaryButton} onClick={this.togglePostsModal}>Tutup</Button>
            </ModalFooter>
          </div>
        </Modal>
      </div>
    );
  }
}

const styles = {
  page: {
    minHeight: '100vh',
    margin: 0,
    padding: '0 24px 32px',
    color: THEME_TEXT,
    background: `linear-gradient(160deg, #081426 0%, ${THEME_PRIMARY} 58%, #0b1a31 100%)`,
  },
  contentWrap: {
    paddingTop: '52px',
  },
  topPanel: {
    background: 'rgba(11, 27, 49, 0.9)',
    border: '1px solid rgba(53, 99, 160, 0.2)',
    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.28)',
    color: THEME_TEXT,
  },
  panelLabel: {
    color: THEME_TEXT,
    fontSize: '15px',
    fontWeight: '700',
    marginBottom: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  presetRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  presetButton: {
    background: 'rgba(255, 255, 255, 0.06)',
    border: '1px solid rgba(53, 99, 160, 0.22)',
    color: THEME_TEXT,
  },
  presetActive: {
    background: 'linear-gradient(90deg, #173963 0%, #1d4478 100%)',
    border: '1px solid rgba(94, 136, 191, 0.7)',
    color: '#f5f9ff',
    fontWeight: '700',
  },
  rangeText: {
    display: 'none',
  },
  focusRow: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  dateRow: {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
  },
  dateInput: {
    minWidth: '160px',
    backgroundColor: 'rgba(9, 21, 38, 0.92)',
    border: '1px solid rgba(53, 99, 160, 0.45)',
    color: THEME_TEXT,
  },
  rangeDash: {
    color: THEME_MUTED,
    fontWeight: '700',
  },
  neonCard: {
    background: 'linear-gradient(180deg, rgba(29, 69, 125, 0.96), rgba(16, 56, 112, 0.98))',
    border: '1px solid rgba(53, 99, 160, 0.28)',
    boxShadow: '0 0 24px rgba(88, 230, 255, 0.12)',
    color: THEME_TEXT,
    borderRadius: '18px',
    overflow: 'hidden',
    position: 'relative',
  },
  neonCardShell: {
    position: 'relative',
    borderRadius: '22px',
    padding: '1.5px',
    overflow: 'hidden',
    isolation: 'isolate',
    background: 'rgba(6, 14, 27, 0.94)',
    boxShadow: '0 0 28px rgba(88, 230, 255, 0.14)',
  },
  neonSvgOverlay: {
    pointerEvents: 'none',
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    overflow: 'hidden',
    zIndex: 0,
  },
  neonSvg: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    overflow: 'visible',
  },
  neonCardFrame: {
    position: 'relative',
    zIndex: 1,
    borderRadius: '16.5px',
    overflow: 'hidden',
    background: 'linear-gradient(180deg, rgba(29, 69, 125, 0.96), rgba(16, 56, 112, 0.98))',
  },
  cardHeader: {
    background: 'linear-gradient(90deg, rgba(29, 68, 120, 0.3), rgba(29, 68, 120, 0.08))',
    color: THEME_TEXT,
    borderBottom: '1px solid rgba(53, 99, 160, 0.24)',
    letterSpacing: '0.04em',
  },
  chartBody: {
    overflow: 'hidden',
    borderRadius: '0 0 18px 18px',
  },
  input: {
    backgroundColor: 'rgba(9, 21, 38, 0.92)',
    border: '1px solid rgba(53, 99, 160, 0.45)',
    color: THEME_TEXT,
    boxShadow: 'inset 0 0 12px rgba(29, 68, 120, 0.08)',
  },
  primaryButton: {
    background: 'linear-gradient(90deg, #173963 0%, #1d4478 100%)',
    border: '1px solid rgba(94, 136, 191, 0.35)',
    color: '#f5f9ff',
    fontWeight: '700',
    boxShadow: '0 10px 24px rgba(29, 68, 120, 0.28)',
  },
  mutedText: {
    color: THEME_MUTED,
  },
  valueText: {
    color: '#ffffff',
    fontSize: '36px', // 🔥 BESARIN
    fontWeight: '800', // 🔥 LEBIH TEBAL
    lineHeight: 1.1,
    letterSpacing: '0.5px',
    textShadow: '0 0 4px rgba(88, 230, 255, 0.35)',
  },
  valuePercent: {
    color: '#d7e7fb',
    fontSize: '20px',
    fontWeight: '600',
    opacity: 0.92,
  },
  statPositive: {
    color: '#58d68d',
  },
  statNeutral: {
    color: '#ffd166',
  },
  statNegative: {
    color: '#ff7b7b',
  },
  statMention: {
    color: '#71c7ff',
  },
  alertDanger: {
    backgroundColor: 'rgba(229, 83, 83, 0.14)',
    borderColor: 'rgba(229, 83, 83, 0.55)',
    color: '#ffd8d8',
  },
  alertWarning: {
    backgroundColor: 'rgba(249, 177, 21, 0.14)',
    borderColor: 'rgba(249, 177, 21, 0.55)',
    color: '#ffe9b0',
  },
  table: {
    color: THEME_TEXT,
    backgroundColor: 'transparent',
  },
  tableHead: {
    backgroundColor: THEME_PANEL,
    color: THEME_TEXT,
  },
  negativeIssueRow: {
    padding: '14px 0 18px',
    borderBottom: '1px solid rgba(83, 126, 180, 0.24)',
  },
  negativeIssueRowLast: {
    padding: '14px 0 4px',
  },
  negativeIssueHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px',
    alignItems: 'flex-start',
    marginBottom: '10px',
  },
  negativeIssueName: {
    color: '#ffd5d5',
    fontSize: '17px',
    fontWeight: '700',
  },
  negativeIssueMeta: {
    color: THEME_MUTED,
    fontSize: '13px',
    marginTop: '4px',
  },
  negativeIssueValue: {
    color: '#ff8f8f',
    fontSize: '22px',
    fontWeight: '700',
    lineHeight: 1,
    whiteSpace: 'nowrap',
  },
  negativeIssueTrack: {
    width: '100%',
    height: '10px',
    borderRadius: '999px',
    background: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
    boxShadow: 'inset 0 0 8px rgba(0, 0, 0, 0.2)',
  },
  negativeIssueFill: {
    height: '100%',
    borderRadius: '999px',
    background: 'linear-gradient(90deg, rgba(255, 107, 107, 0.92), rgba(255, 153, 153, 0.98))',
    boxShadow: '0 0 12px rgba(255, 107, 107, 0.25)',
  },
  postCard: {
    display: 'grid',
    gridTemplateColumns: '2.3fr 1fr 1fr 0.9fr',
    gap: '24px',
    padding: '22px 8px',
    borderBottom: '1px solid rgba(53, 99, 160, 0.16)',
  },
  postMentionColumn: {
    minWidth: 0,
  },
  postDate: {
    marginBottom: '12px',
    color: THEME_MUTED,
    fontSize: '14px',
  },
  postMentionBody: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
  },
  postThumbnailWrap: {
    width: '94px',
    flexShrink: 0,
  },
  postThumbnail: {
    width: '94px',
    height: '94px',
    borderRadius: '10px',
    objectFit: 'cover',
    border: '1px solid rgba(53, 99, 160, 0.2)',
  },
  postThumbnailFallback: {
    width: '94px',
    height: '94px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(29, 68, 120, 0.14)',
    color: THEME_MUTED,
    fontSize: '12px',
  },
  postMentionContent: {
    minWidth: 0,
  },
  postTitle: {
    fontSize: '18px',
    lineHeight: 1.35,
    fontWeight: '700',
    color: THEME_TEXT,
    marginBottom: '10px',
  },
  postMessage: {
    color: '#d6e7f4',
    lineHeight: 1.6,
    marginBottom: '12px',
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  postInfoColumn: {
    minWidth: 0,
  },
  postMetricColumn: {
    minWidth: 0,
  },
  sectionTitle: {
    marginBottom: '14px',
    color: THEME_MUTED,
    fontSize: '14px',
    fontWeight: '700',
  },
  authorBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px',
  },
  authorAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  authorAvatarFallback: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(29, 68, 120, 0.18)',
    color: THEME_TEXT,
    fontWeight: '700',
  },
  authorName: {
    color: THEME_ACCENT,
    fontWeight: '700',
  },
  authorMeta: {
    color: THEME_MUTED,
    fontSize: '13px',
  },
  pillWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  channelPill: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 10px',
    borderRadius: '999px',
    backgroundColor: 'rgba(29, 68, 120, 0.22)',
    color: '#d6e5f8',
    fontSize: '13px',
    fontWeight: '600',
  },
  metaPill: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 10px',
    borderRadius: '999px',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    color: '#dfe9f7',
    fontSize: '13px',
    fontWeight: '600',
  },
  softPill: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 10px',
    borderRadius: '999px',
    backgroundColor: 'rgba(94, 136, 191, 0.16)',
    color: '#d3e1f5',
    fontSize: '13px',
    fontWeight: '600',
  },
  metaGroup: {
    marginBottom: '14px',
  },
  metaLabel: {
    marginBottom: '8px',
    color: THEME_TEXT,
    fontSize: '13px',
    fontWeight: '700',
  },
  metricGroup: {
    display: 'grid',
    gap: '12px',
  },
  metricItem: {
    display: 'grid',
    gap: '2px',
  },
  metricInlineRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
    flexWrap: 'wrap',
  },
  metricInlineItem: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
  },
  metricIcon: {
    color: THEME_ACCENT,
    fontSize: '15px',
    filter: 'drop-shadow(0 0 6px rgba(29, 68, 120, 0.35))',
  },
  metricLabel: {
    color: THEME_MUTED,
    fontSize: '13px',
  },
  metricValue: {
    color: THEME_TEXT,
    fontSize: '16px',
    fontWeight: '700',
  },
  metricValueText: {
    color: '#d6e5f8',
    fontSize: '16px',
    fontWeight: '700',
  },
  sentimentPositive: {
    color: '#33d17a',
    fontSize: '16px',
    fontWeight: '700',
  },
  sentimentNegative: {
    color: '#ff6b6b',
    fontSize: '16px',
    fontWeight: '700',
  },
  sentimentNeutral: {
    color: '#f9b115',
    fontSize: '16px',
    fontWeight: '700',
  },
  postsLoading: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: THEME_TEXT,
  },
  postsLoadingText: {
    color: THEME_MUTED,
  },
  postTitleCell: {
    minWidth: '320px',
    whiteSpace: 'normal',
  },
  postLink: {
    color: '#d3e4fa',
    textDecoration: 'underline',
  },
  loadingBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    borderRadius: '999px',
    backgroundColor: 'rgba(29, 68, 120, 0.16)',
    color: THEME_TEXT,
    border: '1px solid rgba(53, 99, 160, 0.24)',
  },
  loadingBadgeText: {
    color: THEME_MUTED,
    fontSize: '13px',
  },
  filterDockCollapsed: {
    position: 'fixed',
    top: '0',
    left: '24px',
    right: '24px',
    zIndex: 30,
    marginBottom: '24px',
    background: 'linear-gradient(135deg, rgba(22, 52, 93, 0.92), rgba(11, 27, 49, 0.95))',
    border: '1px solid rgba(53, 99, 160, 0.28)',
    borderRadius: '18px',
    boxShadow: THEME_GLOW,
    overflow: 'hidden',
    transform: 'translateY(calc(-100% + 16px))',
    opacity: 0.95,
    transition: 'transform 0.24s ease, opacity 0.24s ease, border-color 0.24s ease',
  },
  filterDockExpanded: {
    position: 'fixed',
    top: '0',
    left: '24px',
    right: '24px',
    zIndex: 30,
    marginBottom: '24px',
    background: 'linear-gradient(135deg, rgba(22, 52, 93, 0.96), rgba(11, 27, 49, 0.98))',
    border: '1px solid rgba(53, 99, 160, 0.4)',
    borderRadius: '18px',
    boxShadow: THEME_GLOW,
    overflow: 'hidden',
    transform: 'translateY(0)',
    opacity: 1,
    transition: 'transform 0.24s ease, opacity 0.24s ease, border-color 0.24s ease',
  },
  filterDockHandle: {
    padding: '8px 20px 10px',
    textAlign: 'center',
    cursor: 'default',
  },
  filterDockTitle: {
    color: THEME_TEXT,
    fontSize: '15px',
    fontWeight: '700',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  filterDockHint: {
    marginTop: '4px',
    color: THEME_MUTED,
    fontSize: '13px',
  },
  filterDockContent: {
    padding: '0 20px 20px',
  },
  filterHoverZone: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '22px',
    zIndex: 29,
    background: 'transparent',
  },
  filterModal: {
    color: THEME_TEXT,
  },
  filterModalHeader: {
    background: 'transparent',
    color: THEME_TEXT,
    borderBottom: '1px solid rgba(53, 99, 160, 0.24)',
  },
  filterModalBody: {
    maxHeight: '75vh',
    overflowY: 'auto',
  },
  postsModalFooter: {
    borderTop: '1px solid rgba(53, 99, 160, 0.24)',
  },
  neonCorner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '20px',
    pointerEvents: 'none',
    border: '1px solid rgba(33, 209, 240, 0.75)',
    boxShadow: 'inset 0 0 4px rgba(88, 230, 255, 0.06)',
    background: `
    radial-gradient(circle at top left, rgba(88, 230, 255, 0.34) 0, rgba(88, 230, 255, 0.12) 2px, transparent 28px),
    radial-gradient(circle at top right, rgba(88, 230, 255, 0.3) 0, rgba(88, 230, 255, 0.1) 2px, transparent 28px),
    radial-gradient(circle at bottom left, rgba(88, 230, 255, 0.22) 0, rgba(88, 230, 255, 0.08) 2px, transparent 28px),
    radial-gradient(circle at bottom right, rgba(88, 230, 255, 0.42) 0, rgba(88, 230, 255, 0.14) 2px, transparent 28px)
  `,
  },

  dateInlineRow: {
    marginTop: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'nowrap',
  },

  focusRowInline: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
  },
  focusSelect: {
    flex: 1,
    minWidth: '220px',
    backgroundColor: 'rgba(9, 21, 38, 0.92)',
    border: '1px solid rgba(53, 99, 160, 0.45)',
    color: THEME_TEXT,
  },
  statCardBody: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  statIconWrap: {
    opacity: 0.18,
  },

  statIcon: {
    fontSize: '48px',
    filter: 'drop-shadow(0 0 12px rgba(88, 230, 255, 0.4))',
  },
  postsToolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: '16px',
    flexWrap: 'wrap',
    marginBottom: '18px',
    paddingBottom: '12px',
    borderBottom: '1px solid rgba(53, 99, 160, 0.18)',
  },

  postsToolbarLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    minWidth: '240px',
  },

  postsToolbarLabel: {
    color: THEME_TEXT,
    fontSize: '13px',
    fontWeight: '700',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },

  postsFilterSelect: {
    minWidth: '240px',
    backgroundColor: 'rgba(9, 21, 38, 0.92)',
    border: '1px solid rgba(53, 99, 160, 0.45)',
    color: THEME_TEXT,
  },

  postsToolbarInfo: {
    color: THEME_MUTED,
    fontSize: '13px',
    fontWeight: '600',
  },

  postsSentimentButtonGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
  },

  sentimentFilterButton: {
    background: 'rgba(255, 255, 255, 0.06)',
    border: '1px solid rgba(53, 99, 160, 0.24)',
    color: THEME_TEXT,
    fontWeight: '600',
    borderRadius: '999px',
    padding: '8px 14px',
    minWidth: '96px',
  },

  sentimentFilterActive: {
    background: 'linear-gradient(90deg, #173963 0%, #1d4478 100%)',
    border: '1px solid rgba(94, 136, 191, 0.7)',
    color: '#f5f9ff',
    fontWeight: '700',
    borderRadius: '999px',
    padding: '8px 14px',
    minWidth: '96px',
  },

  sentimentPositiveActive: {
    background: 'rgba(46, 184, 92, 0.18)',
    border: '1px solid rgba(46, 184, 92, 0.65)',
    color: '#7ff0a6',
    fontWeight: '700',
    borderRadius: '999px',
    padding: '8px 14px',
    minWidth: '96px',
    boxShadow: '0 0 12px rgba(46, 184, 92, 0.18)',
  },

  sentimentNeutralActive: {
    background: 'rgba(249, 177, 21, 0.18)',
    border: '1px solid rgba(249, 177, 21, 0.65)',
    color: '#ffd978',
    fontWeight: '700',
    borderRadius: '999px',
    padding: '8px 14px',
    minWidth: '96px',
    boxShadow: '0 0 12px rgba(249, 177, 21, 0.18)',
  },

  sentimentNegativeActive: {
    background: 'rgba(229, 83, 83, 0.18)',
    border: '1px solid rgba(229, 83, 83, 0.65)',
    color: '#ff9a9a',
    fontWeight: '700',
    borderRadius: '999px',
    padding: '8px 14px',
    minWidth: '96px',
    boxShadow: '0 0 12px rgba(229, 83, 83, 0.18)',
  },
  readMore: {
    display: 'inline-block',
    marginTop: '6px',
    color: '#58e6ff',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  },

};

export default SentimentAnalysis;
