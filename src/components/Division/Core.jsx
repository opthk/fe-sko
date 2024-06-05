import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Progress } from 'reactstrap';

class Core extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      color: 'primary',
    };
  }

  render() {
    let d = new Date()
    
    return (
      <div>
        <Row>
          <Col>
            <marquee style={{ color: "yellow" }}><span align="center" className="font-roboto m-0 p-1">PT Hutama Karya (Persero) - Indonesia's Most Valuable. Infrastructure Developer</span></marquee>
          </Col>
        </Row>
        <Row>
          <Col>
            <br />
            <h3 align="center" className="text-white font-roboto">{this.props.ruas}</h3>
            <br />
            <h4 align="center" className="text-white font-roboto">Overview</h4>
            <h6 align="center" className="text-white font-roboto">Periode {d.getFullYear()}</h6>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="card bg-transparent" style={{ position: 'relative', marginBottom: '0.5rem', marginTop: '-50px', padding: '5rem', zIndex: '-1', backgroundSize: '130%', backgroundPosition: '50% 50%', border: 'none' }}>
              <div style={{ alignSelf: 'center', position: 'inherit', backgroundImage: 'url(../../assets/img/background/core.png)', backgroundSize: 'cover', height: '30rem', width: '30rem' }}>
                <div id="bar_dashboard" style={{ width: '20rem', marginLeft: '40px', marginTop: '40px', position: 'absolute' }}>
                  <div id="bar_dashboard2" style={{ width: '18rem', marginLeft: '17px', marginTop: '17px', position: 'absolute' }}>
                    <div style={{ position: 'inherit', top: '4.71rem', left: '4.66rem', height: '100%', width: '100%' }}>
                      <div className="semi_arc e6" style={{ marginLeft: '7px', marginTop: '7px', position: 'absolute' }}>
                        <div className="semi_arc_3 e5_1">
                          <div className="semi_arc_3 e5_2">
                            <div className="semi_arc_3 e5_3">
                              <div className="semi_arc_3 e5_4">
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="core2">
                          <span id="valueTotal" className="font-roboto text-info" style={{ color: '#000' }}>{this.props.percentage}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lalinComparison: state.comparisonTransaction.comparison.lalin,
  }
}
export default connect(mapStateToProps)(Core)