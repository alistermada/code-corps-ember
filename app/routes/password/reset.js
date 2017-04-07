import Ember from 'ember';
const { Route, get, inject: { service } } = Ember;

export default Route.extend({

  ajax: service(),

  actions: {
    resetPassword(password, passwordConfirmation) {
      return get(this, 'ajax').request('/password/reset', {
        method: 'POST',
        data: {
          password,
          passwordConfirmation
        }
      });
    }
  }
});
