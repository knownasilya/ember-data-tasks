import EmberObject from '@ember/object';
import TaskStoreMixin from 'ember-data-tasks/mixins/task-store';
import { module, test } from 'qunit';

module('Unit | Mixin | task store', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    let TaskStoreObject = EmberObject.extend(TaskStoreMixin);
    let subject = TaskStoreObject.create();
    assert.ok(subject);
  });
});
