import React, { Component } from "react";
import { connect } from "react-redux";
import { FaArrowRight } from "react-icons/fa";
import { Col, Row, Table, Button } from "reactstrap";

class OverviewTableRuasList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "primary",
    };
  }
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  componentWillReceiveProps(nextProps) {
    if (nextProps.value > 95) {
      this.setState({
        color: "success",
      });
    } else if (nextProps.value > 90) {
      this.setState({
        color: "warning",
      });
    } else {
      this.setState({
        color: "danger",
      });
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row style={this.props.style}>
          <Col>
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                color: "white", // Warna teks putih
                borderRadius: "20px", // Border radius
                fontSize: "18px",
                letterSpacing: "2px",
                background: "rgba(110,190,236,0.2)",
                backdropFilter: "blur(10px)", // Efek kaca
                WebkitBackdropFilter: "blur(10px)", // Efek kaca untuk Safari
                border: "1px solid rgba(255, 255, 255, 0.2)", // Border semi-transparans
                padding: "3px",
                margin: "10px",
              }}
              onClick={() => this.props.toggle(this.props.ruas, this.props.value)}
            >
              <Row className="align-items-center" style={{ padding: "5px" }}>
                <Col md="6">
                  <div>{this.props.ruas}</div>
                </Col>
                <Col md="4">
                  <div style={{ color: this.props.value >= 100 ? "#06D001" : "red" }}>
                    {parseFloat(this.props.value).toFixed(2) + " %"}
                  </div>
                </Col>
                <Col md="1">
                  <div
                    style={{ color: this.props.customColor }}>
                    <FaArrowRight />
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myIdentity: state.user.myIdentity,
    myAccess: state.user.myAccess,
    chartData: state.chartData.chartData,
  };
};
export default connect(mapStateToProps)(OverviewTableRuasList);
