import Ember from 'ember';
import layout from '../templates/components/bulk-toggle-button';

export default Ember.Component.extend({
  layout,

  tagName: '',

  selected: null,
  toggle: null,

  actions: {
    toggleSelection(selected) {
      this.get('toggle')(selected);
    },
  },
});
