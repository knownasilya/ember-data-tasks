import Ember from 'ember';
import TaskStoreMixin from 'ember-data-tasks/mixins/task-store';
import { module, test } from 'qunit';

module('Unit | Mixin | task store');

// Replace this with your real tests.
test('it works', function(assert) {
  let TaskStoreObject = Ember.Object.extend(TaskStoreMixin);
  let subject = TaskStoreObject.create();
  assert.ok(subject);
});
