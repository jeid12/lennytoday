
import React from 'react';
import PropTypes from 'prop-types';
import { MDBBadge } from 'mdb-react-ui-kit';

const Badge = ({ children, styleInfo }) => {
  return (
    <MDBBadge color="primary" style={styleInfo}>
      {children}
    </MDBBadge>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  styleInfo: PropTypes.object
};

Badge.defaultProps = {
  styleInfo: {}
};

export default Badge;