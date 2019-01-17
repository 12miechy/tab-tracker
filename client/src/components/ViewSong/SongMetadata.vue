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
import BookmarksService from '@/services/BookmarksService'

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
      'isUserLoggedIn',
      'user'
    ])
  },
  watch: {
    async song () {
      if (!this.isUserLoggedIn) {
        return
      }
      try {
        const bookmarks = (await BookmarksService.index({
          songId: this.song.id
          // , userId: this.$store.state.user.id
        })).data
        if (bookmarks.length) {
          this.bookmark = bookmarks[0]
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  methods: {
    async setAsBookmark () {
      console.log('**setAsBookmark')
      console.log('this.song.id: ', this.song.id)
      // console.log('userId: ', this.user.id)
      try {
        this.bookmark = (await BookmarksService.post({
          songId: this.song.id
          // , userId: this.$store.state.user.id
        })).data
        console.log('****BookmarksService.post')
        const bookmarks = (await BookmarksService.index({
          songId: this.song.id
          // , userId: this.$store.state.user.id
        })).data
        console.log('****BookmarksService.index')
        if (bookmarks.length) {
          this.bookmark = bookmarks[0]
        }
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
        // console.log('userId: ', this.user.id)
        console.log('this.bookmark.id: ', this.bookmark.id)
        await BookmarksService.delete(this.bookmark.id)
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
