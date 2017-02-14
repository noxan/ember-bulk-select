import Ember from 'ember';
import computed from 'ember-computed';

/**
 * A mixin that adds bulk selection support for a list of objects to a component. The class this mixin is composed into
 * must provide a property named 'selectableObjects' which is the list that needs bulk selection support.
 */
export default Ember.Mixin.create({
  /** The currently selected objects. This is only used internally. */
  selections: Ember.A(),

  /**
   * Maps the given objects to a list of data objects that contain the original object and its selection status which
   * can be accessed with the keys 'object' and 'selected'.
   */
  objectsWithSelection: computed('selectableObjects.[]', 'selections.[]', function () {
    const selections = this.get('selections');
    return this.get('selectableObjects').map(object => ({
      object,
      selected: selections.includes(object),
    }));
  }),

  /** The list of currently selected objects. */
  selectedObjects: computed('objectsWithSelection.[]', function () {
    return this.get('objectsWithSelection').reduce((previous, { object, selected }) => {
      if (selected) {
        previous.push(object);
      }
      return previous;
    }, []);
  }),

  /** True if at least one object is selected, otherwise false. */
  hasSelection: computed.notEmpty('selectedObjects.[]'),

  /** True if all objects are selected, otherwise false. */
  hasAllSelected: computed('selectedObjects.length', 'selectableObjects.length', function () {
    const selectedObjects = this.get('selectedObjects.length');
    const selectableObjects = this.get('selectableObjects.length');
    return selectedObjects === selectableObjects;
  }),

  /** Resets the selection if the component is left. */
  willDestroyElement() {
    this._super(...arguments);
    this.get('selections').clear();
  },

  /**
   * Changes the selection status of the given object to the given value.
   *
   * @param object the object which is to be (de-)selected
   * @param selected true if the object is to be selected, otherwise false
   */
  changeSelection(object, selected) {
    const selections = this.get('selections');
    if (selected) {
      selections.pushObject(object);
    } else {
      selections.removeObject(object);
    }
  },

  actions: {
    /**
     * An action that toggles the selection of all objects to the given value.
     *
     * @param selected true if all objects are to be selected, otherwise false
     */
    toggleSelection(selected) {
      this.get('selectableObjects').map(object => this.changeSelection(object, selected));
    },

    /**
     * An action that (de-)selects the given object depending on the given click event of a checkbox.
     *
     * @param object the object which should be (de-)selected
     * @param event the click event of the checkbox
     */
    selectObject(object, event) {
      this.changeSelection(object, event.target.checked);
    },
  },
});
