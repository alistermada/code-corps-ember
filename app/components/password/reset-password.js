import Ember from 'ember';
const { Component, set, get } = Ember;
import { task } from 'ember-concurrency';

export default Component.extend({
  /**
   * @property password
   * @default String
   */
  password: '',
  /**
   * @property passwordConfirmation
   * @default String
   */
  passwordConfirmation: '',
  /**
   * @property error
   */
  error: null,

  /**
   * @property resetPasswordTask
   * @param password
   * @param passwordConfirmation
   */
  resetPasswordTask: task(function* (password, passwordConfirmation) {
    try {
      yield get(this, 'resetPassword')(password, passwordConfirmation);
    } catch(e) {
      set(this, 'error', e);
    }
  }),

  actions: {

  /**
   * @method resetPassword
   * @param password
   * @param passwordConfirmation
   */
    resetPassword(password, passwordConfirmation) {
      return get(this, 'resetPasswordTask').perform(password, passwordConfirmation);
    }

  }
});
