Todos.Todo = DS.Model.extend({
  list: DS.belongsTo('list'), // List has many todos
	title: DS.attr('string'),
	isCompleted: DS.attr('boolean'),
	dueDate: DS.attr(),
	hasDueDate: function(){
		// 日付未設定のものが後ろに来るようにする
		if(!!this.get('dueDate')){
			return -1;
		} else {
			return 99999999;
		}
	}.property('model.dueDate')
});
Todos.Todo.FIXTURES = [
	{
		id: 1,
		title: 'Learn Ember.js',
		isCompleted: false,
		dueDate: new Date(2013, 10, 13)
	},
	{
		id: 2,
		title: 'しょうゆ',
		isCompleted: true,
		dueDate: new Date(2012, 10, 01),
    list: 2
	},
	{
		id: 3,
		title: 'ブーツ',
		isCompleted: false,
		dueDate: new Date(2014, 12, 10),
    list: 2
	},
	{
		id: 4,
		title: 'Ruby on rails',
		isCompleted: false
	},
	{
		id: 5,
		title: 'かぼちゃ',
		isCompleted: true,
		dueDate: new Date(2012, 11, 01),
    list: 2
	},
	{
		id: 6,
		title: 'Learn Angular.js',
		isCompleted: false,
		dueDate: new Date(2014, 01, 10)
	},
	{
		id: 7,
		title: 'Search Java8',
		isCompleted: false,
		dueDate: new Date(2014, 03, 05)
	}
];
