<template>
  <v-layout class="mt-2 mx-2" column>
    <v-layout class="mx-auto mt-5" column>
    <span class="headline mx-auto white--text font-weight-bold">Your Profile</span>
    <v-card width="400" class="mt-5">
      <v-layout class="pt-5 mx-12 mb-7" column>
        <div class="my-7 d-flex">
           <v-btn fab small depressed absolute color="accent"
            :disabled="readonly"
            v-if="!readonly"
            style="transform: translateX(195px) translateY(80px);"
            @click="addPicture"
            ><v-icon>mdi-plus</v-icon></v-btn>
        <v-avatar color="grey" size="120" class="mx-auto">
          <v-icon x-large color="white" v-if="picture==''">mdi-account</v-icon>
          <v-img v-else
          :src="picture"
          ></v-img>
        </v-avatar>
        <input type="file" id="profilePicture" @change="readPictureFile" hidden>
        </div>

      <v-text-field outlined dense placeholder="ID" v-model="userId" :disabled="readonly"
      @change="checkId"
      :error-messages="idChanged&&checkedId||!idChanged&&!checkedId?'':'사용중인 닉네임입니다.'"
      >
      </v-text-field>
      <template v-if="!readonly">
        <v-text-field outlined dense placeholder="비밀번호" v-model="userPw"
        type="password"
        >
        </v-text-field>
        <v-text-field outlined dense placeholder="비밀번호확인"
        type="password"
         v-model="userPwCheck" :error-messages="userPw==userPwCheck? '':'비밀번호와 다릅니다'">
        </v-text-field>
      </template>
      <v-text-field outlined dense placeholder="Name" v-model="userName" :disabled="readonly">
      </v-text-field>
      <v-text-field outlined dense placeholder="Email" v-model="userEmail" :disabled="readonly">
      </v-text-field>
      <v-textarea
            outlined v-model="quote"
            :disabled="readonly"
            class="mb-6"
            label="한마디"
            hide-details
            auto-grow
            row-height="24"
      ></v-textarea>
      <template v-if="isLoginUsersProfile()">
      <v-btn class="mb-2" depressed @click="checkPwToEdit"
      :color="readonly? 'warning':'primary'"
      >
      <v-icon class="mr-2">{{readonly? 'mdi-pencil':'mdi-cupcake'}}</v-icon>
        {{readonly? 'Edit':'Done!'}}
      </v-btn>
      <v-btn depressed v-if="!readonly" @click="setDefault">
        cancel
      </v-btn>
      </template>
      <!-- 친구요청 버튼. 먼저 내가 보고있는 상대와 자신의 친구여부를 판별합니다. -->
      <template v-else>
      <v-btn
      depressed color="pink"
      class="white--text"
      @click="makeFriends"
      v-if="fr==2"
      >
        <v-icon class="mr-2">mdi-muffin</v-icon>
        make friends!
      </v-btn>
      <v-btn
      depressed
      class="white--text"
      v-else-if="fr==0"
      disabled
      >
      <v-icon class="mr-2">mdi-cookie</v-icon> already requested
      </v-btn>
      </template>
      </v-layout>
    </v-card>

    </v-layout>
  </v-layout>
</template>

<script>
import axios from 'axios'
export default {
  created () {
    this.isFriends()
    this.bringProfile()
  },
  data () {
    return {
      readonly: true,
      checkedId: false,
      idChanged: false,
      fr: 3,
      proto: {},
      userId: '',
      userName: '',
      userEmail: '',
      userPw: '',
      userPwCheck: '',
      pictureFile: '',
      picture: '',
      quote: '',
      rules: [
      ]
    }
  },
  methods: {
    setDefault () {
      this.bringProfile()
      this.readonly = true
      this.checkedId = false
      this.idChanged = false
    },
    bringProfile () {
      axios.post('/partynote/bringProfile', this.$route.params.userId).then((res) => {
        console.log(res)
        this.userId = res.data.userId
        this.userName = res.data.userName
        this.userEmail = res.data.userEmail
        this.quote = res.data.quote
        this.picture = res.data.picture
        this.proto = res.data
      })
    },
    checkId () {
      this.idChanged = true
      console.log('idcheck!')
      axios.post('/partynote/idCheck', this.join.userId).then((res) => {
        if (res.data) {
          this.checkedId = true
        } else {
          this.checkedId = false
        }
      })
    },
    isLoginUsersProfile () {
      const loginedUser = sessionStorage.getItem('loginUser')
      const profileUser = this.userId
      if (loginedUser == profileUser) {
        return true
      } else {
        return false
      }
    },
    addPicture () {
      const pic = document.getElementById('profilePicture')
      pic.click()
    },
    readPictureFile () {
      const pic = document.getElementById('profilePicture')
      const picture = pic.files[0]
      this.pictureFile = pic.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(picture)
      reader.onload = () => {
        this.picture = reader.result
      }
    },
    checkPwToEdit () {
      if (this.readonly) { // 비밀번호 검증
        const input = prompt('비밀번호를 입력해주세요')
        axios.post('/partynote/checkPw', {
          userId: this.$route.params.userId,
          userPw: input
        }).then((res) => {
          if (res.data == 1) {
            this.readonly = !this.readonly
          }
        })
      } else { // 적용 버튼을 눌렀을 때의 submit
        const forms = [{
          userId: this.userId,
          userName: this.userName,
          userEmail: this.userEmail,
          userPw: this.userPw,
          // picture: this.use,
          quote: this.quote
        }, this.proto]
        axios.post('/partynote/editProfile', forms).then((res) => {
          this.bringProfile()
          this.readonly = true
        })
      }
    },
    isFriends () {
      const loginUser = sessionStorage.getItem('loginUser')
      const profileUser = this.$route.params.userId
      if (loginUser !== profileUser) {
      // 친구인지 확인하기
        axios.post('/partynote/isYourFriends', {
          userId: loginUser,
          friendId: profileUser
        }).then((res) => {
          this.fr = res.data
        })
      }
    },
    makeFriends () {
      const loginUser = sessionStorage.getItem('loginUser')
      const profileUser = this.$route.params.userId
      console.log(`${loginUser}이 ${profileUser}에게 친구요청을 합니다.`)
      axios.post('/partynote/makeFriends', {
        userId: loginUser,
        friendId: profileUser
      }).then(res => {
        if (res.data == 1) {
          alert('친구요청 완료!')
          this.isFriends()
        }
      })
    }
  }
}
</script>

<style>

</style>
