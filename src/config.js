module.exports = {
  port: process.env.PORT || 3000,
  db:
    process.env.MONGO_URI ||
    process.env.MONGODB_URI ||
    "mongodb://localhost:27017/booksapi",
  secret: "supersecretkey",
  valid_token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImthdGh5IiwiY3NyZiI6IjBlMjU4YWE1LTY4NjUtNDQ5OC1iNmRlLWU3MzE0NmU0ZWIzYyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTUyOTQxMzgyNSwiZXhwIjoxNTI5NDU3MDI1fQ.v10LYa9TMZCNHPaQCtLYs2VFhhl803vpBpHVWctjcEY"
};
