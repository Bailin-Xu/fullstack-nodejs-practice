const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://xbldfs_db_user:${password}@cluster0.zaioblc.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({  //定义Schema
    content: String,
    important: Boolean,
})

const personSchema = new mongoose.Schema({  //定义Schema
    name: String,
    number: String,
})

const Note = mongoose.model('Note', noteSchema) //定义Model，对应数据库中的 notes 集合
const Person = mongoose.model('Person', personSchema) //定义Model，对应数据库中的 persons 集合

/*const note = new Note({
    content: 'HTML is easy',
    important: true,
})


note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
})


Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})
*/

if (process.argv.length === 3) {  //只提供密码，显示所有联系人
    Person.find({}).then(persons => {
        console.log('phonebook:')
        persons.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
} else if (process.argv.length === 5) { //提供密码、姓名和号码，添加联系人
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name,
        number
    })

    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    console.log('Please provide either:')
    console.log('  node mongo.js <password>')
    console.log('or')
    console.log('  node mongo.js <password> <name> <number>')
    mongoose.connection.close()
}
