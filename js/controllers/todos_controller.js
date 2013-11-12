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
		},
		clearCompleted: function(){
			var completed = this.filterBy('isCompleted', true);
			// invoke: Eachしてそれぞれに対して処理するのと同じことができる
			completed.invoke('deleteRecord');
			completed.invoke('save');
		}
	},

	remainingChanged: function() {
		var title = "Ember.js • TodoMVC";
		if(this.get('remaining') > 0){
			title = "(" + this.get('remaining') + ") " + title; 
		}
		// タイトルを変える
        document.title = title;
    }.observes('remaining').on('init'),

	remaining: function(){
		// 件数はlengthプロパティの値になる
		return this.filterBy('isCompleted', false).get('length');
	}.property('@each.isCompleted'),  // todosコントローラーの各要素に対してisCompletedが変わった時に発火する
	
	// それぞれはオブジェクト - カンマ区切りで並べている ... それぞれを何と捉えておけばよいのだろう
	inflection: function(){
		var remaining = this.get('remaining');
		return remaining === 1 ? 'item' : 'items';
	}.property('remaining'),
	
	hasCompleted: function(){
		return this.get('completed') > 0;
	}.property('completed'),

	completed: function(){
		return this.filterBy('isCompleted', true).get('length');
	}.property('@each.isCompleted'), // @eachはスペシャルなもの

	allAreDone: function(key, value){
		if(value === undefined){
		    // なぜ二重否定?
		    // everyBy:それぞれのプロパティの値が条件を満たすかをチェックする cf: evevryProperty
		    return !!this.get('length') && this.everyBy('isCompleted', true);
		} else {
			this.setEach('isCompleted', value);
			this.invoke('save')
			return value;
		}
	}.property('@each.isCompleted')
});