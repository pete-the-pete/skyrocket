import Ember from 'ember';

export default Ember.Controller.extend({
  dataStore: Ember.inject.worker('data-store:one'),

  actions: {

    startUpload() {
      this.get('dataStore').upload({
        img: 'file://example.png'
      }).then((x) => {
        console.log('x');
      });
    },

    goOnline() {
      this.get('dataStore').trigger('online', { status: true });
    },

    goOffline() {
      this.get('dataStore').trigger('online', { status: false });
    }

  }

});
