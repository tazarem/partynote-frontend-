<template>
<v-layout class="mt-2 mx-2" column>
<v-card color="transparent" class="px-2" tile flat>
  <h2 class="white--text" v-if="true" style="width:100%;">User</h2>
  <v-divider></v-divider>
  <template v-if="searchUserResult.length>0">
        <span v-for="(user,index) in searchUserResult" :key="index">
            {{user.userId}}
        </span>
  </template>
  <template v-else>
      검색 결과 없음
  </template>
</v-card>
<v-card color="transparent" class="px-2" tile flat>
  <h2 class="white--text" v-if="true" style="width:100%;">Book</h2>
  <v-divider></v-divider>
  <template v-if="searchBookResult.length>0">
        <span v-for="(book,index) in searchBookResult" :key="index">
            {{book.bookTitle}} <br>
        </span>
  </template>
  <template v-else>
     -
  </template>
</v-card>
<v-card color="transparent" class="px-2" tile flat>
  <h2 class="white--text" v-if="true" style="width:100%;">Note</h2>
  <v-divider></v-divider>
  <template v-if="searchNoteResult.length>0">
        <span v-for="(note,index) in searchNoteResult" :key="index">
            {{note.noteTitle}} <br>
        </span>
  </template>
  <template v-else>
     -
  </template>
</v-card>
<v-card color="transparent" class="px-2" tile flat>
  <h2 class="white--text" v-if="true" style="width:100%;">Post</h2>
  <v-divider></v-divider>
  <template v-if="searchPostResult.length>0">
        <span v-for="(post,index) in searchPostResult" :key="index">
            {{post.postTitle}}<br>
            {{post.postContents}} <br>
        </span>
  </template>
  <template v-else>
    -
  </template>
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
    const searchData = this.$route.params.searchData
    axios.post('/partynote/generalSearch', searchData).then((res) => {
      console.log(res.data.members[0].userId)
      this.searchUserResult = res.data.members
      this.searchBookResult = res.data.books
      this.searchNoteResult = res.data.notes
      this.searchPostResult = res.data.posts
    })
  }
}
</script>

<style>

</style>
