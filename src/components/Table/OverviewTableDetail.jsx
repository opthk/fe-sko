import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';

class OverviewTableDetail extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      color: 'primary',
    };
  }

  render() {
    return (
      <div>
        <div className="text-center" style={{ color: '#fff', fontSize: '16px', marginBottom: '15px' }}>
          <b>Achievement Detail {this.props.ruas}</b>
        </div>
        <Table size="sm" responsive style={{ color: '#fff', fontSize: '18px' }}>
          <tbody>
            <tr>
              <td>Transaction</td>
              <td>{this.props.percentage_trans}</td>
            </tr>
            <tr>
              <td>Traffic</td>
              <td>{this.props.percentage_lalin}</td>
            </tr>
            <tr>
              <td>Settlement</td>
              <td>{this.props.percentage_settlement}</td>
            </tr>
            <tr>
              <td>Safety Level</td>
              <td>99.99 %</td>
            </tr>
            <tr>
              <td>Potholes Handling</td>
              <td>{this.props.percentage_potholes}</td>
            </tr>
          </tbody>
        </Table>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lalinComparison: state.comparisonTransaction.comparison.lalin,
  }
}
export default connect(mapStateToProps)(OverviewTableDetail)