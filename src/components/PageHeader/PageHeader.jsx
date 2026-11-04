import React from 'react';
import PropTypes from 'prop-types';
import './PageHeader.css';

// Page title bar used above data tables (Senkom Handling, Accident Report, ...)
const PageHeader = ({ icon, title, subtitle, count, countLabel, children }) => (
  <div className="sko-page-header">
    <div className="sko-page-header__main">
      {icon && (
        <div className="sko-page-header__icon">
          <i className={icon} />
        </div>
      )}
      <div>
        <h1 className="sko-page-header__title">
          {title}
          {typeof count === 'number' && count > 0 && (
            <span className="sko-page-header__count">
              {count.toLocaleString('id-ID')} {countLabel}
            </span>
          )}
        </h1>
        {subtitle && <p className="sko-page-header__subtitle">{subtitle}</p>}
      </div>
    </div>
    {children && <div className="sko-page-header__actions">{children}</div>}
  </div>
);

PageHeader.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node,
  count: PropTypes.number,
  countLabel: PropTypes.string,
  children: PropTypes.node,
};

PageHeader.defaultProps = {
  countLabel: 'data',
};

// Buttons styled to match the SKO theme
export const PageHeaderButton = ({ variant, icon, children, ...rest }) => (
  <button type="button" className={`sko-btn sko-btn--${variant}`} {...rest}>
    {icon && <i className={icon} />}
    <span>{children}</span>
  </button>
);

PageHeaderButton.propTypes = {
  variant: PropTypes.oneOf(['primary', 'excel', 'ghost']),
  icon: PropTypes.string,
  children: PropTypes.node,
};

PageHeaderButton.defaultProps = {
  variant: 'primary',
};

export default PageHeader;
