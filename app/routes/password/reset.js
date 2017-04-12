import Ember from 'ember';
const { Route, get, inject: { service } } = Ember;

export default Route.extend({

  ajax: service(),
  session: service(),

  actions: {
    resetPassword(password, passwordConfirmation) {
      return get(this, 'ajax').request('/password/reset', {
        method: 'POST',
        data: {
          password,
          passwordConfirmation
        }
      }).then((json) => {
        return get(this, 'session').authenticate('authenticator:jwt', { identification: json.email, password });
      });
    }
  }
});
