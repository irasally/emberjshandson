Todos.List = DS.Model.extend({
  todos: DS.hasMany('todo', {async: true}),
  name: DS.attr('string')
});

Todos.List.FIXTURES = [
	{
		id: 1,
		name: 'Studies',
    todos: [1,4,6,7]
	},
	{
		id: 2,
		name: 'Shopping',
    todos: [2,3,5]
	}
];
