import EmberObject from '@ember/object';
import TaskModelMixin from 'ember-data-tasks/mixins/task-model';
import { module, test } from 'qunit';

module('Unit | Mixin | task model', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    let TaskModelObject = EmberObject.extend(TaskModelMixin);
    let subject = TaskModelObject.create();
    assert.ok(subject);
  });
});
