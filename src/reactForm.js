import React, { Component } from 'react';
import PropTypes from 'prop-types';

const identity = value => value;

const reactForm = (transform = identity, reverseTransform = identity) => {
  return (ChildComponent) => class FormComponent extends Component {
    static propTypes = {
      value: PropTypes.any.isRequired,
      onChange: PropTypes.func.isRequired
    }

    state = {
      reverseTransform: {}
    }

    render () {
      const { value, onChange, ...rest } = this.props;

      return <ChildComponent
        value={this.getTransformValue(value)}
        formValue={this.getTransformValue(value)}
        onChange={this.handleFormChange}
        onFormChange={this.handleFormChange}
        onFieldChange={this.handleFieldChange}
        modelValue={value}
        onModelChange={onChange}
        {...rest} />;
    }

    /**
     * Return previous reverseTransform result
     * if given modelValue is the same as reverseTransform source
     *
     * Return transformed value otherwise
     */
    getTransformValue (modelValue) {
      return transform(modelValue, this.state.reverseTransform.source, this.props);
    }

    handleFormChange = (formValue) => {
      const { value, onChange } = this.props;
      const modelValue = reverseTransform(formValue, value, this.props);

      // save reverse transform value
      // it will be used to keep user value on transform
      this.setState({
        reverseTransform: { source: formValue, result: modelValue }
      });

      // send value
      onChange(modelValue);
    }

    handleFieldChange = (fieldName, valueSelector = identity) => (fieldValue) => {
      const { value } = this.props;
      const formValue = this.getTransformValue(value);

      this.handleFormChange({
        ...formValue,
        [fieldName]: valueSelector(fieldValue)
      });
    }
  };
};

export default reactForm;
