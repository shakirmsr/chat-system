
<template>
  <div class="user-messages">
    <span class="user-name green">{{ activeUser }}</span>
    <div class="text-input">
      <input
        type="text"
        placeholder="Enter your message here"
        v-model="myNewMessage"
        @keyup.enter="addMessage"
      />
      <button @click="addMessage">
        <img src="../assets/send-chat-icon.png" alt="send-icon" />
      </button>
    </div>
    <div class="message-wrapper">
      <!-- Scroll to bottom of the chat window button -->
      <button
        @click="scrollToEnd"
        v-if="showScroller"
        class="scroll-to-btn"
      ></button>
      <!-- Listing of user messages -->
      <ul ref="container" v-on:scroll.passive="handleScroll">
        <li
          v-for="message in messageList"
          :key="message"
          :class="{ 'my-chat': message.id == 'me' }"
        >
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
	props: ["messageList"],

	methods: {
		 //Hiding scroll button on reaching the bottom of chat window
      handleScroll(){
        var container = this.$refs.container;
        if( container.scrollTop === (container.scrollHeight - container.offsetHeight)){
          this.showScroller = false;
        }
        else{
          this.showScroller = true;
        }
      }
	}
};
</script>