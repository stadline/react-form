import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Input extends PureComponent {
  render () {
    return <input {...this.props} onChange={this.handleChange} />;
  }

  handleChange = (event) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(event.target.value);
    }
  }
};

Input.propTypes = {
  onChange: PropTypes.func
};

export default Input;
