import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var newSighting = this.store.createRecord('sighting');
    var cryptids = this.store.findAll('cryptid');
    var witnesses = this.store.findAll('witness');
    return Ember.RSVP.hash({
      sighting: newSighting,
      cryptids: cryptids,
      witnesses: witnesses
      }
    );
  },
  sighting: Ember.computed.alias('controller.model.sighting'),
  actions: {
      willTransition() {
        var sighting = this.get('controller.model.sighting');
        if(sighting.get('hasDirtyAttributes')){
          // destory the record
          sighting.deleteRecord();
        }
      },
      create() {
             var self = this;
             this.get('sighting').save().then(function(data){
                 self.send('flash', {alertType: "success", message: "New sighting."});
                 self.transitionTo('sightings');
             });
       },
       cancel() {
             this.get('sighting').deleteRecord();
             this.transitionToRoute('sightings');
       }
   }
});
