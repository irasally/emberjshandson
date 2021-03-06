Todos.TodoController = Ember.ObjectController.extend({
	isTitleEditing: false,
	isDueDateEditing: false,
	format: "YYYY/MM/DD",
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
		saveDueDate: function(){
			this.set('isDueDateEditing', false);
			var inputDate = this.get('formattedDueDate');
			var dueDate = moment(inputDate, this.get('format'));
			var model = this.get('model');
			if(dueDate.isValid()){
        model.set('dueDate', moment(inputDate)._d);
			} else {
				model.set('dueDate', null);
			}
			model.save();
		},
		removeTodo: function(){
			var todo = this.get('model');
			todo.deleteRecord();
			todo.save(); // saveしないとember的には消えているがdatastoreからは消えていない状態になる
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

	formattedDueDate: function(key, value){
		if(value === undefined){
			var dueDate = this.get('model').get('dueDate');
			if(dueDate) {
				return moment(dueDate).format(this.get('format'));
			} else {
				return '----/--/--';
			}
		} else {
			return value;
		}
	}.property('model.dueDate'),

	isEditing: function(){
		return !!this.get('isTitleEditing') || !!this.get('isDueDateEditing')
	}.property('isTitleEditing', 'isDueDateEditing'),

	isExpired: function(){
		var model = this.get('model');
		return !model.get('isCompleted') && moment().isAfter(model.get('dueDate'));
	}.property('model.dueDate', 'model.isCompleted'),
});
