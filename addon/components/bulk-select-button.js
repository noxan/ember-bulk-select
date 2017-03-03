import Ember from 'ember';
import layout from '../templates/components/bulk-select-button';

export default Ember.Component.extend({
  layout,

  tagName: '',

  data: null,
  select: null,

  actions: {
    selectObject(object, event) {
      event.stopPropagation();
      this.get('select')(object, event);
      return false;
    },
  },
});
