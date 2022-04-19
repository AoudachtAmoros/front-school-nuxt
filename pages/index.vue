<template>
  <Tutorial/>
</template>

<script>
export default {
  name: 'IndexPage',
  async mounted(){
    loacation.href = '/home'
     /* this.initSockets(); */
  },
  methods:{
    async initSockets() {
      this.socket = this.$nuxtSocket({
        // nuxt-socket-io opts:
        name: "chat", // Use socket "home"
        // channel: '/index', // connect to '/index'
        // socket.io-client opts:
        // reconnection: false
      });
      // connection
      this.socket.emit("connectIo", {
        emitterID: this.userID,
      });
      // conversations
      this.socket.emit("getConversations", {
        memberID: this.userID,
      });
      // this.createConversation()
      this.socket.on("setConversations", (snap) => {
        this.setConversations(snap);
      });
      // last messages
      this.socket.emit("getLastMessages", {
        userID: this.userID,
      });
      this.socket.on("setLastMessages", (snap) => {
        this.setLastMessages(snap);
      });
      this.socket.on("message", (snap) => {
        this.onMessage(snap);
      });
      // this.createUser()
      this.isGetUser = false;
    },
  }
}
</script>
