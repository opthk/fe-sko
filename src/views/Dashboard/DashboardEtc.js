import React, { Component } from 'react';
import { connect } from 'react-redux';

class DashboardComplainRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_branch: '',
    };
  }

  render() {
    return (
      <div>a</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    myIdentity: state.user.myIdentity,
    myAccess: state.user.myAccess,
  }
}

export default connect(mapStateToProps)(DashboardComplainRating)