Todos.Todo = DS.Model.extend({
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
		isCompleted: true,
		dueDate: new Date(2013, 11, 13)
	},
	{
		id: 2,
		title: '...',
		isCompleted: false,
		dueDate: new Date(2012, 11, 01)
	},
	{
		id: 3,
		title: 'Profit!',
		isCompleted: false,
		dueDate: new Date(2014, 01, 10)
	},
	{
		id: 4,
		title: 'にほんご',
		isCompleted: false,
	}
];