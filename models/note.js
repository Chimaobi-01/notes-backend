const mongoose = require('mongoose');

mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI

console.log("connecting to ", url.split('+')[0]);


mongoose.connect(url)
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.log('Error connecting to MongoDB ', error))


const noteSchema = new mongoose.Schema({ 
  content: {
    type: String,
    minLength: 5,
    required: true
  }, 
  important: Boolean,
 })
noteSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)