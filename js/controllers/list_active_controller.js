Todos.ListActiveController = Ember.ObjectController.extend({
	sortedTodos: function(){
    var todos = this.get('model').get('todos').filter(function(todo){
			return !todo.get('isCompleted');			
    }); 
    return todos.sortBy('isCompleted', 'hasDueDate', 'dueDate');
	}.property('model.todos.@each.isCompleted','model.todos.@each.hasDueDate','model.todos.@each.dueDate')
});
