const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
morgan.token("body", function (req, res) {
  const body = req.body;
  if (body) return JSON.stringify(body);
  else return {};
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body]")
);

const generateId = () => Math.floor(Math.random() * 10000000000000);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  return response.json(persons);
});

app.get("/api/info", (request, response) => {
  const timestamp = Date.now();
  const formatted = new Date(timestamp).toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "long",
  });
  return response.send(`
    <p>Phonebook has info for ${persons.length} people.<p/>
    <p>${formatted}</>
    `);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    return response.json(person);
  } else {
    return response.status(404).json({ message: "Person not found" });
  }
});

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);

  return response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const data = request.body;
  if (data.name && data.number) {
    const exists = persons.find((person) => person.name === data.name);
    if (exists)
      return response.status(400).json({ error: "Name must be unique!" });
    const newPerson = {
      name: data.name,
      number: data.number,
      id: generateId(),
    };
    persons = persons.concat(newPerson);
    return response
      .status(201)
      .json({ message: "Person created successfully!", newPerson });
  } else
    return response.status(400).json({ message: "Missing name or number." });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
