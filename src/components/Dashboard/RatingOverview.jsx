import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Col,
  Row,
  Table,
  Progress
} from 'reactstrap';
import { reviewActions } from '../../store/action'

class RatingOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      daily: '',
      redraw: false
    };
  }

  componentWillMount() {
    const { dispatch } = this.props
    var identity = JSON.parse(localStorage.getItem('identity'))
    if (identity.branch_code === 'PUSAT') {
      dispatch(reviewActions.getDataReview(identity.branch_code));
    }
  }

  render() {

    const { dataReview } = this.props
    var resReview
    var sorted
    var color
    var rank

    if (dataReview) {
      sorted = dataReview.sort((a, b) => parseFloat(b.review) - parseFloat(a.review));
      resReview = sorted.map((val, idx) => {
        if (idx === 0) {
          rank = ' ' + (parseInt(idx) + 1) + 'st'
        } else if (idx === 1) {
          rank = ' ' + (parseInt(idx) + 1) + 'nd'
        } else if (idx === 2) {
          rank = ' ' + (parseInt(idx) + 1) + 'rd'
        } else {
          rank = ' ' + (parseInt(idx) + 1) + 'th'
        }
        return (
          <tr key={idx}>
            <td className="text-center">
              <div className="avatar">
                <i className="fa fa-trophy"></i>
                <strong>{rank}</strong>
              </div>
            </td>
            <td>
              <div>{val.ruas_name}</div>
              <small>{val.ruas_code}</small>
              <div className="small">
                <span>Review</span> | {val.review} / 5
            </div>
            </td>
            <td>
              <Row>
                <Col>
                  <Row>
                    {
                      val.desc.map((value, index) => {
                        if (value.rating >= 80) {
                          color = 'success'
                        }
                        else if (value.rating >= 60) {
                          color = 'warning'
                        }
                        else {
                          color = 'danger'
                        }
                        return (
                          <Col lg="4" key={index}>
                            <div className="progress-group-bars">
                              <small>{value.question}</small>
                              <Progress className="progress-xs" color={color} value={value.rating} title={value.rating} />
                            </div>
                          </Col>
                        )
                      })
                    }
                  </Row>
                </Col>
              </Row>
            </td>
          </tr>
        )
      })
    }

    return (
      <Row>
        <Col>
          <Table borderless style={{ backgroundColor: 'rgba(0,0,0,0.0)', color: '#fff', fontSize: '14px' }}>
            <thead>
              <tr>
                <th colSpan="2"><i className="fa fa-star"></i> User Rating</th>
                <th style={{ width: 50 + '%' }}></th>
              </tr>
            </thead>
            <tbody>
              {resReview}
            </tbody>
          </Table>
        </Col>
      </Row>
    )
  }

}
const mapStateToProps = (state) => {
  return {
    myIdentity: state.user.myIdentity,
    dataReview: state.review.review,
  }
}
export default connect(mapStateToProps)(RatingOverview)