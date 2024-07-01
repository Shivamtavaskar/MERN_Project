const mongoose = require("mongoose")

mongoose
  .connect("mongodb://localhost:27017/todo-app", { })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


  const TodoItemSchema = new mongoose.Schema({

    task :{
        type : String,
        required : true,
    }
  });


module.exports = mongoose.model("TodoItem", TodoItemSchema);