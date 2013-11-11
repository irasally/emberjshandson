Todos.TodoController = Ember.ObjectController.extend({
	actions: {
		editTodo: function(){
			this.set('isEditing', true);
		},
		acceptChanges: function(){
			// すでにtitleに値がbindされている
			this.set('isEditing', false);
			// Ember.isEmptyとは
			if(Ember.isEmpty(this.get('model.title'))) {
				this.send('removeTodo');
			} else {
			    this.get('model').save();	
			}
		}
	},
	// key:"isCompleted" value: propertyがgetの時はundefined, setの時は値が入ってくる
	isCompleted: function(key, value){
		// thisはtodo一つ(Item)
		var model = this.get('model');
		if(value === undefined){
		    // getの場合
			return model.get('isCompleted');
		} else {
			// setの場合はmodelにsaveする<- このために Computed Propertiesを使っている
			model.set('isCompleted', value);
			model.save();
			return value;
		}
	}.property('model.isCompleted'),
	isEditing: false,
});