import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginActions } from '../../../store/action'
import './Login.css';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      appcode: '2',
      visible: false,
      loading: false,
      showPassword: false
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const dataLogin = {
      username: this.state.username,
      password: this.state.password,
      id_application: this.state.appcode,
    }
    const { dispatch } = this.props;
    this.setState({ loading: true, visible: false });
    dispatch(loginActions.login(dataLogin));
  }

  togglePassword = () => {
    this.setState(prev => ({ showPassword: !prev.showPassword }))
  }

  onDismiss = () => {
    this.setState({ visible: false })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.loggedIn !== nextProps.loggedIn) {
      this.props.history.push('/')
    }
    else {
      this.setState({ visible: true, loading: false });
    }
  }

  render() {
    const { loading, showPassword, visible } = this.state;
    const year = new Date().getFullYear();

    return (
      <div className="sko-login">
        <div className="sko-login__inner">
          <section className="sko-login__hero">
            <span className="sko-login__eyebrow">
              <span className="sko-login__eyebrow-dot" />
              Command Center
            </span>
            <h1 className="sko-login__title">
              Sistem Kendali <span>Operasi Tol</span>
            </h1>
            <p className="sko-login__subtitle">
              Pantau lalu lintas, insiden, dan kinerja ruas tol Hutama Karya
              secara real-time dalam satu dashboard terpadu.
            </p>
            <ul className="sko-login__features">
              <li><i className="icon-speedometer" /> Monitoring lalu lintas</li>
              <li><i className="icon-bell" /> Laporan insiden</li>
              <li><i className="icon-chart" /> Laporan kinerja</li>
            </ul>
          </section>

          <div className="sko-login__card">
            <img className="sko-login__logo" src="/assets/img/wallpaper/logo-site.png" alt="Hutama Karya" />
            <h2 className="sko-login__card-title">Selamat Datang</h2>
            <p className="sko-login__card-subtitle">Masuk untuk melanjutkan ke dashboard</p>

            <form onSubmit={this.handleSubmit} noValidate={false}>
              {visible && this.props.message && (
                <div className="sko-login__alert" role="alert">
                  <i className="icon-exclamation" />
                  <span>{this.props.message}</span>
                  <button type="button" className="sko-login__alert-close" onClick={this.onDismiss} aria-label="Tutup">&times;</button>
                </div>
              )}

              <div className="sko-login__field">
                <label className="sko-login__label" htmlFor="login-username">Username</label>
                <div className="sko-login__control">
                  <i className="icon-user sko-login__icon" />
                  <input
                    id="login-username"
                    className="sko-login__input"
                    type="text"
                    name="username"
                    placeholder="Masukkan username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    autoComplete="username"
                    autoFocus
                    required
                  />
                </div>
              </div>

              <div className="sko-login__field">
                <label className="sko-login__label" htmlFor="login-password">Password</label>
                <div className="sko-login__control">
                  <i className="icon-lock sko-login__icon" />
                  <input
                    id="login-password"
                    className="sko-login__input"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Masukkan password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="sko-login__toggle"
                    onClick={this.togglePassword}
                    aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                  >
                    <i className={showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'} />
                  </button>
                </div>
              </div>

              <input type="hidden" name="application_code" value={this.state.appcode} />
              <button type="submit" className="sko-login__submit" disabled={loading}>
                {loading && <span className="sko-login__spinner" />}
                {loading ? 'Memproses...' : 'Masuk'}
              </button>
            </form>

            <p className="sko-login__footer">&copy; {year} PT Hutama Karya (Persero) &middot; SKO</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usernameAlert: state.alert.usernameAlert,
    passwordAlert: state.alert.passwordAlert,
    message: state.alert.message,
    loggedIn: state.login.loggedIn
  }
}

export default withRouter(connect(mapStateToProps)(Login))
