import Api from '@/services/Api'

export default {
  index (bookmark) {
    return Api().get('bookmarks', {
      params: {
        params: bookmark
      }
    })
  },
  post (bookmark) {
    return Api().post('bookmarks', {
      params: {
        params: bookmark
      }
    })
  },
  delete (bookmarkId) {
    return Api().get(`bookmarks/${bookmarkId}`)
  }
}
