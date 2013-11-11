Todos.Router.map(function(){
	this.resource('todos', {path: '/'});
});
Todos.TodosRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('todo'); // これも命名規則??Todos.Todoを探してくれる?
	}
});