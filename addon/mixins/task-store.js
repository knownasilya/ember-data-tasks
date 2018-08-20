import Mixin from '@ember/object/mixin';
import { task } from 'ember-concurrency';

export default Mixin.create({
  findAll() {
    let promise = this._super(...arguments);
    return this.get('wrap').perform(promise);
  },

  query() {
    let promise = this._super(...arguments);
    return this.get('wrap').perform(promise);
  },

  findRecord() {
    let promise = this._super(...arguments);
    return this.get('wrap').perform(promise);
  },

  queryRecord() {
    let promise = this._super(...arguments);
    return this.get('wrap').perform(promise);
  },

  wrap: task(function * (promise) {
    let result = yield promise;
    return result;
  })
});
