import Ember from 'ember';
const { Route, inject: { service } } = Ember;
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {

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
