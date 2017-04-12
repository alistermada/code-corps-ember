import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import passwordPage from '../pages/password';
import { getFlashMessageCount } from 'code-corps-ember/tests/helpers/flash-message';
import errorFormatterComponent from '../pages/components/error-formatter';

moduleForAcceptance('Acceptance | password test');

test('visiting /password/reset and logging in successfully', function(assert) {
  let email = 'test@test.com';
  let password = 'password';

  server.create('user', { email, password });

  passwordPage.visitReset();

  andThen(() => {
    assert.equal(currentURL(), '/password/reset');
  });

  passwordPage.resetPasswordForm.sendResetPasswordSuccessfully('password', 'password');

  andThen(() => {
    assert.equal(currentURL(), '/projects');
    assert.equal(getFlashMessageCount(this), 1, 'A flash message was shown.');
  });
});

test('visiting /password/reset and entering diff passwords returns 422', function(assert) {
  let email = 'test@test.com';
  let password = 'password';

  server.create('user', { email, password });

  passwordPage.visitReset();

  andThen(() => {
    assert.equal(currentURL(), '/password/reset');
  });

  passwordPage.resetPasswordForm.sendResetPasswordSuccessfully('password', 'chuckNorris');

  andThen(() => {
    assert.equal(currentURL(), '/password/reset');
    assert.equal(getFlashMessageCount(this), 0, 'No flash message was shown.');
    assert.equal(passwordPage.errorFormatter.errors().count, 1, 'Each error message is rendered');
  });
});

test('visiting /password/forgot', function(assert) {
  passwordPage.visitForgot();

  andThen(() => {
    assert.equal(currentURL(), '/password/forgot');
  });

  passwordPage.form.sendForgotPasswordSuccessfully('admin@gmail.com');

  andThen(() => {
    assert.equal(currentURL(), '/');
    assert.equal(getFlashMessageCount(this), 1, 'A flash message was shown.');
  });
});
