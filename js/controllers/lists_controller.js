Todos.ListsController = Ember.ArrayController.extend({
	actions: {
		createList: function(){
			var name = this.get('newListName');
			if(!name.trim()){return;}

      var list = this.store.createRecord('list', {
      	name: name
      });
      this.set('newListName', '');
      // save the new Model
      // FIXTURESアダプターがidを決めている/ デフォルトだとidはprimary keyとして扱われる
      // saveしたタイミングで(controllerの値が変わるから?）eachが拾って画面に反映される
      list.save();
		}
  }
});
