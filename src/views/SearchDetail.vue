<template>
<v-layout class="mt-2 mx-2" column>
<v-card color="transparent" class="px-2" tile flat>
  <h2 class="white--text" v-if="true" style="width:100%;">User</h2>
  <v-divider></v-divider>
  <template v-if="searchUserResult.length>0">
        <span v-for="(user,index) in searchUserResult" :key="index">
            <v-btn :to="`/profile/${user.userId}`" class="ma-2">{{user.userId}}</v-btn>
        </span>
  </template>
  <template v-else>
      검색 결과 없음
  </template>
</v-card>
<v-card color="transparent" class="px-2" tile flat>
  <h2 class="white--text" v-if="true" style="width:100%;">Book</h2>
  <v-divider></v-divider>
  <v-layout row>
  <template v-if="searchBookResult.length>0">
        <span v-for="(book,index) in searchBookResult" :key="index">
          <v-card width="200" class="ma-2 py-3 px-4">
          <v-card-text>
            {{book.bookTitle}}
          </v-card-text>
          </v-card>
            <!-- {{book.bookTitle}} <br> -->
        </span>
  </template>
  <template v-else>
     -
  </template>
  </v-layout>
</v-card>
<v-card color="transparent" class="px-2" tile flat>
  <h2 class="white--text" v-if="true" style="width:100%;">Note</h2>
  <v-divider></v-divider>
  <v-layout row>
  <template v-if="searchNoteResult.length>0">
        <span v-for="(note,index) in searchNoteResult" :key="index">
          <v-card width="200" class="ma-2 py-3 px-4" :to="`/noteDetail/${note.noteCode}`"
          :color="note.noteColor"
          >
            <span>{{note.noteTitle}}</span>
          <v-card-text>
            작성자 : {{note.noteCode.substr(0,(note.noteCode.length-4))}}
          </v-card-text>
          </v-card>
        </span>
  </template>
  <template v-else>
     -
  </template>
  </v-layout>

</v-card>
<v-card color="transparent" class="px-2" tile flat>
  <h2 class="white--text" v-if="true" style="width:100%;">Post</h2>
  <v-divider></v-divider>
  <!-- <template v-if="searchPostResult.length>0">
        <span v-for="(post,index) in searchPostResult" :key="index">
            {{post.postTitle}}<br>
            {{post.postContents}} <br>
        </span>
  </template>
  <template v-else>
    -
  </template> -->
    <v-layout row>
  <template v-if="searchPostResult.length>0">
        <span v-for="(post,index) in searchPostResult" :key="index">
          <v-card width="200" class="ma-2 py-3 px-4"
          >
          <v-card-text>
            {{post.postTitle}}<br>
            {{post.postContents}} <br>
          </v-card-text>
          </v-card>
        </span>
  </template>
  <template v-else>
     -
  </template>
  </v-layout>
</v-card>
        </v-layout>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      searchUserResult: [],
      searchPostResult: [],
      searchBookResult: [],
      searchNoteResult: []
    }
  },
  created () {
    this.search()
  },
  methods: {
    search () {
      const searchData = JSON.parse(JSON.stringify(this.$route.params.searchData))
      console.log(searchData)
      axios.post('/partynote/generalSearch',
        { searchData: searchData }
      ).then((res) => {
        console.log(res.data)
        this.searchUserResult = res.data.members
        this.searchBookResult = res.data.books
        this.searchNoteResult = res.data.notes
        this.searchPostResult = res.data.posts
      })
    }
  },
  watch: {
    // $route.params.searchData: function(){

    // }
  }
}
</script>

<style>

</style>
