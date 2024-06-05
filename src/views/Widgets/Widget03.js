import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  dataBox: PropTypes.func,
};

const defaultProps = {
  dataBox: () => ({ variant: 'facebook', friends: '-', feeds: '-' }),
};

class Widget03 extends Component {
  render() {

    const { children, className, cssModule, dataBox } = this.props;

    const data = dataBox();
    const variant = data.variant;

    var back = ''
    if (variant === 'car') {
      // icon = 'fa fa-car';
      back = 'bg-twitter';
    } else {
      // icon = 'fa fa-dollar';
      back = 'bg-twitter';
    }

    const keys = Object.keys(data);
    const vals = Object.values(data);

    const classCard = 'brand-card';
    const classCardHeader = classNames(`${classCard}-header`, back);
    const classCardBody = classNames(`${classCard}-body`);
    const classes = mapToCssModules(classNames(classCard, className), cssModule);
    return (
      <div className={classes}>
        <div className={classCardHeader}>
          {children}
          <h4 className="text-white">{vals[3]}</h4>
        </div>
        <div className={classCardBody}>
          <div>
            <div className="text-value">{vals[1] + ' %'}</div>
            < div className="text-uppercase text-muted small">{keys[1]}</div>
          </div>
          <div>
            <div className="text-value">{vals[2] + ' %'}</div>
            <div className="text-uppercase text-muted small">{keys[2]}</div>
          </div>
        </div>
      </div>
    );
  }
}

Widget03.propTypes = propTypes;
Widget03.defaultProps = defaultProps;

export default Widget03;
