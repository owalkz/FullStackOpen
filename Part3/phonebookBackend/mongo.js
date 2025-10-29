const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://jjaraorie:${password}@joelcluster.rtzrui8.mongodb.net/phonebookApp`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 2) {
  console.log('Give all arguments. Password, name, and number')
  process.exit(1)
} else if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name, person.number)
      mongoose.connection.close()
    })
  })
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  const person = new Person({
    name,
    number,
  })

  person.save().then(() => {
    console.log('Person saved successfully!')
    mongoose.connection.close()
  })
}
