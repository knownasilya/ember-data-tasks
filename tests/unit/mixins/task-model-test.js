import Ember from 'ember';
import TaskModelMixin from 'ember-data-tasks/mixins/task-model';
import { module, test } from 'qunit';

module('Unit | Mixin | task model');

// Replace this with your real tests.
test('it works', function(assert) {
  let TaskModelObject = Ember.Object.extend(TaskModelMixin);
  let subject = TaskModelObject.create();
  assert.ok(subject);
});
