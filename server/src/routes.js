/*module.exports = (app) => {
  app.post('/register', (req, res) => {
    res.send({
      message: `Hello ${req.body.email}! Your user was registered! Have fun!`
    })
  })
}*/
const AuthenticationController = require('./controllers/AuthenticationController')

module.exports = (app) => {
  app.post('/register',
    AuthenticationController.register)
}
