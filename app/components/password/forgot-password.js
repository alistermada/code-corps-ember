import Ember from 'ember';
const { Component, set, get, inject: { service } } = Ember;
import { task } from 'ember-concurrency';

export default Component.extend({
  classNames: ['forgot-password-form'],

  /**
   * @property flashMessages
   * @type Ember.Service
   */
  flashMessages: service(),

  /**
   * @property email
   * @default String
   */
  email: '',
  /**
   * @property error
   */
  error: null,

  /**
   * @property forgotPasswordTask
   * @param email
   */
  forgotPasswordTask: task(function* (email) {
    try {
      yield get(this, 'forgotPassword')(email);
      get(this, 'flashMessages').clearMessages().success('If your email is associated with an account registered here, a password reset link has been sent to it.');
      set(this, 'error', null);
    } catch(e) {
      set(this, 'error', e);
    }
  }),

  actions: {

  /**
   * @method forgotPassword
   * @param email
   */
    forgotPassword(email) {
      return get(this, 'forgotPasswordTask').perform(email);
    }

  }
});
