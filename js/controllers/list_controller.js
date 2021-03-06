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
	    // text field clear
	    this.set('newTitle', '');
    },
		clearCompleted: function(){
			var completed = this.get('todos').filterBy('isCompleted', true);
			completed.invoke('deleteRecord');
			completed.invoke('save');
      this.get('todos').removeObjects(completed);
      this.get('model').save();
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

	remainingChanged: function() {
		var model = this.get('model');
    if(!model) return;
    var remaining = this.get('remaining');
		var title;
		if(remaining){
			title = "(%@) Ember.js • TodoMVC".fmt(remaining); 
		} else {
			title = "Ember.js • TodoMVC"; 
		}
     window.document.title = title;
  }.observes('remaining').on('init'),

	allAreDone: function(key, value){
		if(value === undefined){
      var todos = this.get('todos');
		  return !!todos.get('length') && todos.everyBy('isCompleted', true);
		} else {
			this.get('todos').setEach('isCompleted', value);
			this.get('todos').invoke('save');
			return value;
		}
	}.property('model.todos.@each.isCompleted')

});
