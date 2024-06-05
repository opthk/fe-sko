import React, { Component } from 'react';
import '../css/dashboard-transaction.scss'

class TransactionPercentage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      class1: '',
      class2: '',
      class3: '',
      class4: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.spinnerID === 'spinner-two') {
      this.setState({
        class1: 'spinner-circle spinner-circle-outer-2',
        class2: 'spinner-circle-off spinner-circle-inner-2',
        class3: 'spinner-circle spinner-circle-single-1-2',
        class4: 'spinner-circle spinner-circle-single-2-2',
      });
    } else {
      this.setState({
        class1: 'spinner-circle spinner-circle-outer',
        class2: 'spinner-circle-off spinner-circle-inner',
        class3: 'spinner-circle spinner-circle-single-1',
        class4: 'spinner-circle spinner-circle-single-2',
      });
    }
  }

  render() {
    return (
      <div className="spinner" id={this.props.spinnerID} >
        <div className={this.state.class1}></div>
        <div className={this.state.class2}></div>
        <div className={this.state.class3}></div>
        <div className={this.state.class4}></div>
        <div className="text" style={{ fontSize: '32px' }}>{this.props.value}</div>
        <div className="title" id="ruas_title">{this.props.spinnerTitle}</div>
      </div>
    )
  }
}

export default (TransactionPercentage)