import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Checkbox extends PureComponent {
  render () {
    return <input {...this.props} type='checkbox' onChange={this.handleChange} />;
  }

  handleChange = (event) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(event.target.checked);
    }
  }
};

Checkbox.propTypes = {
  onChange: PropTypes.func
};

export default Checkbox;
