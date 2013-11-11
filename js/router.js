// Router:
//   どのテンプレートを使うかを決める
//   このテンプレートで何のmodelを使うかを決める
Todos.Router.map(function(){
	this.resource('todos', {path: '/'}, function(){
		// 第3引数を追加したタイミングで（中身が空でも）Routerの動きが変わる
		//   Routes todos → todos.index
		//                → todos.active
		//                → todos.completed
		//   Template todos(common) -> todos/index
		//            {{outlet}} <---------|
		//
		// http://emberjs.com/guides/concepts/naming-conventions/
		// 第3引数を追加することでネストしたURLを表現することができる		
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
