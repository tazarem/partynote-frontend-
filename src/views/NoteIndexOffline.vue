<template>
<v-layout class="mt-2 mx-4" column>
  <v-toolbar flat color="transparent"
  dense
  >
  <h2 class="white--text" v-if="true" style="width:100%;"
  >Select your Note</h2>

  <v-spacer></v-spacer>
  <v-btn fab small class="mr-2" depressed
  :class="this.toggleMode==='edit'? 'warning':'grey lighten-4'"
  @click="toggleMode==='edit'? toggleMode='default':toggleMode='edit'"
  ><v-icon>mdi-pencil</v-icon></v-btn> <!--편집 버튼-->
  <v-btn fab small depressed
  @click="toggleMode==='delete'? toggleMode='default':toggleMode='delete'"
  :class="this.toggleMode==='delete'? 'error':'grey lighten-4'"
  ><v-icon
  >mdi-delete</v-icon></v-btn> <!--삭제 버튼-->
  </v-toolbar>

<v-layout class="mt-2">
    <v-hover
          v-slot:default="{ hover }"
        >
    <v-card flat color="black" dark style="opacity:0.5;"
    class="pa-3 mr-3 mb-2 float-left d-flex justify-center defaultMode"
    width="230"
    height="170"
    :elevation="hover?  10 : 3"
    @click="openModal"
    :disabled="toggleMode!=='default'"
    >
    <!-- 딜리트 모드일땐 클릭 막아 -->
    <transition name="slide-fade">
    <v-icon x-large v-if="toggleMode!=='default'">mdi-close</v-icon>
    <v-icon x-large v-else>mdi-plus</v-icon>
    </transition>
    </v-card>

    </v-hover>
    <!-- 기존 목록의 노트들을 불러오는 구간 -->
    <template v-for="note in this.notes">
      <v-hover
      v-slot:default="{ hover }"
      :key="note.noteCode"
      >
      <v-card
      :key="note.noteCode"
      :color="note.noteColor"
      :elevation="hover?  10 : 3"
      class="pa-3 mr-3 mb-2"
      :class="nowModes()"
      width="230"
      height="170"
      flat
      @click="toggleMode==='default'? noteDetail(note) : editOrDelete(note)"
      >
      <template>
        <span
        >{{ note.noteTitle }}</span>
        <small v-if="note.noteTitle.length>15">..</small>
        <v-divider></v-divider>
        <div class="d-flex justify-end align-center my-1">
                <v-spacer></v-spacer>
                <small class="overline">{{note.recentDate}}</small>
        </div>
        <small class="body-2" v-html="note.noteDes">
        </small>
        </template>
      </v-card>
      </v-hover>
    </template>
    <!-- 기존 목록의 노트들을 불러오는 구간  v-if="toggleMode!=='delete'"-->
</v-layout>
<modal :dialog="Modal" v-on:close="closeModal">
  <template v-slot:header>
    <span v-if="toggleMode==='default'">새 노트 만들기..</span>
     <span v-else-if="toggleMode==='edit'">수정하기</span>
     <span v-else-if="toggleMode==='delete'">노트 삭제</span>
  </template>
  <template v-slot:contents>
    <span v-if="toggleMode==='delete'">
      <h3>{{newNote.noteTitle}}</h3> 정말 이 노트를 삭제할까요?</span>
    <v-form v-else>
      <v-text-field label="노트 제목" v-model="newNote.noteTitle">
      </v-text-field>
      <v-text-field label="간략한 설명을 적으십시오.." v-model="newNote.noteDes">
      </v-text-field>
      <h3>노트 색 정하기</h3>
      <v-select :items="ColorSample" v-model="newNote.noteColor" :background-color="newNote.noteColor"
      >
      </v-select>
    </v-form>
  </template>
  <template v-slot:footerButton>
    <v-btn depressed color="accent" @click="submit" v-if="toggleMode==='default'">
      <span>노트 만들기</span>
    </v-btn>
    <v-btn depressed color="warning" @click="editNote(newNote)" v-else-if="toggleMode==='edit'">
      <span>수정하기</span>
    </v-btn>
    <v-btn depressed color="error" @click="deleteNote(newNote)" v-else-if="toggleMode==='delete'">
      <span>삭제</span>
    </v-btn>
  </template>
</modal>
<audio id="playSound" src="../assets/recycle.wav"></audio>
</v-layout>
</template>

<script>
import store from '../api/store'
import Modal from '../components/modal.vue'
export default {
  components: {
    Modal
  },
  created () {
    // 사용자 정보를 토대로 노트를 불러옵니다
    this.loadNote()
  },
  data () {
    return {
      db: {},
      req: {},
      Modal: false,
      notes: [],
      toggleMode: 'default',
      newNote: {
        noteCode: '',
        noteTitle: '',
        noteDes: '',
        noteColor: ''
      },
      ColorSample: [
        'red lighten-5', 'red  lighten-4', 'red lighten-3',
        'pink lighten-5', 'pink  lighten-4', 'pink lighten-3',
        'purple lighten-5', 'purple lighten-4', 'purple lighten-3',
        'deep-purple lighten-5', 'deep-purple lighten-4', 'deep-purple lighten-3',
        'indigo lighten-5', 'indigo lighten-4', 'indigo lighten-3',
        'blue lighten-5', 'blue lighten-4', 'blue lighten-3',
        'light-blue lighten-5', 'light-blue lighten-4', 'light-blue lighten-3',
        'cyan lighten-5', 'cyan lighten-4', 'cyan lighten-3',
        'green lighten-5', 'green lighten-4', 'green lighten-3',
        'light-green lighten-5', 'light-green lighten-4', 'light-green lighten-3',
        'lime lighten-5', 'lime lighten-4', 'lime lighten-3',
        'amber lighten-5', 'amber lighten-4', 'amber lighten-3',
        'orange lighten-5', 'orange lighten-4', 'orange lighten-3',
        'deep-orange lighten-5', 'deep-orange lighten-4', 'deep-orange lighten-3'
      ]
    }
  },
  methods: {
    closeModal () {
      this.Modal = false
      this.newNote = {
        noteCode: '',
        noteTitle: '',
        noteDes: '',
        noteColor: ''
      }
    },
    openModal () {
      this.Modal = true
    },
    loadNote () {
    // 저장된 데이터 가져오기
    },
    submit () {
      // this.noteCode
    },
    noteDetail (note) {
    },
    nowModes () {
      const mode = this.toggleMode
      switch (mode) {
        case 'edit': {
          return 'editMode' }
        case 'delete': {
          return 'deleteMode' }
        default: {
          return 'defaultMode' }
      }
    },
    editOrDelete (note) {

    },
    editNote (note) {

    },
    deleteNote (note) {

    }
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.deleteMode{
  cursor: url("../assets/delete.png"), auto;
}
.editMode{
  cursor: url("../assets/pencil.png"), auto;
}
.defaultMode{
  cursor: url('../assets/cursor-pointer.png'), auto;
}
</style>
