Todos.TodoController = Ember.ObjectController.extend({
	isTitleEditing: false,
	isDueDateEditing: false,
	actions: {
		editTitle: function(){
			this.set('isTitleEditing', true);
		},
		editDueDate: function(){
			this.set('isDueDateEditing', true);
		},
		saveTitle: function(){
			// すでにtitleに値がbindされている
			this.set('isTitleEditing', false);
			// Ember.isEmptyとは - 便利メソッドの一つ
			//   空と判断できるものはすべてtrueとなる
			var model = this.get('model');
			// this.get('model.title');
			if(Ember.isEmpty(model.get('title'))) {
				// これうまく動いていないっぽい（そのあとの動きがうまくいかない） >> emberのbug?
				// chrome only? 
				// focus-out と insert-newline それぞれで発火している??
				this.send('removeTodo');
			} else {
			    model.save();	
			}
		},
		removeTodo: function(){
			var todo = this.get('model');
			todo.deleteRecord();
			todo.save(); // saveしないとember的には消えているがdatastoreからは消えていない状態になる
		}
	},
	format: "YYYY/MM/DD",
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

	formattedDueDate: function(){
		var dueDate = this.get('model').get('dueDate');
		if(dueDate) {
			return moment(dueDate).format(this.get('format'));
		}
	}.property('model.dueDate'),

	isEditing: function(){
		return !!this.get('isTitleEditing') || !!this.get('isDueDateEditing')
	}.property('isTitleEditing', 'isDueDateEditing'),
});