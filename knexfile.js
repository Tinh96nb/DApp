const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  development: {
    client: process.env.DB_CONNECTION || 'mysql',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_DATABASE || 'document',
      port: process.env.DB_PORT || '3306',
      charset: 'utf8mb4'
    },
    pool: {
      min: 2,
      max: 10
    }
  }
}
