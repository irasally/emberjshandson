Todos.Todo = DS.Model.extend({
	title: DS.attr('string'),
	isCompleted: DS.attr('boolean'),
	dueDate: DS.attr('date')
});
Todos.Todo.FIXTURES = [
	{
		id: 1,
		title: 'Learn Ember.js',
		isCompleted: true,
		dueDate: '2013-11-13'
	},
	{
		id: 2,
		title: '...',
		isCompleted: false,
		dueDate: '2014-01-31'
	},
	{
		id: 3,
		title: 'Profit!',
		isCompleted: false,
		dueDate: '2013-10-10'
	},
	{
		id: 4,
		title: 'にほんご',
		isCompleted: true,
		dueDate: '2013-12-31'
	}
];