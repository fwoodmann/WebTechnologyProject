const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/modulehandbook_db'
const mongoose = require('mongoose')
const User = require('../../models/user')
mongoose.Promise = global.Promise
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const seedUsers = require('./seedUser')

function openUserOverview() {
  if (/localhost/.test(mongoURI)) {
    const open = require('open')
    open('http://localhost:3002/users')
  }
}


User.deleteMany({})
  .then(() => {
    console.log('all Users deleted')
  })
  .then(() => {
    return User.create(userData)
  })
  .catch(error => console.log(error.message))
  .then(createdUser => {
    console.log(createdUser.length + ' Users created')
    mongoose.connection.close()
    openUserOverview()
  })