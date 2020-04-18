const { Schema, model } = require("mongoose");

const newsSchema = new Schema({
  created_at: {
    type: Date,
    get: (createdAt) => {
      return createdAt.toLocaleDateString("ru-RU", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
  text: {
    type: String,
  },
  title: {
    type: String,
  },
  user: {
    id: String,
    firstName: String,
    middleName: String,
    surName: String,
    image: String,
    userName: String,
  },
});

const News = model("news", newsSchema);

module.exports = News;
