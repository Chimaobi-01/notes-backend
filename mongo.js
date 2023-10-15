const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log("give password as an argument");
    process.exit(1)
}


const password = encodeURIComponent(process.argv[2])
const url = `mongodb+srv://chimaobi01:${password}@cluster0.fyuntux.mongodb.net/noteApp?retryWrites=true&w=majority`


mongoose.set('strictQuery', false)
mongoose.connect(url)


const noteSchema = new mongoose.Schema({ content: String, important: Boolean, })
const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//     content: "CSS is an art",
//     important: true,
// }
// )
// note.save().then((result) => {
//     console.log('note saved', result);
//     mongoose.connection.close()
// })

Note.find({}).then(result => {
    result.forEach(note => console.log(note))
    mongoose.connection.close()
})
