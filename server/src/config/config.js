module.exports = {
  port: process.env.PORT || 8889,
  db: {
    database: process.env.DB_NAME || 'tabtracker',
    user: process.env.USER || 'tabtracker',
    password: process.env.DB_PASS || 'tabtracker',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './tabtracker.sqlite'
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
