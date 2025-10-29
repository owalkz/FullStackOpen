const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.ONLINE_MONGO_URI

mongoose
  .connect(url)
  .then(() => console.log('Connected to database.'))
  .catch(() => console.log('An error occurred while connecting to database.'))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    required: true,
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: (digits) => {
        return /^\d{2,3}-\d+$/.test(digits)
      },
      message: (props) =>
        `${props.value} is not a valid number format! Expected XX-XXXX or XXX-XXXX.`,
    },
    required: true,
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
