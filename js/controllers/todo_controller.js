Todos.TodoController = Ember.ObjectController.extend({
	// key valueはどこからくる？
	isCompleted: function(key, value){
		// thisはだれ？
		var model = this.get('model');
		if(value === undefined){
			return model.get('isCompleted');
		} else {
			model.set('isCompleted', value);
			model.save();
			return value;
		}
	}.property('model.isCompleted') // Computed Properties?
});