<template>
  <panel title="YouTube Video">
    <youtube
      :video-id="youtubeId"
      :player-width="600"
      :player-height="296"
    >
    </youtube>
  </panel>
</template>

<script>
export default {
  props: [
    'youtubeId'
  ]
}
</script>

<style scoped>
</style>
