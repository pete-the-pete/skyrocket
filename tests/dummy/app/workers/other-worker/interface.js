import { Contract, Primitives } from 'skyrocket';

const {
  method,
  event
  } = Primitives;

export default Contract.extend({
  myFunction: method(),
  myEvent: event({ outbound: false }),
  mySendEvent: event({ inbound: false })
});
