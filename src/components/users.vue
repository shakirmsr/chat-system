
<template>
  <div class="user-list">
    <span class="user-name">Shakir</span>
    <!-- listing of users  -->
    <ul>
      <li
        v-for="(user, i) in userList"
        :key="user"
        @click="showChat(user, i)"
        :class="{ active: i === activeItemIndex }"
      >
        <img v-bind:src="user.avatar" alt="" class="avatar" />
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
  props: ["userList"],
	data() {
		return {
			activeItemIndex: 0
		}
	},
	watch: {
		userList: { //watch the changes in userData
			handler(val, oldVal) {
				console.log("change in child users");
				console.log(this.userList);
			},
			deep: true
		}
	},
	methods: {
		showChat(user, i){
			this.userList[i].counter = 0;
			this.activeItemIndex = i;
			this.$emit('show', user, i);
		}
	}
};
</script>