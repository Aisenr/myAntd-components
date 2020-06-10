import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import FormGroup from './FormGroup';

@Form.create()
class WrappedFormGroup extends React.Component {

  static propTypes = {
    ...FormGroup.propTypes,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    onSubmit() {},
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSubmit(e, values);
      }
    });
  };

  render() {
    return (
      <Form layout={this.props.layout} onSubmit={this.handleSubmit}>
        <FormGroup {...this.props} />
      </Form>
    );
  }
}

function FormWrapper(props) {
  return props.form ? <Form layout={props.layout}><FormGroup {...props} /></Form> : <WrappedFormGroup {...props} />;
}

FormWrapper.propTypes = FormGroup.propTypes;
FormWrapper.defaultProps = FormGroup.defaultProps;

export default FormWrapper;
