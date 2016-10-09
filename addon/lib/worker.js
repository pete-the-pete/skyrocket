import Ember from 'ember';
import SkyrocketObject from '../-private/object/index';

export default SkyrocketObject.extend({
  contract: null,
  _isWorkerFactory: true,

  _features: Ember.inject.service('worker-features'),

  _connect() {},

  init() {
    this._super();
    if (this.initialize && typeof this.initialize === 'function') {
      this.initialize();
    }
  }
});
