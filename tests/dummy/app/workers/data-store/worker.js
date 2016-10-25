import { Worker } from 'skyrocket';
import api from './contract';

export default Worker.extend({
  'contract': api,
  upload(data) {
    console.log('totally called upload: ', data);
  }
});