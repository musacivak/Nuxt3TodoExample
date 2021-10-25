<script setup>
import axios  from 'axios'
const props = defineProps({
	todos: Array | null
})
console.log(props.todos);

const itsDone = async (event, todo) => {
  if(todo.data.status){
	let index = props.todos.indexOf(todo);
	props.todos.splice(index, 1)
	await axios.post('/api/delete', {docID: todo.id})
  } else {
	let index = props.todos.indexOf(todo);
	props.todos[index].data.status = true;
	await axios.patch('/api/update', {docID: todo.id})
  }
}

</script>
<template>

  <div v-for="todo in props.todos" :key="todo.id" >
	<span @click="itsDone($event, todo)" :class="{ 'line-through': todo.data.status }" class="flex justify-between cursor-pointer mb-4 p-4 text-sm w-full hover:bg-yellow-300 hover:text-gray-800">
	  <p>{{ todo.data.title }} </p>
	  <p class="text-xs text-opacity-25">{{ Date(todo.data.createdAt) }} <i class='bx bx-time-five' ></i></p>
	</span>
  </div>
  <span v-if="props.todos.length < 1">
	<span class="text-sm text-yellow-300">There is no data, you should try to add a new one.</span>
  </span>
</template>
