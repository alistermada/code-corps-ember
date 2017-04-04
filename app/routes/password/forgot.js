import Ember from 'ember';
const { Route, inject: { service } } = Ember;

export default Route.extend({

  ajax: service(),

  actions: {
    forgotPassword(email) {
      return this.get('ajax').request('/password/forgot', {
        method: 'POST',
        data: {
          email
        }
      });
    }
  }
});
