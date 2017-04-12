import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Select extends PureComponent {
  render () {
    return <select {...this.props} onChange={this.handleChange} />;
  }

  handleChange = (event) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(event.target.value);
    }
  }
};

Select.propTypes = {
  onChange: PropTypes.func
};

export default Select;
