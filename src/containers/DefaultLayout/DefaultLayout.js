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

// Pages rendered on the dark navy background (dark tables / panels)
const DARK_PAGES = [
  '/dashboard-senkom',
  '/dashboard-accident-report',
  '/dashboard-traffic-analytics',
];

class DefaultLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id_branch: '',
      landing: false
    };
    this.signOut = this.signOut.bind(this);

  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    const { dispatch } = this.props;
    dispatch(loginActions.logout());
    this.props.history.push('/login')
  }

  editPassword(e) {
    this.props.history.push('/edit-password')
  }

  downloadDoc(e) {
    e.preventDefault()
    const response = {
      file: 'http://103.215.27.254:3000/assets/doc/user_guide.docx',
    };
    window.location.href = response.file;
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(userActions.getMyIdentity());
    this.setState({
      route: this.props.history
    })
  }

  componentDidMount() {
    const { dispatch } = this.props;
    setTimeout(function () {
      dispatch(loginActions.logout());
      this.props.history.push('/login')
    }, 34200000)
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.myIdentity) {
      this.props.history.push('/login')
    } else {
      if (nextProps.myIdentity.ID_GROUP === 5) {
        this.setState({
          landing: <Redirect from="/" to="/dashboard-transaction" />,
          landingStyle: {
            backgroundImage: `url(../../assets/img/wallpaper/wallpaper_1.jpg)`,
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            position: 'relative',
            minHeight: '100vh',
            width: '100%',
            overflow: 'hidden',
          },
          overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.2)' // Hitam dengan 50% kekaburan (transparansi)
          },
          headerStyle: <AppHeader hidden>
            <Suspense fallback={this.loading()}>
              <DefaultHeader onLogout={e => this.signOut(e)} />
            </Suspense>
          </AppHeader>,
          breadCumb: <br />,
          sidebarStyle: <AppSidebar hidden>
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={nextProps.myAccess} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
        })
      } else {
        this.setState({
          sidebarStyle: <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={nextProps.myAccess} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>,
          landing: <Redirect from="/" to="/landing-page" />,
          landingStyle: {
            backgroundImage: `none`,
            backgroundColor: `#e7e7e7`,
          },
          headerStyle: <AppHeader fixed>
            <Suspense fallback={this.loading()}>
              <DefaultHeader
                onLogout={e => this.signOut(e)}
                editPassword={e => this.editPassword(e)}
                downloadDoc={e => this.downloadDoc(e)} />
            </Suspense>
          </AppHeader>,
          breadCumb: <AppBreadcrumb appRoutes={routes} />,
          footer: <AppFooter>
            <Suspense fallback={this.loading()}>
              <DefaultFooter />
            </Suspense>
          </AppFooter>
        })
      }
    }
    if (nextProps.location !== this.props.location) {
      if (nextProps.myIdentity.ID_GROUP !== 5 && nextProps.location.pathname === '/dashboard-overview' || nextProps.location.pathname === '/landing-page') {
        this.setState({
          landingStyle: {
            backgroundImage: `url(../../assets/img/wallpaper/night-lights-road-y4.jpg`, backgroundRepeat: "no-repeat",
            backgroundSize: "auto", WebkitBackgroundSize: "cover",
            MozBackgroundSize: "cover",
            ObackgroundSize: "cover",
          },
        })
      }
      else if (nextProps.myIdentity.ID_GROUP === 5) {
        this.setState({
          landingStyle: {
            backgroundImage: `url(../../assets/img/wallpaper/wallpaper_1.jpg`,
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            position: 'relative',
            minHeight: '100vh',
            width: '100%',
            overflow: 'hidden',
          },
          overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.2)' // Hitam dengan 50% kekaburan (transparansi)
          }
        })
      }
      else {
        this.setState({
          landingStyle: {
            backgroundImage: `none`,
            backgroundColor: `#e7e7e7`,
          },
        })
      }
    }
  }

  render() {
    const isSentimentPage = this.props.location.pathname === '/dashboard-sentiment-analysis';
    const landingStyle = this.state.landingStyle || {};
    const { pathname } = this.props.location;
    const identity = this.props.myIdentity;
    // Decide the photo background from the current path on every render
    // (state.landingStyle is only refreshed on navigation, so a direct load of
    // /landing-page used to show the grey background instead of the photo).
    const isNightPhotoPage = pathname === '/landing-page' ||
      (pathname === '/dashboard-overview' && !!identity && identity.ID_GROUP !== 5);
    const photoImage = isNightPhotoPage
      ? 'url(/assets/img/wallpaper/night-lights-road-y4.jpg)'
      : landingStyle.backgroundImage;
    // When the page uses a photo background, paint it on the whole app (fixed)
    // so it also shows through the glass sidebar; <main> becomes transparent.
    const hasPhotoBg = !isSentimentPage && !!photoImage && photoImage !== 'none';
    const appStyle = hasPhotoBg
      ? {
        backgroundColor: '#0b1a22',
        backgroundImage: photoImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }
      : undefined;
    const mainStyle = isSentimentPage
      ? {
        backgroundImage: 'none',
        background: '#0b1a31',
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
      }
      : hasPhotoBg
        ? { ...landingStyle, backgroundImage: 'none', backgroundColor: 'transparent' }
        : DARK_PAGES.indexOf(pathname) !== -1
          ? {
            ...landingStyle,
            backgroundImage: 'radial-gradient(ellipse at top left, #13303d 0%, #0b1a22 55%, #08131a 100%)',
            backgroundColor: '#0b1a22',
            backgroundAttachment: 'fixed',
          }
          : landingStyle;

    return (
      <div className={`app${hasPhotoBg ? ' sko-photo-bg' : ''}`} style={appStyle}>
        {this.state.headerStyle}
        <div className="app-body">
          {this.state.sidebarStyle}

          <main
            className="main"
            style={mainStyle}
          >
            {!isSentimentPage && <div style={this.state.overlay}></div>}

            {this.state.breadCumb}

            <Container
              fluid
              style={
                isSentimentPage
                  ? {
                    paddingLeft: 0,
                    paddingRight: 0,
                  }
                  : {}
              }
            >
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
                        )}
                      />
                    ) : null;
                  })}
                  {this.state.landing}
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
        {this.state.footer}
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