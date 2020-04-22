<template>
  <v-form v-model="valid">
      <v-row>
      <v-col sm="4" offset-sm="2">
      <v-text-field
      hide-details
      dense
      label="ID"
      @keyup.enter="$refs.pw.focus()"
      v-model="login.userId"
      >
      </v-text-field>
      </v-col>
      <v-col>
      <v-text-field
      hide-details
      dense
      ref="pw"
      @keyup.enter="submit"
      v-model="login.userPw"
      label="PW"
      >
      </v-text-field>
      </v-col>
        <v-btn
        depressed
        class="my-auto ml-1 mr-3"
        text
        ref="login"
        @click="submit"
        >
          login
        </v-btn>
      </v-row>
      <modal :dialog="OpenModal" v-on:close="closeModal">
        <template v-slot:header>
        계정이 없으십니까?
        </template>
        <template v-slot:contents>
          <h3 class="mb-2"><v-icon class="mr-2">mdi-cupcake</v-icon>파티노트와 계획을 함께하세요</h3>
          <v-form v-model="valid">
            <v-text-field label="아이디" v-model="join.userId">
            </v-text-field>
            <v-text-field label="패스워드" v-model="join.userPw">
            </v-text-field>
            <v-text-field label="패스워드 확인">
            </v-text-field>
            <v-text-field label="이름" v-model="join.userName">
            </v-text-field>
            <v-text-field label="이메일" v-model="join.userEmail">
            </v-text-field>
          </v-form>
        </template>
        <template v-slot:footerButton>
          <v-btn depressed dark class="font-weight-bold" color="primary"
          @click="joinMember">
            회원가입
          </v-btn>
        </template>
      </modal>
  </v-form>
</template>

<script>
import Modal from './modal'
import axios from 'axios'
export default {
  components: {
    Modal
  },
  created () {
    const user = sessionStorage.getItem('loginUser')
    if (user) {
      console.log('로그인 유지')
      this.$emit('login')
    } else {
      console.log('로그인된 사용자가 없습니다.')
    }
  },
  data () {
    return {
      valid: true,
      OpenModal: false,
      login: {
        userId: '',
        userPw: ''
      },
      join: {
        userId: '',
        userPw: '',
        userName: '',
        userEmail: ''
      }
    }
  },
  methods: {
    submit () {
      if (this.login.userId === '' && this.login.userPw === '') {
        this.OpenModal = true
      } else {
        // this.OpenModal = true
        axios.post('http://localhost:9000/partynote/login', this.login).then((data) => {
          // vuex에 사용자 정보 집어넣기!
          console.log(data.data)
          if (data.data) {
            sessionStorage.setItem('loginUser', data.data.userId)
            this.$emit('login')
            this.$router.push('/noteIndex')
          } else {
            alert('아이디 혹은 비밀번호가 틀렸습니다.')
          }
        })
      }
    },
    closeModal () {
      // 값 초기화
      this.join = {
        userId: '',
        userPw: '',
        userName: '',
        userEmail: ''
      }
      // 모달 비활성화
      this.OpenModal = false
    },
    joinMember () {
      console.log(this.join)
      axios.post('http://localhost:9000/partynote/join', this.join).then((data) => {
        console.log(data)
      })

      console.log(`${this.join.userId} 님 회원가입 되었습니다. 로그인해 주세요.`)

      this.closeModal()
    }
  }

}
</script>

<style>

</style>
