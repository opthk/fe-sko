import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import Loadable from 'react-loadable';
import './App.scss';
import { ProtectedRoute } from "./routes/protectedRoute";
import { PublicRoute } from "./routes/publicRoute";
import { Provider } from 'react-redux';
import store from "./store";
import ReduxToastr from 'react-redux-toastr'

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading
});

const Register = Loadable({
  loader: () => import('./views/Pages/Register'),
  loading
});

const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404'),
  loading
});

const Page500 = Loadable({
  loader: () => import('./views/Pages/Page500'),
  loading
});

const history = createBrowserHistory();

class App extends Component {

  // componentDidMount() {
  //   history.listen((location, action) => {
  //     console.log(
  //       `The current URL is ${location.pathname}${location.search}${location.hash}`
  //     );
  //   });
  // }

  render() {
    return (
      <Provider store={store}>
        <div>
          <Router history={history}>
            <Switch>
              <PublicRoute path={'/login'} component={Login} />
              <Route exact path="/register" name="Register Page" component={Register} />
              <Route exact path="/404" name="Page 404" component={Page404} />
              <Route exact path="/500" name="Page 500" component={Page500} />
              <ProtectedRoute path={'/'} component={DefaultLayout} />
            </Switch>
          </Router>
        </div>
        <div>
          <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick />
        </div>
      </Provider>
    );
  }
}

export default App;
