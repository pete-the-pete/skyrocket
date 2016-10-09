import Ember from 'ember';
import SkyrocketObject from '../-private/object/index';

export default SkyrocketObject.extend({
  _isContractFactory: true,
  _features: Ember.inject.service('worker-features'),

  _connect() {
    debugger;
  },

  init() {
    if (!this.interfaceName) {
      throw new Error('You must specify an interfaceName to load the matching worker.');
    }

    try {
      this.worker = new Worker(`assets/workers/${this.interfaceName}.js`);
    } catch (e) {
      throw new Error(`Unable to load worker ${this.interfaceName}: ${e}`);
    }
  }
});
