<script setup>
import TodoList from '/components/TodoList'
import { ref, onMounted } from 'vue'
import axios  from 'axios'
const newTodo = ref('')
const todos = ref([]);
const addLoading = ref(true);

const getTodoList = async () => {
  await axios.get('/api/todolist')
	  .then(response => {todos.value = response.data.data; addLoading.value = false; });
}

const addTodo = async () => {
  await axios.post('/api/create', {title: newTodo.value})
	  .then(response => {
		addLoading.value = true
		newTodo.value = null
		setTimeout(()=> { getTodoList() }, 100)
	  });
}

onMounted(async () => {
  await getTodoList()
});

</script>

<template>

  <div class="flex h-screen bg-yellow-300">
	<div class="m-auto w-2/3 h-2/3 bg-gray-800 shadow-2xl p-4 rounded-lg">
	  <h1 class="text-center text-white text-3xl"><span class="text-yellow-300">#</span>Todo App</h1>
	  <div id="add_group" class="w-full mt-8">
		  <input v-on:keyup.enter="addTodo" v-model="newTodo" class="h-12 pl-6 pr-6 rounded-lg w-full placeholder-gray-500 outline-none" type="text" placeholder="Add new"/>
		<p class="text-yellow-300 text-center mt-2 text-sm">{ Click Enter }</p>
	  </div>
	  <div id="todo_group" class="text-white w-full mt-8 ">
		<div class="flex flex-col p-8 leading-loose text-xl overflow-auto h-96 min-h-full">
		  <div class="loader m-auto" v-if="addLoading"></div>
		  <TodoList :todos="todos" v-if="!addLoading"/>
		</div>
		<p class="text-yellow-300 text-center mt-2 text-sm">{ Click on the done }</p>
	  </div>

	</div>
	<div id="footer" class="absolute bottom-10 right-10 animate-bounce">
	  <a href="https://musacivak.com" target="_blank"><img src="https://musacivak.com/assets/images/avatar.png" width="48" height="48"/></a>
	</div>
  </div>

</template>
