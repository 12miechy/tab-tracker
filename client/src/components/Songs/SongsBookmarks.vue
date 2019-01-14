<template>
  <panel title="SongsBookmarks">
    <v-data-table
      :headers="headers"
      :pagination.sync="pagination"
      :items="bookmarks">
      <template slot="items" scope="props">
        <td class="text-xs-right">
          {{props.item.title}}
        </td>
        <td class="text-xs-right">
          {{props.item.artist}}
        </td>
      </template>
    </v-data-table>
  </panel>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        {
          text: 'Title',
          value: 'title'
        },
        {
          text: 'Artist',
          value: 'artist'
        }
      ],
      pagination: [
        {
          sortBy: 'date',
          descending: true
        }
      ],
      bookmarks: [
        {
          title: 'hello world1',
          artist: 'testing1'
        },
        {
          title: 'hello world2',
          artist: 'testing2'
        }
      ]
    }
  }
}
</script>

<style>
</style>
