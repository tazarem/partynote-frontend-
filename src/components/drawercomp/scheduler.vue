<template>
 <v-layout column class="px-5 my-3">
    <!-- 입력 노드에 따라 값이 달라지기
     1.d-day
     2.To do
     3.month
     4.week
     5.day
     6.연도 목표와 글귀 ( 폰트 설정 자유 )
     7.연별 해야할일 목록을 통해 연별 성취도 확인

      -->
    <!-- D-day  -->
    <v-layout class="mb-2">
        <span class="body-1 font-weight-bold">Scheduler</span>
        <v-spacer></v-spacer>
        <v-icon small>mdi-pencil</v-icon> <!--click: select your component popup-->
        </v-layout>
    <template v-if="edit_mode">
        <v-card width="100%" class="d-flex flex-column">
            <v-toolbar dense flat dark :color="themeColor">
            <v-icon small class="mr-3">mdi-cake</v-icon>
            <span class="body-2 font-weight-medium mt-1">Input your D - day!</span>
            </v-toolbar>
            <v-card-text>
                <!-- 여기다가 늘어나는 인풋들 넣기 -->
                <template v-for="(item, index) in d_days">
                    <v-row :key="index" class="py-0 d-flex justify-space-around mb-3 mx-1">
                    <v-col cols="8" class="pa-0">
                    <v-text-field
                    :value="item"
                    dense
                    hide-details
                    :color="themeColor"
                    >
                    </v-text-field>
                    </v-col>
                    <v-col class="pa-0 d-flex justify-end">

                        <v-icon :color="themeColor" class="mr-1">mdi-calendar</v-icon>

                        <v-icon :color="themeColor" @click="deleteItem(index)">mdi-close</v-icon>

                    </v-col>
                    </v-row>
                </template>
                <v-btn depressed small dark
                :color="themeColor"
                width="100%"
                @click="addOne"
                >Add One</v-btn>
            </v-card-text>
        </v-card>
        <v-btn class="mt-3" small >save</v-btn>
    </template>

 </v-layout>
</template>

<script>
export default {
  created () {
    this.themeColor = this.randomColor()
    // 디데이 목록을 ajax로 가져옵니다.
  },
  data () {
    return {
      edit_mode: true,
      d_days: [],
      themeColor: ''
    }
  },
  methods: {
    addOne () {
      // 비어있는 인풋을 생성
      this.d_days.push('')
    },
    deleteItem (index) {
      this.d_days.splice(index, 1)
    },
    calcDday () {
      // 현 날짜로부터 디데이를 계산합니다.
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
    }
  }
}
</script>

<style>

</style>
