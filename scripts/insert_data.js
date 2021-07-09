db = connect("localhost:27017/admin");
db.auth("root", "playground");

db = db.getSiblingDB("pgblog");

const samples = [
  {
    image: "https://avatars.githubusercontent.com/u/17609064?v=4",
    name: "Mimikyu",
    likes: 0,
    dislikes: 0,
  },
  {
    image: "https://avatars.githubusercontent.com/u/1983338?v=4",
    name: "Pairi",
    likes: 0,
    dislikes: 0,
  },
  {
    image: "https://avatars.githubusercontent.com/u/20296205?v=4",
    name: "Yadoran",
    likes: 0,
    dislikes: 0,
  },
  {
    image: "https://avatars.githubusercontent.com/u/17609064?v=4",
    name: "Pikachu",
    likes: 0,
    dislikes: 0,
  },
];

const employees = [
  {
    image: "https://avatars.githubusercontent.com/u/17609064?v=4",
    name: "Suhyuk Lee",
    position: "MLOps Engineer",
    speaking: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    image: "https://source.unsplash.com/jzY0KRJopEI/460x460",
    name: "Anonymous Unsplasher",
    position: "Genius Engineer",
    speaking:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
  },
];

for (let sample of samples) {
  db.products.updateOne(
    { name: sample.name },
    {
      $set: { ...sample },
    },
    { upsert: true }
  );
}

for (let employee of employees) {
  db.employees.updateOne(
    { name: employee.name },
    {
      $set: { ...employee },
    },
    { upsert: true }
  );
}
