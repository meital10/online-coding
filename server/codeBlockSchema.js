const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const codeBlockSchema = new Schema({
  title: {
    type: String,
  },
  code: {
    type: String,
  },
  // role: {
  //   type: String,
  //   default: "student",
  //   enum: ["student", "mentor"],
  // },
});

const CodeBlock = mongoose.model("CodeBlock", codeBlockSchema);

module.exports = CodeBlock;
