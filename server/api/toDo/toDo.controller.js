'use strict';

var _ = require('lodash');
var ToDo = require('./toDo.model');

// Get list of toDos
exports.index = function(req, res) {  
  ToDo.find(function (err, toDos) {
    if(err) { return handleError(res, err); }
    return res.json(200, toDos);
  });
};

// Get a single toDo
exports.show = function(req, res) {
  ToDo.findById(req.params.id, function (err, toDo) {
    if(err) { return handleError(res, err); }
    if(!toDo) { return res.send(404); }
    return res.json(toDo);
  });
};

// Creates a new toDo in the DB.
exports.create = function(req, res) {
  console.log(req);
  ToDo.create(req.body, function(err, toDo) {
    if(err) { return handleError(res, err); }
    return res.json(201, toDo);
  });
};

// Updates an existing toDo in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  ToDo.findById(req.params.id, function (err, toDo) {
    if (err) { return handleError(res, err); }
    if(!toDo) { return res.send(404); }
    var updated = _.merge(toDo, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, toDo);
    });
  });
};

// Deletes a toDo from the DB.
exports.destroy = function(req, res) {
  ToDo.findById(req.params.id, function (err, toDo) {
    if(err) { return handleError(res, err); }
    if(!toDo) { return res.send(404); }
    toDo.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}