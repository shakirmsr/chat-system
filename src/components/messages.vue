
<template>
  <div class="user-messages">
    <span class="user-name green">{{ activeUser }}</span>
    <div class="text-input">
      <input type="text" placeholder="Enter your message here" v-model="myNewMessage" @keyup.enter="addMessage" />
      <button @click="addMessage"> <img src="../assets/send-chat-icon.png" alt="send-icon" /></button>
    </div>
    <div class="message-wrapper">
      <!-- Scroll to bottom of the chat window button -->
      <button @click="scrollToEnd" v-if="showScroller" class="scroll-to-btn"></button>
      <!-- Listing of user messages -->
      <ul ref="container" v-on:scroll.passive="handleScroll">
        <li v-for="message in messages" :key="message" :class="{ 'my-chat': message.id == 'me' }">
          {{ message.message }}
        </li>
      </ul>
      <!-- Listing of user messages ./-->
    </div>
  </div>
</template>

<script>
	export default {
		name: "messsges",
		props: { newUser: Boolean, userData: Array, userList: Array }, //getting the data from parent component
		data() {
			return {
				activeUser: "",
				activeItem: [],
				activeItemIndex: 0,
				showScroller: false,
				myNewMessage: "",
				messages: [],
			};
		},
		methods: {
			//Hiding scroll button on reaching the bottom of chat window
			handleScroll() {
				var container = this.$refs.container;
				if (
					container.scrollTop ===
					container.scrollHeight - container.offsetHeight
				) {
					this.showScroller = false;
				} else {
					this.showScroller = true;
				}
			},

			//showing the chats of the user selected
			showChat(user, index) {
				this.messages = [];
				this.showScroller = false;
				this.activeItemIndex = index;
				this.userData.forEach((item) => {
					//updating messages array of selected user
					if (item.name == user.name) {
						this.activeItem = item;
						this.activeUser = item.name;
						this.messages.push(...item.messages);
					}
				});

				//After the messages were updated - show the latest chat by scrolling to the end.
				this.$nextTick(function () {
					this.scrollToEnd();
				});
			},

			//sending a new message
			addMessage() {
				if (this.myNewMessage) {
					this.userData[this.activeItemIndex].messages.push({
						id: "me",
						message: this.myNewMessage,
					});
					this.myNewMessage = ""; //reset text field

					//After the messages were updated - show the latest chat by scrolling to the end.
					this.$nextTick(function () {
						this.scrollToEnd();
					});
				}
			},

			//scroll to the bottom of chat block
			scrollToEnd() {
				const container = this.$refs.container;
				container.scrollTop = container.scrollHeight;
			},
		},

		watch: {
			userData: {
				//watch the changes in userData
				handler(val, oldVal) {
					if (this.activeItem.length === 0 || this.newUser) {
					// if (this.activeItem.length === 0) {
						this.activeItem = this.userList[0]; //setting the default user message for first time
						this.activeItemIndex = 0;
						if(this.newUser) this.$emit('userAdded');
					}
					this.showChat(this.activeItem, this.activeItemIndex); //update the active user messages when userData changes
				},
				deep: true,
			}
		},

		mounted() {
			//emitted from users component(using mitt package)
			this.emitter.on("showMessages", (args) => {
				this.showChat(args.user, args.i);
			});
		},
	};
</script>