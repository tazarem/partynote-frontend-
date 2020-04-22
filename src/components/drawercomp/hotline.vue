<template>
  <v-layout class="px-5 my-3" column>
      <v-layout class="mb-2">
        <span class="body-1 font-weight-bold">Timeline</span>
        <v-spacer></v-spacer>
        <v-icon small>mdi-pencil</v-icon> <!--click: select your component popup-->
        </v-layout>

      <template v-for="(item,index) in 3"
      >
      <v-card class="pa-2 mb-1" :key="index">
            <span class="body-2">신규 게시물 {{item}}</span>
          <v-divider>
          </v-divider>
            <small>다음과 같습니다 ...</small>
      </v-card>
      </template>
  </v-layout>
</template>

<script>
export default {

}
</script>

<style>

</style>
