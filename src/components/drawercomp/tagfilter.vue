<template>
    <v-layout class="px-5 my-3" column>
      <v-layout class="mb-2">
        <span class="body-1 font-weight-bold">Tags</span>
        <v-spacer></v-spacer>
        <v-icon small>mdi-pencil</v-icon> <!--click: select your component popup-->
        </v-layout>

    <v-layout>
        <div class="">
      <template v-for="(item,index) in items"
      >
      <v-chip class="ma-1" small dark :key="index" :color="randomColor()">
          {{item}}
      </v-chip>
      </template>
        </div>
    </v-layout>

  </v-layout>
</template>

<script>
export default {
  created () {
  },
  data () {
    return {
      items: [
        '태그 1',
        '새로운 빵',
        '핫플레이스',
        '청담동',
        '맛집카페',
        '달고나커피',
        '먹어봤냐',
        '독특한',
        '유니크',
        '압도적으로',
        '압박감 있는',
        '신규'
      ]
    }
  },
  methods: {
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
    }
  }
}
</script>

<style>

</style>
