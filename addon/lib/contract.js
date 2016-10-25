import Ember from 'ember';
import Transport from '../-private/-worker-transport';
import SkyrocketObject from '../-private/object/index';

export default SkyrocketObject.extend({
  _isContractFactory: true,
  _features: Ember.inject.service('worker-features'),

  init() {
    if (!this.interfaceName) {
      throw new Error('You must specify an interfaceName to load the matching worker.');
    }

    try {
      this.worker = new Worker(`assets/workers/${this.interfaceName}.js`);
      this.transport = new Transport(this.worker, { impl: this });
    } catch (e) {
      throw new Error(`Unable to load worker ${this.interfaceName}: ${e}`);
    }
  }
});
