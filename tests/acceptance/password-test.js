import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import passwordPage from '../pages/password';
import { getFlashMessageCount } from 'code-corps-ember/tests/helpers/flash-message';

moduleForAcceptance('Acceptance | password test');

test('visiting /password/reset', function(assert) {
  passwordPage.visitReset();

  andThen(() => {
    assert.equal(currentURL(), '/password/reset');
  });
  passwordPage.resetPasswordForm.sendResetPasswordSuccessfully('uuidPassword');
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
