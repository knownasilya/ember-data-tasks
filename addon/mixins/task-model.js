import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Mixin.create({
  save() {
    let promise = this._super(...arguments);
    return this.get('wrap').perform(promise);
  },

  reload() {
    let promise = this._super(...arguments);
    return this.get('wrap').perform(promise);
  },

  destroyRecord() {
    let promise = this._super(...arguments);
    return this.get('wrap').perform(promise);
  },

  wrap: task(function * (promise) {
    let result = yield promise;
    return result;
  })
});
