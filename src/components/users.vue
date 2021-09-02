
<template>
  <div class="user-list">
		<div class="user-name" style="display:flex;justify-content:space-between;align-items:center;">
			<span>Shakir</span>
			<button @click="newChat" class="btn btn-primary rounded-circle">+</button>
		</div>
    <!-- listing of users  -->
    <ul>
      <li
        v-for="(user, i) in userList"
        :key="user"
        @click="showChat(user,i)"
        :class="{ active: i === activeItemIndex }"
      >
        <img v-bind:src="user.avatar" alt="user image" class="avatar" />
        <span>{{ user.name }}</span>
        <div class="counter" v-if="user.counter">{{ user.counter }}</div>
      </li>
    </ul>
    <!-- listing of users  ./-->
  </div>
	<new-chat-window v-if="show_new_chat" @close="show_new_chat=false" />
</template>

<script>
	import NewChatWindow from './NewChatWindow.vue'
	export default {
		name: "users",
		components: {
			NewChatWindow,
		},
		props: ["userList"], //getting the userlist from app component
		data() {
			return {
				activeItemIndex: 0,
				show_new_chat: false
			}
		},
		watch: {
			userList: { //watch the changes in userData
				handler() {
					this.userList[this.activeItemIndex].counter = 0; //hide the counter when new message arrives for active user
				},
				deep: true
			}
		},
		methods: {
			showChat(user, i){
				this.userList[i].counter = 0; //hide the counter on click
				this.activeItemIndex = i;
				this.emitter.emit('showMessages', {user, i}); //emit to the message component
			},
			newChat () {
				this.show_new_chat = true
			}
		},
		mounted() {
			this.emitter.on("addNewUser", () => {
				this.activeItemIndex = 0; //upon adding a new user changing active index
			})
		}
	};
</script>