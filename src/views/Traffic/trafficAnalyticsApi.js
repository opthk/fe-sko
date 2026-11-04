import axios from 'axios';
import qs from 'qs';
import { config } from '../../config';

const authHeaders = () => ({ 'x-access-token': localStorage.getItem('x-access-token') });

/**
 * Role check for a page path, same endpoint the other pages use
 * (accessActions.getAccessByPath) but resolved locally so we never read a
 * previous page's actions from the shared redux store.
 * Resolves to the list of ACTION_CODEs (e.g. ['C','R','U','D']).
 */
export function fetchPageAccess(path, idGroup) {
  return axios.get(config.HK_USER_PORTAL_API + '/user-access/pathname', {
    params: { path, idGroup },
    headers: authHeaders(),
  }).then(response => {
    const rows = (response.data && response.data.data) || [];
    return rows.map(row => row.ACTION_CODE);
  });
}

/**
 * Full Senkom + Accident rows for a date range. Uses the same endpoints as the
 * "Download Excel" feature, so the backend applies the same branch scoping
 * (a branch user only gets their own ruas, PUSAT gets all).
 */
export function fetchTrafficData({ startDate, endDate, branch }) {
  const body = qs.stringify({ start_date: startDate, end_date: endDate, branch, gangguan: '' });
  const opts = { headers: authHeaders() };
  return Promise.all([
    axios.post(config.HK_DASHBOARD_GLOBAL_API + '/getSenkomExcel', body, opts),
    axios.post(config.HK_DASHBOARD_GLOBAL_API + '/getAccidentExcel', body, opts),
  ]).then(([senkomRes, accidentRes]) => ({
    senkom: (senkomRes.data && senkomRes.data.data) || [],
    accident: (accidentRes.data && accidentRes.data.data) || [],
  }));
}
