import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// import navigation from '../../_nav';
import routes from '../../routes';

import { loginActions, userActions } from '../../store/action'

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id_branch: '',
    };
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    const { dispatch } = this.props;
    dispatch(loginActions.logout());
    this.props.history.push('/login')
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(userActions.getMyIdentity());
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.myIdentity) {
      this.props.history.push('/login')
    }
  }

  render() {
    const { myAccess } = this.props

    return (
      <div className="app">
        <AppHeader hidden>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar hidden>
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={myAccess} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main" style={{ backgroundImage: `url(http://obdrive.com/wp-content/uploads/2014/01/abstract-world-collection_2723803.jpg` }}>
          {/* <main className="main"> */}
            <br />
            {/* <AppBreadcrumb appRoutes={routes} /> */}
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/dashboard-transaction" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        {/* <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myIdentity: state.user.myIdentity,
    myAccess: state.user.myAccess,
  }
}

export default withRouter(connect(mapStateToProps)(DefaultLayout))