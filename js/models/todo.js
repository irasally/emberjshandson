Todos.Todo = DS.Model.extend({
	title: DS.attr('string'),
	isCompleted: DS.attr('boolean'),
	dueDate: DS.attr()
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
		dueDate: new Date(2013, 11, 01)
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
		dueDate: new Date(2013, 12, 31)
	}
];