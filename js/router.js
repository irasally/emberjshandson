// Router:
//   どのテンプレートを使うかを決める
//   このテンプレートで何のmodelを使うかを決める
Todos.Router.map(function(){
	this.resource('todos', {path: '/'}, function(){
		// child routes
	});
});

// 'todos'というrouteを踏んだ時にTodosRouteが参照される
// 個々のふるまいを定義する
Todos.TodosRoute = Ember.Route.extend({
	// modelメソッド: modelメソッドの戻り値がtodos templeteに返る(thisで返る<-なぜ??そういうもの?)
	model: function() {
		return this.store.find('todo'); // todoモデルの全レコードを返す:小文字にするのが命名規則?
	}
});
// Child routes
Todos.TodosIndexRoute = Ember.Route.extend({
	model:function(){
		return this.modelFor(('todos'));
	}
});
