
const Index = resolve => require(['../view/Index.vue'], resolve)

const routers = [
	{
		path: '/',
		component: Index
	}
]

export default routers
