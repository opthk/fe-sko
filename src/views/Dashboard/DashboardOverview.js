import React, { Component } from 'react';
import DashboardOverviewDivisi from '../../components/Dashboard/DashboardOverviewDivisi';
import DashboardOverviewCabang from '../../components/Dashboard/DashboardOverviewCabang';

class DashboardOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDivision: false,
    };
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  componentWillMount() {
    var identity = JSON.parse(localStorage.getItem('identity'))
    if (identity.branch_code === 'PUSAT') {
      this.setState({
        isDivision: true
      });
    }
  }

  render() {
    let display
    if (this.state.isDivision) {
      display = <DashboardOverviewDivisi
        is_division={this.state.isDivision}
      />
    } else {
      display = <DashboardOverviewCabang
        is_division={this.state.isDivision}
      />
    }
    return (
      <div id="overview" className="animated fadeIn">
        {display}
      </div >
    );
  }
}

export default DashboardOverview