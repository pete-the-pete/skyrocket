import { Worker } from 'skyrocket';
import api from './contract';

export default Worker.extend({
  'contract': api,
  fetch() {
    console.log('totally called fetch');
  }
});