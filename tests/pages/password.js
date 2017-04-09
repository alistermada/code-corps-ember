import {
  create,
  visitable
} from 'ember-cli-page-object';
import form from './components/password/forgot-password';

export default create({
  visitReset: visitable('/password/reset'),
  visitForgot: visitable('/password/forgot'),

  form
});
