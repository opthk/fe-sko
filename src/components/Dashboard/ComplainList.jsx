import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table
} from 'reactstrap';
import { complainActions } from '../../store/action'

class TrafficDaily extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { dispatch } = this.props
    var identity = JSON.parse(localStorage.getItem('identity'))

    if (identity.branch_code === 'PUSAT') {
      dispatch(complainActions.getComplainList(identity.branch_code));
    }
  }

  render() {

    const { complainList } = this.props
    var dataList
    if (complainList) {
      dataList = complainList.map((val, idx) => {
        return (
          <tr key={idx}>
            <td className="text-center">
              <div className="avatar">
                <div className="avatar">
                  <img src={'assets/img/avatars/no-image-icon-hi.png'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  <span className="avatar-status badge-warning"></span>
                </div>
                <span className="avatar-status badge-danger"></span>
              </div>
            </td>
            <td>
              <div>{val.email}</div>
              <div className="small">
                <span>{val.phone}</span>
              </div>
            </td>
            <td>
              <div className="clearfix">
                <div>
                  <small title={val.description}>{val.description}</small>
                </div>
              </div>
            </td>
            <td>
              <span className="small">{val.event_time}</span>
            </td>
          </tr>
        )
      })
    }

    return (
      <Table style={{ backgroundColor: 'rgba(0,0,0,0.0)', color: '#fff' }}>
        <thead>
          <tr>
            <th colSpan="2" style={{ width: 20 + '%' }} ><i className="icon-people"></i> Complain & Info</th>
            <th className="text-center"></th>
            <th style={{ width: 15 + '%' }}>Event Time</th>
          </tr>
        </thead>
        <tbody>
          {dataList}
        </tbody>
      </Table>
    )
  }

}
const mapStateToProps = (state) => {
  return {
    complainList: state.complain.complainList
  }
}
export default connect(mapStateToProps)(TrafficDaily)