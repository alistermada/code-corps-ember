import Ember from 'ember';
const { Route, inject: { service } } = Ember;

export default Route.extend({

  ajax: service(),

  actions: {
    resetPassword(password, passwordConfirmation) {
      return this.get('ajax').request('/password/reset', {
        method: 'POST',
        data: {
          password,
          passwordConfirmation
        }
      });
    }
  }
});
