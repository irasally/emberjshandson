// Router:
//   どのテンプレートを使うかを決める
//   このテンプレートで何のmodelを使うかを決める
Todos.Router.map(function(){
	this.resource('lists', {path: '/'});
	this.resource('list', {path: '/:list_id'}, function(){
		// 第3引数を追加したタイミングで（中身が空でも）Routerの動きが変わる
		//   Routes list → list.index ... dafault
		//                → list.active
		//                → list.completed
		//   Template list(common) -> list/index
		//            {{outlet}} <---------|(list/todos)
		//
		// http://emberjs.com/guides/concepts/naming-conventions/
		// 第3引数を追加することでネストしたURLを表現することができる
		// resourceとroute: routeの下には何かをぶら下げることはできない
		this.route('active');
		this.route('completed');
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

// Child routes
Todos.ListIndexRoute = Ember.Route.extend({
	model: function(){
		return this.modelFor('list');
	},
	renderTemplate: function(){
		this.render('list/todos');
	}
});

Todos.ListActiveRoute = Ember.Route.extend({
	model: function(){
		return this.modelFor('list');
	},
	renderTemplate: function(){
		this.render('list/todos');
	}
});

Todos.ListCompletedRoute = Ember.Route.extend({
	model: function(){
		return this.modelFor('list');
	},
	renderTemplate: function(){
		this.render('list/todos');
	}
});
