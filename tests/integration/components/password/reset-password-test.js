import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('password/reset-password', 'Integration | Component | password/reset password', {
  integration: true
});

test('it renders with two password inputs and correct label', function(assert) {
  assert.expect(8);
  this.resetPassword = function() {
    assert.ok(true);
  };
  this.render(hbs`{{password/reset-password resetPassword=resetPassword}}`);
  // inputs
  assert.equal(this.$('input[type=password]').length, 2);
  assert.equal(this.$('.input-group:eq(0)').text().trim(), 'Password');
  assert.equal(this.$('.input-group:eq(0) > input').attr('type'), 'password', 'first input is of type password');
  assert.equal(this.$('.input-group:eq(1)').text().trim(), 'Confirm Password');
  assert.equal(this.$('.input-group:eq(1) > input').attr('type'), 'password', 'second input is of type password');
  // btn
  assert.equal(this.$('input[type=submit]').val(), 'Change password');
  assert.equal(this.$('input[type=submit]').length, 1);
  this.$('input[type=submit]').click();
});

test('can fill out form and click enter', function(assert) {
  this.resetPassword = function(password, passwordConfirmation) {
    assert.equal(password, 'uuidPassword');
    assert.equal(passwordConfirmation, 'uuidPassword');
  };
  this.render(hbs`{{password/reset-password 
    resetPassword=resetPassword 
  }}`);
  // inputs
  this.$('.input-group:eq(0) > input').val('uuidPassword').trigger('change');
  assert.equal(this.$('.input-group:eq(0) > input').val(), 'uuidPassword');
  this.$('.input-group:eq(1) > input').val('uuidPassword').trigger('change');
  assert.equal(this.$('.input-group:eq(1) > input').val(), 'uuidPassword');
  this.$('input[type=submit]').click();
});
