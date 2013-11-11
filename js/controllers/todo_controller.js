Todos.TodoController = Ember.ObjectController.extend({
	actions: {
		editTodo: function(){
			this.set('isEditing', true);
		},
		acceptChanges: function(){
			// すでにtitleに値がbindされている
			this.set('isEditing', false);
			// Ember.isEmptyとは - 便利メソッドの一つ
			//   空と判断できるものはすべてtrueとなる
			var model = this.get('model');
			// this.get('model.title');
			if(Ember.isEmpty(model.get('title'))) {
				this.send('removeTodo');
			} else {
			    model.save();	
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