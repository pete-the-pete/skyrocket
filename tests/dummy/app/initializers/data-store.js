/****************************************************************************
                                 This is temporary!
This should/will be generated from the contract for a given worker, this is
just to get a POC figured out.
@public
*****************************************************************************/

import { Contract } from 'skyrocket';

export function initialize(application) {
  const DW = Contract.extend({
    interfaceName: 'data-store',
    burritos() {
    },

    fetch() {
      console.log('here');
    }
  });

  application.register('worker:data-store', DW);
}

export default {
  name: 'worker',
  initialize
};