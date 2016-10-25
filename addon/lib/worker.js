import Ember from 'ember';
import Transport from '../-private/-worker-transport';
import SkyrocketObject from '../-private/object/index';

export default SkyrocketObject.extend({
  contract: null,
  _isWorkerFactory: true,

  _features: Ember.inject.service('worker-features'),

  init() {
    this._super();

    this.transport = new Transport(null, { impl: this });

    if (this.initialize && typeof this.initialize === 'function') {
      this.initialize();
    }
  }
});
