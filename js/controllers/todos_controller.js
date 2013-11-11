// controllerの名前はrouterで定義したtemplate名から来てる
Todos.TodosController = Ember.ArrayController.extend({
	actions: {
		createTodo: function(){
			var title = this.get('newTitle');
			if(!title.trim()){return;}
	        // create the new Todo model
	        var todo = this.store.createRecord('todo', {
	        	title: title,
	        	isCompleted: false
	        });
	        // text field clear
	        this.set('newTitle', '');
	        // save the new Model
	        todo.save();
		}
	}


});