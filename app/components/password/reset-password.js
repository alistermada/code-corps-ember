import Ember from 'ember';
const { Component } = Ember;

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
  passwordConfirmation: ''
});
