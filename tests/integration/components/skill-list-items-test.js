import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import stubService from 'code-corps-ember/tests/helpers/stub-service';

const { Object } = Ember;

let skills = [
  Object.create({
    title: 'Rails'
  }),
  Object.create({
    title: 'HTML'
  }),
  Object.create({
    title: 'Ruby'
  }),
  Object.create({
    title: 'Ember.js'
  })
];

moduleForComponent('skill-list-items', 'Integration | Component | skill list items', {
  integration: true,
  beforeEach() {
    stubService(this, 'user-skills-list', {
      contains(queriedSkill) {
        return queriedSkill === skills[1];
      },
      find(queriedSkill) {
        if (queriedSkill === skills[1]) {
          return queriedSkill;
        }
      }
    });
  }
});

test('it renders the skills sorted by match and then alphabetically', function(assert) {
  this.set('skills', skills);
  this.render(hbs`{{skill-list-items skills=skills}}`);

  assert.equal(this.$('li:eq(0)').text().trim(), 'HTML');
  assert.equal(this.$('li:eq(0)').hasClass('matched'), true);

  assert.equal(this.$('li:eq(1)').text().trim(), 'Ember.js');
  assert.equal(this.$('li:eq(1)').hasClass('matched'), false);

  assert.equal(this.$('li:eq(2)').text().trim(), 'Rails');
  assert.equal(this.$('li:eq(2)').hasClass('matched'), false);

  assert.equal(this.$('li:eq(3)').text().trim(), 'Ruby');
  assert.equal(this.$('li:eq(3)').hasClass('matched'), false);
});
