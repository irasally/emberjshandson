Todos.List = DS.Model.extend({
  todos: DS.hasMany('todo'),
  name: DS.attr('string')
});

Todos.List.FIXTURES = [
	{
		id: 1,
		name: 'Studies'
	},
	{
		id: 2,
		name: 'Shopping'
	}
];
