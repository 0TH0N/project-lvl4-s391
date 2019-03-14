import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Button, Col } from 'react-bootstrap';
import connect from '../connect';

const mapStateToProps = (state) => {
  const props = {

  };
  return props;
};


@connect(mapStateToProps)
class NewChannel extends React.Component {
  handleAddNewChannel = () => {
    const a = 5;
    return a;
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    const ReduxFormControl = ({ input, meta, ...props }) => <Form.Control {...props} {...input} />;
    return (
      <Form onSubmit={handleSubmit(this.handleAddNewChannel)}>
        <Form.Group>
          <Form.Row>
            <Col sm={12}>
              <Field
                component={ReduxFormControl}
                name="channel"
                required
                submitting={submitting}
              />
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group>
          <Form.Row>
            <Col sm={12}>
              <Button variant="primary" type="submit" disabled={submitting} className="btn-block">Add channel</Button>
            </Col>
          </Form.Row>
        </Form.Group>
      </Form>
    );
  }
}


export default reduxForm(
  {
    form: 'newChannel',
  },
)(NewChannel);
