import React from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardText, CardBody, CardTitle } from 'reactstrap';

class CardBasic extends React.Component {
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
        <Card inverse className="card-custom border-blue font-roboto" style={{ backgroundColor: '#333', borderColor: '#333', fontSize: '12px' }}>
          <CardHeader className="font-roboto bg-blue-transparent border-blue card-header-padding">
            {this.props.title}
          </CardHeader>
          <CardBody>
            {this.props.body}
          </CardBody>
        </Card>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lalinComparison: state.comparisonTransaction.comparison.lalin,
  }
}
export default connect(mapStateToProps)(CardBasic)