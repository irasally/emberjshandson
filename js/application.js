window.Todos = Ember.Application.create();
// LocalStrage：ブラウザに保存される（大きなcookieみたいなもの）
// chromeのresourcesから中身を見れる
//Todos.ApplicationAdapter = DS.FixtureAdapter.extend();
Todos.ApplicationAdapter = DS.LSAdapter.extend({
  // 保存に使うLocalStrageのkey
	namespace: 'todos-emberjs'
});
