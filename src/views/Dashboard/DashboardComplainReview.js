import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card, CardBody, CardHeader, Col, Row,
} from 'reactstrap';
import SocialMedia from '../../components/Dashboard/SocialMedia';
import RatingOverview from '../../components/Dashboard/RatingOverview';
import ComplainList from '../../components/Dashboard/ComplainList';
import DropdownMenuCommandPanel from '../../components/Button/DropdownMenuCommandPanel';

class DashboardComplainReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_branch: '',
      dropdownOpen: false,
      radioSelected: 2,
    };
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    return (
      <div className="animated fadeIn">
        <Card style={{ backgroundColor: 'rgba(0, 0, 0, 0.0)', border: 'none' }}>
          <CardHeader style={{ color: '#fff', backgroundColor: 'rgba(0,0,0,0.0)', fontSize: '16px' }}>
            <i className="fa fa-bullhorn"></i> <b>Rating and Complain Overview</b>
            <DropdownMenuCommandPanel />
          </CardHeader>
          <CardBody className="text-white">
            <Row>
              <Col lh="12">
                <Row>
                  <Col>
                    <RatingOverview />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ComplainList />
                  </Col>
                </Row>
              </Col>
              < Col lg="4" >
                <SocialMedia />
              </Col >
            </Row>
          </CardBody>
        </Card>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myIdentity: state.user.myIdentity,
    dataReview: state.review.review,
  }
}
export default connect(mapStateToProps)(DashboardComplainReview)

