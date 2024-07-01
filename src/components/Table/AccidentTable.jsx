import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card, CardBody, CardHeader, Table } from 'reactstrap';
import DropdownMenuCommandPanel from '../Button/DropdownMenuCommandPanel';

class AccidentTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_branch: '',
      dropdownOpen: false,
      radioSelected: 2,
    };
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  componentWillMount() {
    if (this.props.isCommandCenter) {
      this.setState({
        style: { color: '#fff', textAlign: 'center', fontSize: '12px', backgroundColor: 'rgba(0,0,0,0.0)', border: 'none' },
        styleHeader: { color: '#fff', backgroundColor: 'rgba(0,0,0,0.0)', textAlign: 'left', }
      });
    } else {
      this.setState({
        style: { color: '#333', textAlign: 'center', fontSize: '12px' },
        styleHeader: { color: '#333', textAlign: 'left', }
      });
    }
  }

  render() {
    var table = this.props.data.map((val, index) => {
      return (
        <tr key={index}>
          <td>{val.ruas}</td>
          <td>{val.event_time}</td>
          <td>{val.lokasi}</td>
          <td>{val.type}</td>
        </tr>
      )
    })

    return (
      <div className="animated fadeIn">
        <Card style={this.state.style}>
          <CardHeader style={this.state.styleHeader}>
            <i className="fa fa-ambulance"></i> Last Accident
                <DropdownMenuCommandPanel />
          </CardHeader>
          <CardBody>
            <Table style={this.state.style}>
              <thead>
                <tr>
                  <th>Ruas</th>
                  <th>Date</th>
                  <th>STA</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {table}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myIdentity: state.user.myIdentity,
    myAccess: state.user.myAccess,
    chartData: state.chartData.chartData,
  }
}
export default connect(mapStateToProps)(AccidentTable)