<template>
  <!-- 바 있어야하고 -->
  <!-- 플렉스에 슬라이더 -->

<v-layout class="d-flex justify-center" fill-height>

      <v-carousel
      cycle
      height="100%"
      hide-delimiter-background
      show-arrows-on-hover
      class="ma-auto"
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
        @click="goUrl(slide)"
      >
        <v-sheet
          :color="colors[i]"
          height="100%"
          tile
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="display-3"
            >{{ slide }}</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

</v-layout>
</template>

<script>
export default {
  data () {
    return {
      OpenModal: false,
      colors: [
        'grey',
        'grey',
        'grey',
        'grey',
        'grey'
      ],
      slides: [
        'Party Note Overline',
        'Get Own Property for Writing!',
        'Join And Create Your Contents With your Friends!',
        'Show Scheduler',
        'Show Timeline'
      ]
    }
  },
  methods: {
    goUrl (slide) {
      console.log('this is ' + slide)
      // 스위치 케이스 구문으로 링크 리디렉션 해주자.
    }
  }
}
</script>

<style>

</style>
