Todos.EditListView = Ember.TextField.extend({
	// didInsertElement： このViewが挿入されたタイミングで発火するイベント
	didInsertElement: function(){
		// this.$() -> Viewに相当するJQueryのオブジェクトが取得できる
		this.$().focus();
	}
});
Ember.Handlebars.helper('edit-list', Todos.EditListView);
