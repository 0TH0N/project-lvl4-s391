import { reduxForm } from 'redux-form';

export default name => Form => reduxForm({
  form: name,
})(Form);
