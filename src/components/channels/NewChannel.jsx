import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Button, Col } from 'react-bootstrap';
import connect from '../../utilities/connect';


const mapStateToProps = () => {
  const props = {

  };
  return props;
};


@reduxForm({
  form: 'newChannel',
})
@connect(mapStateToProps)
class NewChannel extends React.Component {
  handleAddNewChannel = async (values) => {
    const { addChannel, reset } = this.props;
    const newChannel = {
      attributes: {
        ...values,
      },
    };
    await addChannel(newChannel);
    reset();
  }

  ReduxFormControl = ({ input, meta, ...props }) => <Form.Control {...props} {...input} />;

  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.handleAddNewChannel)}>
        <Form.Group>
          <Form.Row>
            <Col sm={6} lg={8}>
              <Field
                component={this.ReduxFormControl}
                name="name"
                required
                disabled={submitting}
              />
            </Col>
            <Col sm={6} lg={4}>
              <Button variant="primary" type="submit" disabled={submitting || pristine} className="btn-block">Add</Button>
            </Col>
          </Form.Row>
        </Form.Group>
      </Form>
    );
  }
}


export default NewChannel;
