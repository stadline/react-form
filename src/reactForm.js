import React from 'react';

const identity = value => value;

const reactForm = (transform = identity, reverseTransform = identity) => {
  return (ChildComponent) => class FormComponent extends React.Component {
    static propTypes = {
      value: React.PropTypes.any.isRequired,
      onChange: React.PropTypes.func.isRequired
    }

    state = {
      reverseTransform: {}
    }

    render () {
      const { value, onChange, ...rest } = this.props;

      return <ChildComponent
        value={this.getTransformValue(value)}
        formValue={this.getTransformValue(value)}
        onChange={this.handleChange}
        onFormChange={this.handleChange}
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
      return transform(modelValue, this.state.reverseTransform.source);
    }

    handleChange = (formValue) => {
      const { value, onChange } = this.props;
      const modelValue = reverseTransform(formValue, value);

      // save reverse transform value
      // it will be used to keep user value on transform
      this.setState({
        reverseTransform: { source: formValue, result: modelValue }
      });

      // send value
      onChange(modelValue);
    }
  };
};

export default reactForm;
