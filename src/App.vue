<template>
  <v-app>
    <v-app-bar
      app
      color="secondary"
      dark
      flat
      clipped-right
    >
    <!-- 이거 보드 아이콘이면 좋겠다. -->

    <v-icon large class="mr-2" :color="user.color">{{user.icon}}</v-icon>
    <small class="headline" @click="goMain" style="cursor:pointer;" >PartyNote</small>

    <v-spacer></v-spacer>
    <v-col cols="3">
    <v-text-field
    v-model="generalSearch"
    outlined
    placeholder="Search User or Post or Book.."
    append-icon="mdi-magnify"
    hide-details
    @keyup.enter="doSearch"
    >
    </v-text-field>
    </v-col>
    <v-tooltip bottom v-if="!islogin && !offline">
    <template v-slot:activator="{ on }">
    <v-btn v-if="!islogin" fab @mouseenter="btnhover=true" @mouseleave="btnhover=false"
    v-on="on"
    style="margin-right:-65px;"
    @click="offlineMod"
    small
    depressed>
      <v-icon>mdi-wifi-off</v-icon>
    </v-btn>
    </template>
    <span>Offline Mod</span>
    </v-tooltip>

    <Login v-if="!islogin && !offline"
    v-on:login="fetchLogin"
    ></Login>

    <transition name="fade">
    <v-btn text small :fab="!btnhover" v-if="islogin"
    @mouseenter="btnhover=true" @mouseleave="btnhover=false"
    :color="user.color"
    @click="reColor"
    >
      <v-icon>mdi-recycle</v-icon>
      <span v-show="btnhover" class="ml-2">ReColor?</span>
    </v-btn>
    </transition>

    <!-- 로그인 할 때 출현하는 메뉴 -->
    <v-menu offset-y class="mr-3" v-if="islogin">
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">
        <v-avatar size="37" class="mr-3" :color="user.color">
          <v-icon>{{user.icon}}</v-icon>
        </v-avatar>
        <span class="">{{user.name}}</span>
        </v-btn>
      </template>
      <v-list dense dark class="secondary">
        <v-list-item
        >
          <v-icon left small>mdi-help</v-icon>
          <v-list-item-title>도움말</v-list-item-title>
        </v-list-item>

        <v-list-item
        :to="`/profile/${user.name}`"
        >
          <v-icon left small>mdi-cupcake</v-icon>
          <v-list-item-title>프로필</v-list-item-title>
        </v-list-item>

        <v-list-item
       @click="logOut"
        >
        <v-icon left small>mdi-bomb</v-icon>
          <v-list-item-title>로그아웃</v-list-item-title>
        </v-list-item>

        <v-list-item
        to="/friendList"
        >
          <v-icon left small>mdi-muffin</v-icon>
          <v-list-item-title>친구</v-list-item-title>
        </v-list-item>

        <v-list-item
        to="/noteIndex"
        >
          <v-icon left small>mdi-book</v-icon>
          <v-list-item-title>다이어리 보기</v-list-item-title>
        </v-list-item>
        <v-list-item
        @click=""
        >
          <v-icon left small>mdi-email</v-icon>
          <v-list-item-title>쪽지 보내기</v-list-item-title>
        </v-list-item>

      </v-list>
    </v-menu>
<!-- 메뉴 닫힘 -->

    <!-- 오프라인 모드일 때 출현하는 메뉴 -->
    <v-menu offset-y class="mr-3" v-if="offline">
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">
        <v-avatar size="37" class="mr-3" color="grey">
          <v-icon>mdi-monitor-star</v-icon>
        </v-avatar>
        <span class="">offline</span>
        </v-btn>
      </template>
      <v-list dense dark class="secondary">
        <v-list-item
        to="/profile"
        >
          <v-icon left small>mdi-cupcake</v-icon>
          <v-list-item-title>프로필</v-list-item-title>
        </v-list-item>

        <v-list-item
       @click="logOutOffline"
        >
        <v-icon left small>mdi-bomb</v-icon>
          <v-list-item-title>로그아웃</v-list-item-title>
        </v-list-item>

        <v-list-item
        to="/noteIndex-offline-mod"
        >
          <v-icon left small>mdi-book</v-icon>
          <v-list-item-title>다이어리 보기</v-list-item-title>
        </v-list-item>

      </v-list>
    </v-menu>
<!-- 메뉴 닫힘 -->

    </v-app-bar>
       <v-content fill-height :class="user.color" style="max-width:100%; max-height:100% overflow:hidden;">
         <transition name="fade" mode="out-in">
         <router-view v-on:drawerControll="RightDrawer=!RightDrawer"></router-view>
        <!-- <BeforeLogin></BeforeLogin> -->
        </transition>
       </v-content>
  </v-app>
</template>

<script>
import Login from './components/login.vue'

export default {
  name: 'App',
  components: {
    Login

  },
  created () {
    // 유저 정보 불러오기. axios를 이용하여 다이어리와 포스트를 불러와 백엔드와 통신.

    // if (!window.indexedDB) {
    //   window.alert('이 브라우저는 오프라인 모드를 지원하지 않습니다.')
    // } else {
    //   window.alert('이 브라우저는 오프라인 모드를 지원합니다.')
    // }
    const offlineMod = sessionStorage.getItem('OfflineMod')
    if (offlineMod === 'on') {
      this.offline = true
      sessionStorage.setItem('userColor', 'grey')
    } else {
      this.user.color = this.randomColor()
      sessionStorage.setItem('userColor', this.user.color)
      this.user.icon = this.randomAvatar()
    }
  },
  data () {
    return {
      user: {
        color: 'grey',
        icon: 'mdi-cupcake',
        name: 'offline'
      },
      cards: [],
      generalSearch: '',
      islogin: false,
      offline: false,
      btnhover: false,
      EditBtnsOn: false,
      DeleteMode: false,
      NewDiaryBtn: false,
      OpenModal: false,
      RightDrawer: false,
      ModalShow: {
        title: '',
        date: '',
        contents: '',
        button: ''
      },
      ModalCase: 'create',
      EditedTitle: 'New Card'
    }
  },
  methods: {
    fetchLogin () {
      this.user.name = sessionStorage.getItem('loginUser')
      this.islogin = true
    },
    logOut () {
      console.log('로그아웃')
      sessionStorage.clear()
      this.user.name = ''
      this.islogin = false
      alert('로그아웃 되었습니다.')
      this.$router.push('/')
    },
    logOutOffline () {
      sessionStorage.clear()
      this.offline = false
      this.user.color = this.randomColor()
      sessionStorage.setItem('userColor', this.user.color)
      this.$router.push('/')
    },
    // 탑바 계정 랜덤 결정기
    randomAvatar () {
      const str = 'mdi-'
      const icons = [
        'cupcake',
        'cup-water',
        'cat',
        'dog',
        'cow',
        'fruit-watermelon',
        'fruit-pineapple',
        'fishbowl',
        'castle',
        'chef-hat',
        'skull'
      ]
      const randomCase = Math.floor(Math.random() * 11)
      return `${str}${icons[randomCase]}`
    },
    randomColor () {
      const colors = [
        'red',
        'pink',
        'purple',
        'deep-purple',
        'indigo',
        'blue',
        'light-blue',
        'cyan',
        'teal',
        'green',
        'light-green',
        'lime',
        'yellow',
        'amber',
        'orange',
        'deep-orange'
      ]
      const brighten = ['lighten-3', 'lighten-2', 'lighten-1']
      const colorCase = Math.floor(Math.random() * 16)
      const brightCase = Math.floor(Math.random() * 3)

      return `${colors[colorCase]} ${brighten[brightCase]}`
    },
    reColor () {
      this.user.color = this.randomColor()
    },
    goMain () {
      // console.log(sessionStorage.getItem('loginUser'))
      const user = sessionStorage.getItem('loginUser')
      if (user && this.$route.path !== '/noteIndex') {
        this.$router.push('/noteIndex')
      } else if (this.$route.path === '/noteIndex') {

      } else {
        this.$router.push('/')
      }
    },
    doSearch () {
      // 일단 검색 단어에 대한 전체공백을 제거하였으나 추후 옵션에 따라 조건 필터링할 것
      const searchData = this.generalSearch.replace(/(\s*)/g, "")
      if (searchData !== '') { this.$router.push(`/search/${searchData}`) }
    },
    offlineMod () {
    // 로그인 정보를 오프라인 모드로 바꿉니다.
      sessionStorage.setItem('OfflineMod', 'on')
      this.user.color = 'grey'
      sessionStorage.setItem('userColor', 'grey')
      this.$router.push('/noteIndex-offline-mod')
      this.offline = true
      // this.islogin = true
    }
  }
}
</script>
<style>
html::-webkit-scrollbar {
  width: 5px;
  height: 8px;
  border: 3px solid #fff;
  display: none !important;
}
body{
cursor: url('assets/cursor-default.png'), default;
}
.scroll{
  overflow: auto;
}
.scroll::-webkit-scrollbar {
    width: 10px;
    height: 0px;
    background-color: transparent;
}
.scroll::-webkit-scrollbar-corner {
    background-color: transparent;
    border-color: transparent;
}
.scroll::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #0000007e;
}
.scroll::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: transparent;
}

.scroll2{
  overflow:auto;
}
.scroll2::-webkit-scrollbar {
    width: 10px;
    height: 0px;
    background-color: transparent;
}
.scroll2::-webkit-scrollbar-corner {
    background-color: transparent;
    border-color: transparent;
}
.scroll2::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #0000007e;
}
.scroll2::-webkit-scrollbar-track {
    background-color: #0000002f;
}

.selophan{
  opacity:0.6;
  background-color: black;
  color: white;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s !important;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0 !important ;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
