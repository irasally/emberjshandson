// controllerの名前はrouterで定義したtemplate名から来てる
//   対応するControllerがない場合無名のコントローラーを作ってくれる(actionとかはない、普段意識することはない)
// Ember.jsのController: なじみがない、難解
//   Templateからみるとあたかもmodelの配列のようにふるまっているように見える
//   ユーザーからの操作を受け取って何かをするという働きもある
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
	        // FIXTURESアダプターがidを決めている/ デフォルトだとidはprimary keyとして扱われる
	        // saveしたタイミングで(controllerの値が変わるから?）eachが拾って画面に反映される
	        todo.save();
		}
	}
});