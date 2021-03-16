<template>
  <v-layout class="d-flex" column>
      <v-layout column class="mt-5 mx-auto">
<!-- 요청 중 -->
        <template v-if="RequestedFr.length>0"> <!--요청 중 알람. 새 알람이 없다면 false 처리-->
          <span class="white--text font-weight-bold">
              <v-icon small color="white" class="mr-1 mb-1">mdi-cookie</v-icon>Requested
          </span>
          <v-divider color="white"></v-divider>
      <v-container class="my-3 pa-0">
      <v-container :class="'scroll2'" style=" max-height:250px; overflow-y:auto;">
      <template v-for="(item,index) in RequestedFr">
          <template v-if="item.read==0"> <!--안읽었을 때-->
            <v-card class="pa-3 mt-2" width="550px" :key="index">
                <small style="color:#aaa;" class="ml-2">{{item.recentDate}}</small>
                <v-chip small
                color="grey accent-2"
                dark
                style="position:absolute; right:10px; top:7px;"
                >requested</v-chip>
                <v-divider></v-divider>
                <v-card-text>
                    <span class="body-1">{{item.friendId}}에게 친구요청 진행중</span>
                    <div style="float:right;">
                    <v-btn small depressed
                    color="grey darken-2" dark
                    @click="acceptFriendsReq(item,false)"
                    >
                        <v-icon small class="mr-1"
                        >mdi-close</v-icon>
                        cancel</v-btn> <!--친구신청 취소 버튼-->
                    </div>

                </v-card-text>
            </v-card>
          </template>
      </template>
      </v-container> <!--크기 제한 컨테이너-->
      </v-container> <!--마진 설정 컨테이너-->
      </template> <!--출현조건문 템플릿-->
<!-- 요청 중 -->
        <template v-if="newFriendList.length>0"> <!--친구알람. 새 알람이 없다면 false 처리-->
          <span class="white--text font-weight-bold">
              <v-icon small color="white" class="mr-1 mb-1">mdi-bell</v-icon>New Alert
          </span>
          <v-divider color="white"></v-divider>
      <v-container class="my-3 pa-0">
      <v-container :class="'scroll2'" style=" max-height:220px; overflow-y:auto;">
        <template v-for="(item,index) in newFriendList">
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
      </v-container>
</v-container>
        </template>   <!--친구알람 끝-->

       <!--친구 목록-->
          <span class="white--text font-weight-bold mt-1">
              <v-icon small color="white" class="mb-1">mdi-muffin</v-icon>
              My Friends
          </span>
          <v-divider color="white"></v-divider>
          <v-container class="my-3 pa-0">
            <v-container :class="'scroll2'" style=" max-height:420px; overflow-y:auto;" >
              <template v-if="FriendList.length>0">
              <template v-for="(item,index) in FriendList"><!--친구목록 가져와서 리스트뽑기-->
              <v-card class="pa-3 mt-2" width="550px" :key="`card-${index}`">
                  <v-card-text>
                    <v-avatar color="grey" size="37" class="mr-3">
                      <v-icon color="white">mdi-account</v-icon>
                    </v-avatar>
                    {{item.friendId}}</v-card-text>
              </v-card>
              </template>
              </template>
              <template v-else>
                  <v-card class="pa-3 mt-2" width="550px" flat>
                    <v-card-text>
                      아직 친구 목록이 없습니다. 검색해서 다른 사람들에게 친구요청을 보내 보세요.
                    </v-card-text>
                  </v-card>
              </template>
            </v-container>
          </v-container>

      </v-layout>

  </v-layout>
</template>

<script>
import axios from 'axios'
export default {
  created () {
    this.refresh()
  },
  data () {
    return {
      newFriendList: [],
      FriendList: [],
      RequestedFr: []
    }
  },
  methods: {
    refresh () {
      this.bringFriendsReq()
      this.bringFriends()
      this.bringRequestedFri()
    },
    bringFriendsReq () { // 새로 들어온 친구요청 받아오기
      axios.post('/partynote/bringNewFriendsReq', this.$route.params.userId).then((res) => {
        this.newFriendList = res.data
      })
    },
    bringRequestedFri () { // 자기가 한 친구요청 상태와 기록 불러오기
      axios.post('/partynote/bringRequestedFri', this.$route.params.userId).then((res) => {
        this.RequestedFr = res.data
      })
    },
    bringFriends () { // 서로 친구인 친구 목록 불러오기
      axios.post('/partynote/bringFriends', this.$route.params.userId).then((res) => {
        this.FriendList = res.data
      })
    },
    acceptFriendsReq (item, makeFriends) { // 친구요청 수락/거부. read처리한다.
      if (makeFriends) {
        axios.post('/partynote/acceptFriendsReq', item).then((res) => {
          // 수락했다면 friendEach 1. 본인도 insert. 친구요청과 다르게 수락할 때에는 read 1로 친다.
          // read1은 불러오지 않습니다.
          // 업데이트 먼저 치고 그다음 insert into friend where id=dd
          // 새로고침
          this.refresh()
        })
      } else {
        axios.post('/partynote/rejectFriendsReq', item).then((res) => { // 거절했다면 해당 요청에 대한 열을 delete.
          // 새로고침
          this.refresh()
        })
      }
    }
  }
}
</script>

<style>

</style>
