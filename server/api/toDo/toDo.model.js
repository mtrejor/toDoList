'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ToDoSchema = new Schema({
  name: String
});

module.exports = mongoose.model('ToDo', ToDoSchema);