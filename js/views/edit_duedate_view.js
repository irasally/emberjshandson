Todos.EditDueDateView = Ember.TextField.extend({
	// didInsertElement： このViewが挿入されたタイミングで発火するイベント
	didInsertElement: function(){
		// this.$() -> Viewに相当するJQueryのオブジェクトが取得できる
		this.$().datepicker({
			dateFormat: "yy/mm/dd",
			onSelect: function(text, obj){
				console.log(obj);
				$(obj).focus();
			}
		});
		this.$().focus();
	}
});
Ember.Handlebars.helper('edit-due-date', Todos.EditDueDateView);