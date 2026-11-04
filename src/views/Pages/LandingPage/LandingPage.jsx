import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './LandingPage.css';

const getGreeting = (hour) => {
  if (hour < 11) return 'Selamat Pagi';
  if (hour < 15) return 'Selamat Siang';
  if (hour < 19) return 'Selamat Sore';
  return 'Selamat Malam';
};

class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      now: new Date(),
    };
  }

  componentDidMount() {
    let identity = null;
    try {
      identity = JSON.parse(localStorage.getItem('identity'));
    } catch (e) {
      identity = null;
    }
    this.setState({ username: (identity && identity.first_name) || '' });
    this.timer = setInterval(() => this.setState({ now: new Date() }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { username, now } = this.state;
    const time = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const date = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    return (
      <div className="sko-landing">
        <div className="sko-landing__inner">
          <img className="sko-landing__logo" src="/assets/img/wallpaper/logo-site.png" alt="Hutama Karya" />

          <span className="sko-landing__eyebrow">
            <span className="sko-landing__eyebrow-dot" />
            Command Center &middot; Online
          </span>

          <h1 className="sko-landing__title">
            Sistem Kendali <span>Operasi Tol</span>
          </h1>

          <p className="sko-landing__greeting">
            {getGreeting(now.getHours())}{username ? ', ' : ''}
            {username && <strong>{username}</strong>}!
          </p>

          <div className="sko-landing__clock">
            <div className="sko-landing__time">{time}</div>
            <div className="sko-landing__date">{date}</div>
          </div>

          <p className="sko-landing__hint">
            <i className="icon-menu" /> Pilih menu di sidebar untuk mulai memantau.
          </p>

          <ul className="sko-landing__features">
            <li><i className="icon-speedometer" /> Monitoring lalu lintas</li>
            <li><i className="icon-bell" /> Laporan insiden</li>
            <li><i className="icon-chart" /> Laporan kinerja</li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.loggedIn
  }
}

export default withRouter(connect(mapStateToProps)(LandingPage))
