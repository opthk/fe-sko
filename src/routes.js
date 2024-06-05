import React from 'react';
import DefaultLayout from './containers/DefaultLayout';
const LandingPage = React.lazy(() => import('./views/Pages/LandingPage/LandingPage'));
const DashboardTransaction = React.lazy(() => import('./views/Dashboard/DashboardTransaction'));
const DashboardSettlementKoran = React.lazy(() => import('./views/Dashboard/DashboardSettlement_koran'));
const DashboardOverview = React.lazy(() => import('./views/Dashboard/DashboardOverview'));
const DashboardDescriptionNew = React.lazy(() => import('./views/Dashboard/DashboardDescriptionNew'));
const DashboardComplainReview = React.lazy(() => import('./views/Dashboard/DashboardComplainReview'));
const TodayChart = React.lazy(() => import('./views/Chart/TodayChart.js'));
const DasboardAccident = React.lazy(() => import('./views/Dashboard/DashboardAccident'));
const SenkomHandling = React.lazy(() => import('./views/Traffic/SenkomHandling'));
const AccidentReport = React.lazy(() => import('./views/Traffic/AccidentReport'));
const Potholes = React.lazy(() => import('./views/Potholes/Potholes'));
const ImportData = React.lazy(() => import('./views/ImportData/ImportData'));
const EditPassword = React.lazy(() => import('./views/Profile/EditPassword'));
const PageNotFound = React.lazy(() => import('./views/Pages/Page404/Page404'));
const rtms = React.lazy(() => import('./views/Rtms/RtmsPage'));

const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/landing-page', name: 'Landing Page', component: LandingPage },
  { path: '/dashboard-transaction', name: 'Dashboard Transaction', component: DashboardTransaction },
  { path: '/dashboard-settlement', name: 'Dashboard Settlement', component: DashboardSettlementKoran },
  { path: '/dashboard-overview', name: 'Dashboard Overview', component: DashboardOverview },
  { path: '/dashboard-description', name: 'Dashboard Description', component: DashboardDescriptionNew },
  { path: '/dashboard-accident', name: 'Dashboard Accident & Potholes', component: DasboardAccident },
  { path: '/dashboard-complain', name: 'Dashboard Complain & Rating', component: DashboardComplainReview },
  { path: '/transaction-chart', name: 'Transaction Chart', component: TodayChart },
  { path: '/dashboard-senkom', name: 'Senkom Handling', component: SenkomHandling },
  { path: '/dashboard-accident-report', name: 'Accident Report', component: AccidentReport },
  { path: '/dashboard-potholes', name: 'Potholes', component: Potholes },
  { path: '/dashboard-import', name: 'Import Data', component: ImportData },
  { path: '/404', name: '404', component: PageNotFound },
  { path: '/edit-password', name: 'Edit Password', component: EditPassword },
  { path: '/dashboard-rtms', name: 'Remote Traffic Microwave Sensor (RTMS)', component: rtms },
];

export default routes;
