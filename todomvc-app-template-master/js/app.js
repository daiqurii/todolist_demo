(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!

})(window);

(function (Vue) { //表示依赖了全局的 Vue
	const items=[
		{
			id:1,
			content:'vue.js',
			completed:false 
		},
		{
			id: 2,
			content: 'java',
			completed: true
		},
		{
			id: 3,
			content: 'python',
			completed: false
		}
	]
	var app = new Vue({
		el: '#todoapp',
		data:{
			items:items,
			
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
			}
		},
		methods:{
			addItem:function(event){
				console.log("addItem",event.target.value);
				// 去除字符串两边空格
				const content = event.target.value.trim();
				// 如果字符串为空 就不添加
				if(content.length){
					return
				}
				// 如果不为空 为其生成id
				const id = this.items.length+1;
				this.item.push({
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
		}
	})
})(Vue);
