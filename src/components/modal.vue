<template>
  <v-dialog v-model="dialog" width="600px" scrollable
  @click:outside="closeModal"
  >
        <!-- 성질이 book일 때 다음 포스트로 이동 -->
        <template v-if="this.modalCase=='book'">
        <v-btn text fab absolute style="top:50%; right:66.5%;" class="my-auto"
        :color="pageIndex==0? 'grey':''"
        @click="showPrevPost">
        <!-- 북의 목차 0번째일때는 보이지 않는다 -->
          <v-icon>
            mdi-chevron-left
          </v-icon>
        </v-btn>
        <v-btn text fab absolute style="top:50%; left:66.5%;" class="my-auto"
        @click="showNextPost"
        :color="pageIndex+1==book.posts.length? 'grey':''"
        >
        <!-- 북의 포스트 중 마지막 포스트일때에는 보이지 않는다. -->
          <v-icon>
            mdi-chevron-right
          </v-icon>
        </v-btn>

        <v-menu offset-y
        :close-on-content-click="false"
        :close-on-click="true"
        ><!--목차-->
          <template v-slot:activator="{on}">
        <v-btn absolute max-width="120" style="z-index:30; left:66.5%" class="font-weight-black"
        v-on="on"
        >
          목차
        </v-btn>
          </template>
          <v-list dense>
                  <!-- <v-list-item @click="showThisPage(0)">
                         <v-list-item-title>첫 페이지부터 보기</v-list-item-title>
                        </v-list-item> -->
                  <!-- <v-list-item @click="showThisPage(bookMark)">
                         <v-list-item-title>북마크로 이동</v-list-item-title>
                        </v-list-item> -->
            <template v-for="(pageI,index) in book.posts">
            <v-list-item :key="index" @click="showThisPage(index)">
                <template v-if="pageIndex==index">
                <v-sheet style="height:100%; width:5px; position:absolute; left:0;"
                :color="showPage.postColor"
                ></v-sheet>
                </template>
              <v-list-item-title>
                {{index+1}}. {{pageI.postTitle}}
              </v-list-item-title>
            </v-list-item>
            <template v-if="index+1==book.posts.length">
            </template>
            <template v-else>
                  <v-divider :key="index"></v-divider>
            </template>
            </template>

          </v-list>
        </v-menu> <!--목차-->

        </template>
      <!-- 성질이 book일 때 다음 포스트로 이동 -->
        <v-card tile min-height="500px" height="50%">
          <!-- <v-card-title> -->
        <v-toolbar flat max-height="64px" color="transparent">
                <template v-if="modalCase==='book'">
                <v-sheet style="height:100%; width:5px; position:absolute; left:0;"
                :color="showPage.postColor"
                ></v-sheet>
                  <span class="title font-weight-black">{{book.bookTitle}}</span><!--책 제목-->
                  <span class="ml-2">{{showPage.postTitle}}</span><!--게시물 제목-->
                  <v-spacer></v-spacer>
                  <!-- 북마크 버튼 -->
                  <v-btn fab small
                  text :color="thisPageBookmarked? 'error':''">
                  <v-icon>{{thisPageBookmarked? 'mdi-bookmark':'mdi-bookmark-outline'}}</v-icon>
                  </v-btn>
                  </template>
                  <!-- 북마크 버튼 -->
                <template v-else>

                <span class="headline"><slot name="header"></slot></span>
                <v-spacer></v-spacer>
                <v-layout  column class="align-end mr-2" style="max-width: fit-content">
                <small class=""><slot name="boardName"></slot></small>
                <small class="grey--text">
                <slot name="recentdate"
                ></slot>
                </small>
                </v-layout>
                </template>
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
              <span class="font-weight-bold mb-3"><slot name="subtitle"></slot> {{showPage.postSubtitle}}</span>
              <slot name="contents"></slot>
              <span v-html="showPage.postContents"></span>
              </v-layout>
              <span v-if="modalCase === 'delete'">정말 이 카드를 삭제할까요?</span>
              <!-- 카드생성이 아닐 때 포스트 호출 부분 -->

              <!--책 제작 부분-->
                  <v-text-field v-if="modalCase==='makebook'"
                  label="제목"
                  v-model="bookTitle"
                  :rules="requiredRules"
                  required
                  counter="12"
                  ></v-text-field>
              <!-- 책 제작 부분 -->
              </v-card-text>

              <v-divider></v-divider>
          <v-card-actions>
            <template v-if="modalCase==='book'">
              <v-layout class="d-flex justify-center align-center">
              <small>{{pageIndex+1}}/{{book.posts.length}}</small>
              </v-layout>
            </template>
            <template v-else>
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
            <template v-if="modalCase==='makebook'">
              <v-btn class="font-weight-bold" dark depressed color="brown"
              @click="makeBook"
              >
                책 만들기..
              </v-btn>
            </template>
            <v-btn
            color="secondary darken-1"
            class="font-weight-bold"
            depressed
            dark
            @click="closeModal"
            >닫기</v-btn>
            </template>
          </v-card-actions>
        </v-card>

<v-menu offset-y v-if="modalCase==='book'">
  <template v-slot:activator="{on}" >
    <v-btn fab small depressed v-on="on" absolute
    style="left:31.5%;"
    ><v-icon>mdi-dots-vertical</v-icon></v-btn>
  </template>
  <v-col>

        <v-row>
        <v-tooltip bottom>
          <template v-slot:activator="{on}"
          >
          <v-btn style="z-index:30;" depressed fab small
          color="primary"
          v-on="on"
          >
          <v-icon>mdi-book-open-page-variant</v-icon>
          </v-btn>
          </template>
          이 책을 워드로 익스포트..
        </v-tooltip>
        </v-row>
        <v-row  class="mt-2">
        <v-tooltip bottom>
          <template v-slot:activator="{on}"
          >
          <v-btn style="z-index:30;" depressed fab small
          v-on="on"
          color="secondary"
          >
          <v-icon>mdi-book-minus-multiple</v-icon>
          </v-btn>
          </template>
          책에서 이 페이지 빼기..
        </v-tooltip>
      </v-row>
      <v-row class="mt-2">
        <v-tooltip bottom>
          <template v-slot:activator="{on}"
          >
          <v-btn style="z-index:30;" depressed fab small
          v-on="on"
          color="warning"
          >
          <v-icon>mdi-book-lock-open</v-icon>
          </v-btn>
          </template>
          책의 모든 페이지 해제..
        </v-tooltip>
        </v-row>
        <v-row class="mt-2">
        <v-tooltip bottom>
          <template v-slot:activator="{on}"
          >
          <v-btn style="z-index:30;" depressed fab small
          v-on="on"
          color="error"
          @click="deleteBook"
          >
          <v-icon>mdi-book-remove</v-icon>
          </v-btn>
          </template>
          책 삭제
        </v-tooltip>
        </v-row>

        </v-col>
</v-menu>

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
    } else if (this.modalCase === 'book') {
      this.showPage = this.book.posts[0]
    }
  },
  props: ['dialog', 'modalCase', 'editCard', 'book'],
  // book에 booktitle과 bookmark를 넘겨주어야 한다.
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
      pageIndex: 0,
      showPage: {},
      bookTitle: '',
      thisPageBookmarked: false,
      parsedText: '',
      Card: {
        // postCode: '',
        postTitle: '',
        postSubtitle: '',
        postContents: '',
        postColor: '',
        postIndex: '',
        date: ''
      }
      // post
    }
  },
  methods: {
    showPrevPost () { // 0이면
      if (this.pageIndex === 0) {

      } else {
        this.pageIndex = this.pageIndex - 1
        this.showPage = this.book.posts[this.pageIndex]
      }
    },
    showNextPost () { // length-1면
      if (this.pageIndex === this.book.posts.length - 1) {

      } else {
        this.pageIndex = this.pageIndex + 1
        this.showPage = this.book.posts[this.pageIndex]
      }
    },
    showThisPage (index) {
      this.pageIndex = index
      this.showPage = this.book.posts[index]
    },
    deleteBook () {
      this.$emit('deletebook', this.book)
    },
    makeBook () {
      this.$emit('newbook', this.bookTitle) //textinput 에서의 v-model booktitle
    },
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
.v-menu__content {
box-shadow: none !important;
}
/* .dx-htmleditor {
    border-color: #888;
    border-radius: 9px;
}
.dx-htmleditor .dx-htmleditor-toolbar-wrapper:first-child {
    border-bottom: 1px solid #888;
} */
</style>
