// controllerの名前はrouterで定義したtemplate名から来てる
//   対応するControllerがない場合無名のコントローラーを作ってくれる(actionとかはない、普段意識することはない)
// Ember.jsのController: なじみがない、難解
//   Templateからみるとあたかもmodelの配列のようにふるまっているように見える
//   ユーザーからの操作を受け取って何かをするという働きもある
Todos.TodosController = Ember.ArrayController.extend({
	remaining: function(){
		// 件数はlengthプロパティの値になる
		return this.filterBy('isCompleted', false).get('length');
	}.property('@each.isCompleted'),  // todosコントローラーの各要素に対してisCompletedが変わった時に発火する
	// それぞれはオブジェクト - カンマ区切りで並べている ... それぞれを何と捉えておけばよいのだろう
	inflection: function(){
		var remaining = this.get('remaining');
		return remaining === 1 ? 'item' : 'items';
	}.property('remaining'),
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