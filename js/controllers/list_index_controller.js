Todos.ListIndexController = Ember.ObjectController.extend({
	sortedTodos: function(){
    var todos = this.get('model').get('todos'); 
    return todos.sortBy('isCompleted', 'hasDueDate', 'dueDate');
	}.property('model.todos.@each.isCompleted','model.todos.@each.hasDueDate','model.todos.@each.dueDate')
});
