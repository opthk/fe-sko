import React, { Component } from 'react';
import '../css/dashboard-transaction.scss'

class TransactionPercentage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      daily: '',
      redraw: false,
    };
  }

  componentWillMount() {
    var identity = JSON.parse(localStorage.getItem('identity'))
    if (identity.ID_GROUP === 5) {
      this.setState({
        style: { fontSize: '24px', marginTop: '40%', color: '#fff', marginLeft: '-22.5%', position: 'absolute' },
        font: { color: '#fff' }
      })
    } else {
      this.setState({
        style: { fontSize: '24px', marginTop: '40%', color: '#333', marginLeft: '-22.5%', position: 'absolute' },
        font: { color: '#333' }
      })
    }
  }

  render() {
    return (
      <div className="spinner-block text-center">
        <div className={this.props.spinner_class} style={{ marginLeft: '25%' }}>
          <span style={this.state.style}>
            {this.props.percentage}
          </span>
        </div>
        <small style={this.state.font}><b> {this.props.title} </b></small>
      </div>
    )
  }
}

export default (TransactionPercentage)