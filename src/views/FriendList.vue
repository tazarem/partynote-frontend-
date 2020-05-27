<template>
  <v-layout class="d-flex" column>
      <v-layout column class="mt-5 mx-auto">
        <template v-if="false"> <!--새 알람이 없다면 false 처리-->



          <span class="white--text font-weight-bold">
              <v-icon small color="white" class="mr-1 mb-1">mdi-bell</v-icon>New Alert
          </span>
          <v-divider color="white"></v-divider>
      <template v-for="(item,index) in FriendList">
          <template v-if="item.read==0"> <!--안읽었을 때-->
            <v-card class="pa-3 mt-2" width="550px" :key="index">
                <small style="color:#aaa;" class="ml-2">{{item.recentDate}}</small>
                <v-chip small
                color="orange accent-2"
                dark
                style="position:absolute; right:10px; top:7px;"
                >new</v-chip>
                <v-divider></v-divider>
                <v-card-text>
                    <span class="body-1">친구 요청 : {{item.userId}}</span>
                    <div style="float:right;">
                    <v-btn small depressed
                    class="mr-2"
                    color="accent" dark
                    @click="acceptFriendsReq(item,true)"
                    >
                        <v-icon small class="mr-1"
                        >mdi-muffin</v-icon>
                        Of course!</v-btn>
                    <v-btn small depressed
                    class=""
                    color="warning" dark
                    @click="acceptFriendsReq(item,false)"
                    >
                        <v-icon small class="mr-1"
                        >mdi-close</v-icon>
                        Not this Time</v-btn>
                    </div>

                </v-card-text>
            </v-card>
          </template>
      </template>


        </template>   <!--친구알람 끝-->


      <template v-if="true"> <!--친구 목록-->
          <span class="white--text font-weight-bold mt-5">
              <v-icon small color="white" class="mb-1">mdi-muffin</v-icon>
              My Friends
          </span>
          <v-divider color="white"></v-divider>
            <template v-for="index in 8"><!--친구목록 가져와서 리스트뽑기-->
            <v-card class="pa-3 mt-2" width="550px" :key="index">
                <v-card-text>
                  <v-avatar color="grey" size="37" class="mr-3">
                    <v-icon color="white">mdi-account</v-icon>
                  </v-avatar>
                  userName{{index}}</v-card-text>
            </v-card>
            </template>

       </template>

      </v-layout>

  </v-layout>
</template>

<script>
import axios from 'axios'
export default {
  created () {
    this.bringFriendsReq()
  },
  data () {
    return {
      FriendList: []
    }
  },
  methods: {
    bringFriendsReq () {
      axios.post('/partynote/bringNewFriendsDet', this.$route.params.userId).then((res) => {
        this.FriendList = res.data
      })
    },
    acceptFriendsReq (item, makeFriends) { // 친구요청 수락/거부. read처리한다.
      if (makeFriends) {
        axios.post('/partynote/acceptFriendsReq', item).then((res) => { 
          //수락했다면 friendEach 1. 본인도 insert. 친구요청과 다르게 수락할 때에는 read 1로 친다.
          //read1은 불러오지 않습니다.
          //업데이트 먼저 치고 그다음 insert into friend where id=dd
          console.log(res.data)
        })
      } else {
        axios.post('/partynote/rejectFriendsReq', item).then((res) => { //거절했다면 해당 요청에 대한 열을 delete.
          console.log(res.data)
        })
      }
    }
  }
}
</script>

<style>

</style>
