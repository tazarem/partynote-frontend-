<template>
      <v-card style="position:fixed; z-index:44; top:560px;" v-if="debugPopUp"
    light
    class="pa-8">
    <v-layout column>
    <v-row class="ma-0 pa-0">
    <span class="mt-2 font-weight-bold">Debug Messenger</span>
    <v-spacer></v-spacer>
    <v-btn fab x-small depressed @click="clearChatlog">
       <v-icon>mdi-refresh</v-icon>
    </v-btn>
    </v-row>

    <v-divider class="mb-3 mt-2"></v-divider>
    <v-card height="200" outlined class="pa-2 scroll" style="overflow-y:auto;" v-html="reciveTexts">
    </v-card>
    <v-row class="ma-0 m2-3 pa-0">
<!-- 
    <v-select chips dense class="mt-1">

    </v-select> -->
    <v-chip :color="chipColor" dark class="mt-3 ml-3 mr-1">
            {{sendId}}
    </v-chip>
    <v-text-field label="Input here."
    class="ma-3"
     v-model="chat" @keyup.enter="sendMsg"></v-text-field>
    <v-btn depressed class="ma-3" @click="sendMsg">send</v-btn>

    </v-row>
    </v-layout>

    </v-card>
</template>

<script>
export default {
  props: ['debugPopUp'],
  // created () {
  //   // 채팅방 연 사람들 목록 보내주기(현 접속중인 사람)
  //   this.$socket.emit('addSocketNick', this.sendId)
  //   this.$socket.on('loginedSocket', (data) => {
  //     this.loginUserSockets = data
  //   })
  //   this.$socket.on('onServer', (msg) => {
  //     this.reciveTexts += msg + '<br>'
  //     if (this.debugPopUp === false) {
  //       this.$emit('recivedMsg')
  //     }
  //   })
  // },
  data () {
    return {
      loginUserSockets: [],
      reciveTexts: '',
      chat: '',
      chipColor: sessionStorage.getItem('userColor'),
      sendId: sessionStorage.getItem('loginUser')
    }
  },
  methods: {
    clearChatlog () {
      this.reciveTexts = ''
    },
    // sendMsg () {
    //   console.log('clicked')
    //   const chatVal = this.chat
    //   const userName = this.sendId
    //   const chatMsg = `${userName} : ${chatVal} \n`
    //   //   this.$socket.emit('simpleMsg', {
    //   //     userName: this.sendId,
    //   //     msg: this.chat
    //   //   })
    //   this.$socket.emit('simpleMsg', chatMsg)
    //   this.chat = ''
    // }
  }
}
</script>

<style>

</style>
