<template>
  <DxHtmlEditor
    :media-resizing="enabled"
    :height="550"
  >
    <DxToolbar>
      <DxItem format-name="undo"/>
      <DxItem format-name="redo"/>
      <!-- <DxItem format-name="separator"/> -->
      <DxItem
        :format-values="sizeValues"
        format-name="size"
      />
      <!-- <DxItem
        :format-values="fontValues"
        format-name="font"
      /> -->
      <DxItem format-name="separator"/>
      <DxItem format-name="bold"/>
      <DxItem format-name="italic"/>
      <!-- <DxItem format-name="strike"/>
      <DxItem format-name="underline"/> -->
      <DxItem format-name="separator"/>
      <DxItem format-name="alignLeft"/>
      <DxItem format-name="alignCenter"/>
      <DxItem format-name="alignRight"/>
      <DxItem format-name="alignJustify"/>
      <!-- <DxItem format-name="separator"/> -->
      <!-- <DxItem
        :format-values="headerValues"
        format-name="header"
      /> -->
      <!-- <DxItem format-name="separator"/>
      <DxItem format-name="orderedList"/>
      <DxItem format-name="bulletList"/>
      <DxItem format-name="separator"/>
      <DxItem format-name="color"/>
      <DxItem format-name="background"/>
      <DxItem format-name="separator"/>
      <DxItem format-name="link"/>
      <DxItem format-name="image"/>
      <DxItem format-name="separator"/> -->
      <!-- <DxItem format-name="clear"/>
      <DxItem format-name="codeBlock"/>
      <DxItem format-name="blockquote"/> -->
    </DxToolbar>

    <div v-html="data"/>
  </DxHtmlEditor>
</template>
<script>

import {
  DxHtmlEditor,
  DxToolbar,
  DxItem
} from 'devextreme-vue/html-editor'

export default {
  components: {
    DxHtmlEditor,
    DxToolbar,
    DxItem
  },
  data () {
    return {
      data: '',
      sizeValues: ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'],
      fontValues: ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana'],
      headerValues: [false, 1, 2, 3, 4, 5],
      enabled: {
        enabled: true
      }
    }
  }
}
</script>
<style>
.dx-htmleditor-content img {
    vertical-align: middle;
    padding-right: 10px;
}
</style>
