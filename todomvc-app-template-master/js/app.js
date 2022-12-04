(function (window) {
	'use strict';
	
	// Your starting point. Enjoy the ride!

})(window);

(function (Vue) { //表示依赖了全局的 Vue
	var STORAGE_KEY = 'items-vuejs';
	// 本地存储数据对象
	const itemStorage = {
		fetch: function () { // 获取本地数据
		return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
		},
		save: function (items) { // 保存数据到本地
		localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
		}
	}

	const items=[]

	Vue.directive('app-focus',{
		//聚集元素
		inserted (el, binding) {
			el.focus()
		}
	})
	var app = new Vue({
		el: '#todoapp',
		data:{
			items:itemStorage.fetch(), //获取本地数据进行初始化
			currentItem:null,
			filterStatus:'all'
		},
		// 监听器
		watch: {
			// 如果 items 发生改变，这个函数就会运行
			items: {
			deep: true, // 发现对象内部值的变化, 要在选项参数中指定 deep: true。
			handler: function(newItems, oldItems) {
				//本地进行存储
					itemStorage.save(newItems)
				}
			}
		},
		// 过滤出未完成的任务项
		computed:{
			toggleAll:{
				get:function(){
					// console.log(this.remaining)
					//2. 当 this.remaining 发生变化后，会触发该方法运行
					// 当所有未完成任务数为 0 , 表示全部完成, 则返回 true 让复选框选中
					//反之就 false 不选中
					return this.remaining === 0
				},
				set:function(newStatus){
					// 当点击 checkbox 复选框后状态变化后，就会触发该方法运行
					// 通过迭代每一个元素 将其complete设置为newStatus
					items.forEach(element => {
						element.completed = newStatus
					});
				}
			},
			remaining(){
				return this.items.filter(item =>!item.completed).length
			},
			filterItems(){
				switch(this.filterStatus){
					case "active":
						return this.items.filter(item => !item.completed)
						break
					case "completed":
						return this.items.filter(item => item.completed)
						break
					default:
						return this.items
				}
			}
		},
		methods:{
			toEdit(item){
				this.currentItem = item
			},
			cancelEdit(){
				this.currentItem = null
			},
			finishEdit(item,index,event){
				const content = event.target.value.trim()
				if(!content){
					this.removeItem(index)
					return
				}
				item.content = content
				this.currentItem = null
			},
			addItem:function(event){
				console.log("addItem",event.target.value);
				// 去除字符串两边空格
				const content = event.target.value.trim();
				// 如果字符串为空 就不添加
				if(!content.length){
					return
				}
				// 如果不为空 为其生成id
				const id = this.items.length+1;
				this.items.push({
					id:id,
					content:content,
					completed:false
				})
				event.target.value='';
			},
			removeItem(index){
				// 移除索引为index的一条记录
				this.items.splice(index,1);
				// ajax后端操作删除数据库内容...等

			},
			removeCompleted(){
				this.items = this.items.filter(item =>!item.completed)
			}
		},
		directives:{
			//定义时不要在前面加v-, 引用指令时要加上v-
			'todo-focus' : {
				update (el, binding) { // 每当指令的值更新后，会调用此函数
					if (binding.value) {
						el.focus()
						}
						}
						}
		}
	})
	window.onhashchange = function(){
		console.log('hash改变了', window.location.hash)
		// 1.获取点击的路由 hash , 当截取的 hash 不为空返回截取的，为空时返回 'all'  通过substr去掉了前两位
		const hash = window.location.hash.substr(2) || 'all'
		console.log('hash', hash)
		// 2. 状态一旦改变，将 hash 赋值给 filterStatus
		// 当计算属性 filterItems 感知到 filterStatus 变化后，就会重新过滤
		// 当 filterItems 重新过滤出目标数据后，则自动同步更新到视图中
		app.filterStatus = hash
	}
	window.onhashchange()
})(Vue);


