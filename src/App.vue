<template>
  <div class="container">
    <h1 class="text-center">Chat System</h1>
    <div class="chat-wrap">
      <div class="row chat-inside">
        <div class="col-md-4">
          <users :userList = "userList" :activeIndex = "activeItemIndex" @show = "showChat"></users>
        </div>
        <div class="col-md-8">
          <!-- <messages></messages> -->
          <div class="user-messages">
            <span class="user-name green">{{activeUser}}</span>
            <div class="text-input">
              <input type="text" placeholder="Enter your message here" v-model="myNewMessage" @keyup.enter = "addMessage">
              <button @click = "addMessage"><img src="./assets/send-chat-icon.png" alt="send-icon"></button>
            </div>
            <div class="message-wrapper">
              <!-- Scroll to bottom of the chat window button -->
              <button @click = "scrollToEnd" v-if = "showScroller" class="scroll-to-btn"></button>
              <!-- Listing of user messages -->
              <ul ref="container" v-on:scroll.passive="handleScroll">
                <li v-for = "message in messages" :key="message" :class="{ 'my-chat': message.id == 'me'}">
                  {{message.message}}
                </li>
              </ul>
              <!-- Listing of user messages ./-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import users from "./components/users.vue";
  import messages from "./components/messages.vue";
  var jsonData = require('./data.json'); //getting the json data
  // var userData = jsonData.data.userData;
  export default {
    name: 'App',
    data() {
      return {
        activeUser: "",
        activeItem: [],
        showScroller: false,
        myNewMessage: "",
        userList: [],
        messages: [],
        userData: []
      }
    },

    components: {
      users,
      messages
    },
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
      },

      //showing the chats of the user selected
      showChat(user, index){
        this.messages = [];
        this.showScroller = false;
        this.userData.forEach(item => { //updating messages array of selected user
          if(item.name == user.name){
            this.activeItem = item;
            this.activeUser = item.name;
            item.messages.map(i => {
              this.messages.push({
                id: i.id,
                message: i.message
              })
            });
          }
        });

        //After the messages were updated - show the latest chat by scrolling to the end.
        this.$nextTick(function () {
          this.scrollToEnd();
        })
      },

      //sending a new message
      addMessage(){
        if(this.myNewMessage){
          this.userData[this.activeItemIndex].messages.push(
            {
              id: "me",
              message: this.myNewMessage
            }
          )
          this.myNewMessage = ""; //reset text field

          //After the messages were updated - show the latest chat by scrolling to the end.
          this.$nextTick(function () {
            this.scrollToEnd();
          })
        }
      },

      //scroll to the bottom of chat block 
      scrollToEnd() {    	
        const container = this.$refs.container;
        container.scrollTop = container.scrollHeight;
      },
    },

    watch: {
      userData: { //watch the changes in userData
        handler(val, oldVal) {
          console.log("change in parent userData");
          this.showChat(this.activeItem, this.activeItemIndex); //update the active user messages when userData changes
        },
        deep: true
      },
      userList: { //watch the changes in userData
        handler(val, oldVal) {
          console.log("change in parent users");
        },
        deep: true
      }
    },
    mounted() {
      //setting the user name and avatar to 'users' array
      this.userData = jsonData.data.userData;
      this.userData.forEach(element => {
        this.userList.push({
          name: element.name,
          avatar: element.avatar,
          counter: element.counter
        });
      });
      this.activeItemIndex = 0; //for setting the first user as active 
      this.showChat(this.userList[0], this.activeItemIndex); //show messages of the first user by default

      //Adding incoming messages
      setTimeout(() =>{
        this.userData[2].messages.push(
          {
            id: "razeem",
            message: "Hi this is Razeems new message"
          }
        )
        this.userList[2].counter = 1;
        this.userData[3].messages.push(
          {
            id: "sunil",
            message: "Hi this sunils new message"
          },
          {
            id: "sunil",
            message: "Hi this sunils another message"
          }
        )
        this.userList[3].counter = 2;
      },5000)
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: #2c3e50;
    margin-top: 30px;
  }
  h1{
    color: #05728f;
    margin-bottom: 20px;
  }
  .scroll-to-btn{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #05728f;
    outline: none;
    border: none;
    position: absolute;
    right: 25px;
    bottom: 50px;
    &::before{
      content: "\276F";
      position: absolute;
      color: #ffffff;
      font-size: 30px;
      transform: translate(-50%, -50%) rotate(90deg);
      left: 50%;
      top: 50%;
    }
  }
  .chat-wrap{
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.4);
  }
  .user-name{
    padding: 15px;
    display: block;
    color: #05728f;
    font-size: 20px;
    font-weight: bold;
    border-bottom: 1px solid #05728f;
    &.green{
      color: #40c792;
      border-color: #40c792;
    }
  }
  .counter{
    position: absolute;
    right: 20px;
    top: 27px;
    width: 22px;
    font-size: 12px;
    height: 22px;
    background: #05728f;
    border-radius: 50%;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .chat-inside{
    min-height: 85vh;
  }
  .user-list{
    box-shadow: 3px 0px 3px -2px rgba(0, 0, 0, 0.4);
    height: 100%;
    background: #f8f8f8;
    ul{
      margin: 0;
      list-style-type: none;
      padding: 0;
      max-height: 70vh;
      overflow: auto;
      li{
        cursor: pointer;
        padding: 15px;
        position: relative;
        // background: #ebebeb;
        border-bottom: 1px solid #c4c4c4;
        color: #464646;
        &:hover, &.active{
          background: #ebebeb;
        }
        .avatar{
          max-width: 40px;
        }
        >span{
          padding-left: 12px;
          font-weight: bold;
        }
      }
    }
  }
  .user-messages{
    position: relative;
    height: 100%;
    .text-input{
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      input[type="text"]{
        width: 100%;
        height: 40px;
        border: none;
        border-top: 1px solid #c4c4c4;
        outline: none !important;
      }
      button{
        position: absolute;
        right: 10px;
        top: 0;
        border:none;
        background: none;
        img{
          max-width: 40px;
        }
      }
    }
    ul{
      margin: 0;
      list-style-type: none;
      display: flex;
      flex-direction: column;
      padding: 20px 60px;
      max-height: 70vh;
      overflow: auto;
      li{
        max-width: 50%;
        background: #ebebeb;
        border-radius: 3px;
        color: #646464;
        border-radius: 5px;
        margin-bottom: 20px;
        padding: 10px 20px 10px 20px;
        align-self: flex-start;
        &.my-chat{
          background: #05728f;
          color: #ffffff;
          align-self: flex-end;
        }
      }
    }
  }
</style>
