Todos.EditTodoView = Ember.TextField.extend({
	// didInsertElement： このViewが挿入されたタイミングで発火するイベント
	didInsertElement: function(){
		// this.$() -> Viewに相当するJQueryのオブジェクトが取得できる
		this.$().focus();
	}
});
// 作成したViewをテンプレートで使うために 独自のHelperを定義している
// 今回基本的にTextFieldと同じ使い方ができる
Ember.Handlebars.helper('edit-todo', Todos.EditTodoView);