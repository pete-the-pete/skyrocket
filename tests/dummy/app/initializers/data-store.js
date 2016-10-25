/****************************************************************************
                                 This is temporary!
This should/will be generated from the contract for a given worker, this is
just to get a POC figured out.
@public
*****************************************************************************/

import { Contract, Primitives } from 'skyrocket';

export function initialize(application) {
  const DW = Contract.extend({
    interfaceName: 'data-store',

    upload: function() {
      return Primitives.method.call(this, 'upload', true, ...arguments);
    }
  });

  application.register('worker:data-store', DW);
}

export default {
  name: 'worker',
  initialize
};