<template>
  <v-dialog v-model="dialog" width="600px" scrollable
  @click:outside="closeModal"
  >
        <!-- <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
        </template> -->

        <!-- 성질이 book일 때 다음 포스트로 이동 -->
        <template v-if="PostPagenationActive">
        <v-btn text fab absolute style="top:50%; right:66.5%;" class="my-auto"
        @click="showPrevPost">
        <!-- 북의 목차 0번째일때는 보이지 않는다 -->
          <v-icon>
            mdi-chevron-left
          </v-icon>
        </v-btn>
        <v-btn text fab absolute style="top:50%; left:66.5%;" class="my-auto"
        @click="showNextPost">
        <!-- 북의 포스트 중 마지막 포스트일때에는 보이지 않는다. -->
          <v-icon>
            mdi-chevron-right
          </v-icon>
        </v-btn>
        </template>
      <!-- 성질이 book일 때 다음 포스트로 이동 -->

        <v-card tile min-height="500px" height="50%">
          <!-- <v-card-title> -->
        <v-toolbar flat max-height="64px" color="transparent">
                <span class="headline"><slot name="header"></slot></span>
                <v-spacer></v-spacer>
                <v-layout  column class="align-end mr-2" style="max-width: fit-content">
                <small class=""><slot name="boardName"></slot></small>
                <small class="grey--text">
                <slot name="recentdate"
                ></slot>
                </small>
                </v-layout>
                <v-btn fab text small @click="closeModal"><v-icon>mdi-close</v-icon></v-btn>
        </v-toolbar>
          <!-- </v-card-title> -->
          <v-divider></v-divider>

          <!-- 생성 모드일 때  -->
          <v-card-text class="mt-3" :style="modalCase==='create'?'overflow:hidden;':''">
              <v-form
              ref="form"
              v-model="valid"
              v-if="modalCase==='create'||modalCase==='edit'"
              >
                  <v-text-field
                  label="제목"
                  v-model="Card.postTitle"
                  :rules="requiredRules"
                  required
                  counter="12"
                  >
                  </v-text-field>
                  <v-text-field
                  label="부제목"
                  v-model="Card.postSubtitle"
                  >
                  </v-text-field>
  <!-- height:550 -->
  <DxHtmlEditor
    :media-resizing="enabled"
    :height="550"
    v-model="Card.postContents"
  >
    <DxToolbar>
      <DxItem format-name="undo"/>
      <DxItem format-name="redo"/>
      <DxItem
        :format-values="sizeValues"
        format-name="size"
      />
      <!-- <DxItem format-name="separator"/> -->
      <DxItem format-name="bold"/>
      <DxItem format-name="italic"/>
      <!-- <DxItem format-name="separator"/> -->
      <DxItem format-name="alignLeft"/>
      <DxItem format-name="alignCenter"/>
      <DxItem format-name="alignRight"/>
      <DxItem format-name="alignJustify"/>
    </DxToolbar>

    <div v-html="this.Card.postContents" >
    </div>
  </DxHtmlEditor>

                  <!-- <v-textarea
                    filled
                    v-model="Card.contents"
                    background-color=""
                    height="540"
                    no-resize
                    counter="5000"
                  ></v-textarea> -->
              </v-form>
              <!-- 카드생성이 아닐 때 포스트 호출 부분 -->
              <v-layout column>
              <span class="font-weight-bold mb-3"><slot name="subtitle"></slot></span>
              <slot name="contents"></slot>
              </v-layout>
              <span v-if="modalCase === 'delete'">정말 이 카드를 삭제할까요?</span>
              <!-- 카드생성이 아닐 때 포스트 호출 부분 -->
              </v-card-text>
              <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- 생성 모드일 때의 버튼 -->
            <template v-if="modalCase==='create'">
            <small v-if="!valid" class="error--text mr-3">
            제목을 꼭 입력해주세요!
            </small>
            <v-btn
            class="font-weight-bold"
            dark
            depressed
            :color="valid? 'blue':'error'"
            @click="newCard"
            v-if="valid"
            >
            새 카드..
            </v-btn>
            </template>
            <slot name="footerButton"></slot>
            <v-btn color="error" depressed v-if="modalCase==='edit'" @click="doEditPost">
              수정
            </v-btn>
            <v-btn
            color="secondary darken-1"
            class="font-weight-bold"
            depressed
            dark
            @click="closeModal"
            >닫기</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>
import {
  DxHtmlEditor,
  DxToolbar,
  DxItem
} from 'devextreme-vue/html-editor'
export default {
  created () {
    if (this.modalCase === 'edit') {
      this.Card = this.editCard
    }
  },
  props: ['dialog', 'modalCase', 'editCard'],
  // book일 때에는 모달케이스에서 넘겨주면 댐.
  components: {
    DxHtmlEditor,
    DxToolbar,
    DxItem
  },
  data () {
    return {
      valid: true, // 포스트 생성 폼
      requiredRules: [
        v => !!v || '필수입니다.'
      ],

      sizeValues: ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'],
      fontValues: ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana'],
      headerValues: [false, 1, 2, 3, 4, 5],
      enabled: {
        enabled: true
      },
      parsedText: '',
      Card: {
        // postCode: '',
        postTitle: '',
        postSubtitle: '',
        postContents: '',
        postColor: '',
        postIndex: '',
        date: ''
      },
      // post
      PostPagenationActive: false
    }
  },
  methods: {
    newCard () {
      this.$emit('newcard', this.Card)
    },
    closeModal () {
      this.$emit('close')
    },
    doEditPost () {
      console.log(this.Card)
      this.$emit('doedit', this.Card)
      this.closeModal()
    }
  }
}
</script>

<style>
/* .dx-htmleditor {
    border-color: #888;
    border-radius: 9px;
}
.dx-htmleditor .dx-htmleditor-toolbar-wrapper:first-child {
    border-bottom: 1px solid #888;
} */
</style>
