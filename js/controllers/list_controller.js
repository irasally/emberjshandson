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
		}
	}
});
