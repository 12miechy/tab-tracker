<template>
  <div>
    <v-layout>
      <v-flex xs6>
        <song-metadata :song="song" />
      </v-flex>

      <v-flex xs6>
        <panel title="Tabs" class="ml-2">
          <textarea class="textarea"
            readonly
            multi-line
            v-model="song.tab"
          ></textarea>
        </panel>
      </v-flex>
    </v-layout>

    <!-- v-layout>
      <v-flex xs6>
        <panel title="YouTube Video">
          
        </panel>
      </v-flex>
      <v-flex xs6 class="ml-2">
        <panel title="Lyrics">
          <textarea class="textarea"
            readonly
            multi-line
            v-model="song.lyrics"
          ></textarea>
        </panel>
      </v-flex>
    </v-layout -->
  </div>
</template>

<script>
import SongMetadata from './SongMetadata'
import SongsService from '@/services/SongsService'
import Panel from '@/components/Panel'

export default {
  data () {
    return {
      song: null
    }
  },
  async mounted () {
    const songId = this.$store.state.route.params.songId
    this.song = (await SongsService.show(songId)).data
  },
  components: {
    Panel
  }
}
</script>

<style scoped>
.song {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}

.song-title {
  font-size: 30px;
}

.song-artist {
  font-size: 24px;
}

.song-genre {
  font-size: 18x;
}

.album-image {
  width: 70%;
  margin: 0 auto;
}

.textarea {
  width: 100%;
  font-family: monospace;
  border: none;
  height: 260px;
  border-style: none;
  border-color: transparent;
  overflow: auto;
  padding: 40px;
}
</style>
