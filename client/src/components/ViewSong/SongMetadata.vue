<template>
  <panel title="Song Metadate" class="ml-2">
    <v-layout class="song">
      <v-flex xs6>
        <div class="song-title">
          {{song.title}}
        </div>
        <div class="song-artist">
          {{song.artist}}
        </div>
        <div class="song-genre">
          {{song.genre}}
        </div>

        <v-btn
          dark
          class="cyan"
          :to="{
            name: 'song-edit',
            params () {
              return {
                songId: song.id
              }
            }
          }">
          Edit
        </v-btn>

        <v-btn
          v-if="isUserLoggedIn && !bookmark"
          dark
          class="cyan"
          @click="setAsBookmark">
          Set AS Bookmark
        </v-btn>

        <v-btn
          v-if="isUserLoggedIn && bookmark"
          dark
          class="cyan"
          @click="unSetAsBookmark">
          Unset Bookmark
        </v-btn>
      </v-flex>
      <v-flex xs6>
        <img class="album-image" :src="song.albumImageUrl" />
        <br/>
        {{song.album}}
      </v-flex>
    </v-layout>
  </panel>
</template>

<script>
import { mapState } from 'vuex'
import BookmarkService from '@/services/BookmarkService'

export default {
  props: [
    'song'
  ],
  data () {
    return {
      bookmark: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  watch: {
    async song () {
      if (!this.isUserLoggedIn) {
        return
      }
      try {
        this.bookmark = (await BookmarkService.index({
          songId: this.song.id,
          userId: this.$store.state.user.id
        })).data
      } catch (err) {
        console.log(err)
      }
    }
  },
  methods: {
    async setAsBookmark () {
      console.log('**setAsBookmark')
      console.log('this.song.id: ', this.song.id)
      console.log('userId: ', this.$store.state.user.id)
      try {
        this.bookmark = (await BookmarkService.post({
          songId: this.song.id,
          userId: this.$store.state.user.id
        })).data
        this.bookmark = (await BookmarkService.index({
          songId: this.song.id,
          userId: this.$store.state.user.id
        })).data
        console.log('this.bookmark: ', this.bookmark)
        console.log('this.bookmark.id: ', this.bookmark.id)
      } catch (err) {
        console.log(err)
      }
    },
    async unSetAsBookmark () {
      try {
        console.log('**unSetAsBookmark')
        console.log('this.song.id: ', this.song.id)
        console.log('userId: ', this.$store.state.user.id)
        console.log('this.bookmark.id: ', this.bookmark.id)
        await BookmarkService.delete(this.bookmark.id)
        console.log('**unSetAsBookmark - end')
        this.bookmark = null
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
.song {
  padding: 20px;
  height: 300px;
  overflow: hidden;
}
.song-title {
  font-size: 30px;
}
.song-artist {
  font-size: 24px;
}
.song-genre {
  font-size: 18px;
}
.album-image {
  width: 70%;
  margin: 0 auto;
}
</style>
