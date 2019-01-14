const { Bookmark } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const { songId, userId } = req.query
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'an error has bccured trying to fetch the bookmark.'
      })
    }
  },
  async post (req, res) {
    try {
      const { songId, userId } = req.body
      console.log('BookmarksController:')
      console.log('req.body:', req.body)
      console.log('songId', songId)
      console.log('userId', userId)
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      if (bookmark) {
        return res.status(400).send({
          error: 'you alredy hab this set as a bookmark'
        })
      }

      const newBookmark = Bookmark.create({
        SongId: songId,
        UserId: userId
      })
      res.send(newBookmark)
    } catch (err) {
      res.status(500).send({
        error: 'an error has bccured trying to create the bookmark.'
      })
    }
  },
  async delete (req, res) {
    try {
      console.log('**** hello bookmarks delete!')
      console.log('req.params,', req.params)
      // console.log('req.user.id,', req.user.id)
      // const userId = req.user.id
      const { bookmarkId } = req.params
      console.log('bookmarkId,', bookmarkId)
      // const bookmark = await Bookmark.findById(bookmarkId)
      const bookmark = await Bookmark.findOne({
        where: {
          Id: bookmarkId
          // , UserId: userId
        }
      })
      console.log(bookmark)
      if (!bookmark) {
        return res.status(403).send({
          error: 'you do not have access to this bookmark'
        })
      }
      await bookmark.destroy()
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'an error has bccured trying to delete the bookmark.'
      })
    }
  }
}
