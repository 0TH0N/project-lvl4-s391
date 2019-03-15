import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Button, Col } from 'react-bootstrap';
import connect from '../../connect';

const mapStateToProps = () => {
  const props = {

  };
  return props;
};


@connect(mapStateToProps)
class NewChannel extends React.Component {
  handleAddNewChannel = async (values) => {
    const { addChannel, reset } = this.props;
    const newChannel = {
      attributes: {
        ...values,
      },
    };
    try {
      await addChannel(newChannel);
      reset();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message);
    }
  }

  ReduxFormControl = ({ input, meta, ...props }) => <Form.Control {...props} {...input} />;

  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.handleAddNewChannel)}>
        <Form.Group>
          <Form.Row>
            <Col sm={12}>
              <Field
                component={this.ReduxFormControl}
                name="name"
                required
                disabled={submitting}
              />
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group>
          <Form.Row>
            <Col sm={12}>
              <Button variant="primary" type="submit" disabled={submitting || pristine} className="btn-block">Add channel</Button>
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