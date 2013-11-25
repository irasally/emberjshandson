Todos.ListController = Ember.ObjectController.extend({
	isEditing: false,
  actions : {
		editList: function(){
			this.set('isEditing', true);
		},
    saveList: function(){
			var model = this.get('model');
			if(!Ember.isEmpty(model.get('name'))) {
    	  this.set('isEditing', false);
        model.save();
      }
		},
		removeList: function(){
			var list = this.get('model');
			list.deleteRecord();
			list.save(); // saveしないとember的には消えているがdatastoreからは消えていない状態になる
		},
    addTodo: function(){
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
