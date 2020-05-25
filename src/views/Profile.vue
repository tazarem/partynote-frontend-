<template>
  <v-layout class="mt-2 mx-2" column>
      {{this.$route.params.userId}}
  </v-layout>
</template>

<script>
import axios from 'axios'
export default {
  created () {
    axios.post('/partynote/bringProfile', this.$route.params.userId).then((res) => {
      console.log(res.data)
    })
  },
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
