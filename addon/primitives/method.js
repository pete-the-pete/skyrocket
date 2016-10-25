import Ember from 'ember';

export default function method(name, sending, ...args) {
  const transport = this.transport;
  const _primitive = {
    name,
    type: 'method'
  };
  if (!transport.isWorker) {
    // ContractService
    if (sending) {
      // use the transport layer to post the message to the worker
      const p = new Ember.RSVP.defer(`method:${name}`);
      // this might need to be passed in
      transport.send(_primitive, ...args);
      transport.callbacks.set(name, p);
      return p.promise;
    } else {
      // the method was called on the response, the original promise should
      // be resolved with the data passed back from the worker
      // this should clean up after itself and/or handle resuse
      transport.callbacks.get(name).resolve(args);
      transport.callbacks.delete(name);
    }
  } else {
    // Worker App
    // the actual method should be implemented by the user, which needs to be
    // called, but should be wrapped in a promise to adhere to the primitive
    // Methods are one-way (App -> Worker)
    const x = transport.options.impl.get(name)(args);
    if (x && x.then) {
      x.then((res) => {
        transport.send(_primitive, res);
      });
    } else {
      transport.send(_primitive, x);
    }
  }
}
