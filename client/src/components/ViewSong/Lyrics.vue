<template>
  <panel title="Lyrics">
    <textarea class="textarea"
      readonly
      multi-line
      v-model="song.lyrics"
    ></textarea>
  </panel>
</template>

<script>
export default {
  props: [
    'song'
  ]
}
</script>

<style scoped>
.textarea {
  width: 100%;
  font-family: monospace;
  border: none;
  height: 300px;
  border-style: none;
  border-color: transparent;
  overflow: auto;
  padding: 40px;
}
</style>
