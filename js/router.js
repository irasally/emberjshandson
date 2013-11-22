// Router:
//   どのテンプレートを使うかを決める
//   このテンプレートで何のmodelを使うかを決める
Todos.Router.map(function(){
	this.resource('todos', {path: '/todos'}, function(){
		// 第3引数を追加したタイミングで（中身が空でも）Routerの動きが変わる
		//   Routes todos → todos.index ... dafault
		//                → todos.active
		//                → todos.completed
		//   Template todos(common) -> todos/index
		//            {{outlet}} <---------|
		//
		// http://emberjs.com/guides/concepts/naming-conventions/
		// 第3引数を追加することでネストしたURLを表現することができる
		// resourceとroute: routeの下には何かをぶら下げることはできない
		this.route('active');
		this.route('completed');
	});
	this.resource('lists', {path: '/'});
	this.resource('list', {path: '/:list_id'}, function(){
  });
});

Todos.ListsRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('list'); // listモデルの全レコードを返す:小文字にするのが命名規則?
	}
});

Todos.ListRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('list', params.list_id); // listモデルの全レコードを返す:小文字にするのが命名規則?
	}
});

Todos.ListIndexRoute = Ember.Route.extend({
	model: function(){
		return this.modelFor(('list'));
	},
	renderTemplate: function(){
		this.render('list/todos');
	}
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
	model: function(){
		return this.modelFor(('todos'));
	}
});
Todos.TodosActiveRoute = Ember.Route.extend({
	// ソートキーが定義されたtodosIndexコントローラを使う
	controllerName: 'todosIndex',
	model: function(){
		return this.store.filter('todo', function(todo) {
			return !todo.get('isCompleted');			
		});
	},
	renderTemplate: function(){
		// [template名, 使用するController(TodosActiveController)=>存在しないのでDefaultController]
		// 第二引数は省略してもよい
		this.render('todos/index');
	}
});
Todos.TodosCompletedRoute = Ember.Route.extend({
	// ソートキーが定義されたtodosIndexコントローラを使う
	controllerName: 'todosIndex',
	model: function(){
		return this.store.filter('todo', function(todo) {
			return todo.get('isCompleted');			
		});
	},
	renderTemplate: function(){
		this.render('todos/index');
	}
});
