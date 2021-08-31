
<template>
  <div class="user-list">
    <span class="user-name">Shakir</span>
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
</template>

<script>
	export default {
		name: "users",
		props: ["userList"], //getting the userlist from app component
		data() {
			return {
				activeItemIndex: 0
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
			}
		}
	};
</script>