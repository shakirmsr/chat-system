<template>
  <div class="container">
    <h1 class="text-center">Chat System</h1>
    <div class="chat-wrap">
      <div class="row chat-inside">
        <div class="col-md-4">
          <div class="user-list">
            <span class="user-name">Shakir</span> 
             <!-- listing of users  -->
            <ul>
              <li v-for = "(user,i) in users" :key="user" @click= "showChat(user.name, i)" :class= "{'active': i === activeItemIndex}">
                <img v-bind:src= "user.avatar" alt="" class="avatar">
                <span>{{user.name}}</span>
              </li>
            </ul>
            <!-- listing of users  ./-->
          </div>
        </div>
        <div class="col-md-8">
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
  var jsonData = require('./data.json'); //getting the json data
  const userData = jsonData.data.userData;
  export default {
    name: 'App',
    data() {
      return {
        activeUser: "",
        showScroller: false,
        activeItemIndex: null,
        myNewMessage: "",
        users: [],
        messages: []
      }
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
      showChat(name, index){
        this.messages = [];
        this.activeItemIndex = index;
        this.showScroller = false;
        userData.forEach(item => {
          if(item.name == name){
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

      //adding a new message
      addMessage(){
        if(this.myNewMessage){
          userData[this.activeItemIndex].messages.push(
            {
              id: "me",
              message: this.myNewMessage
            }
          )
          this.showChat(this.activeUser, this.activeItemIndex); //to show updated chat messages
          this.myNewMessage = ""; //empty text field

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
    mounted() {

      //setting the user name and avatar to 'users' array
      userData.forEach(element => {
        this.users.push({
          name: element.name,
          avatar: element.avatar
        });
      });
      this.showChat(this.users[0].name); //show messages of the first user by default
      this.activeItemIndex = 0; //for setting the first user as active 
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
