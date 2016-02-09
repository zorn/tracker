import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: 'https://bnr-tracker-api.herokuapp.com',
  // namespace is added to the end of the host when making
  // ajax requests for model data
  namespace: 'api'
});
