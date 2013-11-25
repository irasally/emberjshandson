Todos.ListController = Ember.ObjectController.extend({
	isEditing: false,
  actions : {
		editList: function(){
			this.set('isEditing', true);
		},
    saveList: function(){
			var list = this.get('model');
			if(!Ember.isEmpty(list.get('name'))) {
    	  this.set('isEditing', false);
        list.save();
      }
		},
		removeList: function(){
			var list = this.get('model');
			list.deleteRecord();
			list.save(); // saveしないとember的には消えているがdatastoreからは消えていない状態になる
		},
    addTodo: function(){
			var title = this.get('newTitle');
			if(!title.trim()){return;}
	    // create the new Todo model
	    var todo = this.store.createRecord('todo', {
	    	title: title,
	     	isCompleted: false,
	    });
	    todo.save();
      // list add new todo
			var list = this.get('model');
      list.get('todos').pushObject(todo);
      list.save();
      console.log('List Save');
      console.log(this.get('model').get('todos').get('length'));
	    // text field clear
	    this.set('newTitle', '');
    }
	},

	completed: function(){
    var todos = this.get('model').get('todos'); 
		return todos.filterBy('isCompleted', true).get('length');
	}.property('model.todos.@each.isCompleted'),

	hasCompleted: function(){
		return this.get('completed') > 0;
	}.property('completed'),

	remaining: function(){
    var todos = this.get('model').get('todos'); 
		return todos.filterBy('isCompleted', false).get('length');
	}.property('model.todos.@each.isCompleted'),
	
	inflection: function(){
		var remaining = this.get('remaining');
		return remaining === 1 ? 'item' : 'items';
	}.property('remaining'),


});
