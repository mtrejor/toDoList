'use strict';

angular.module('toDoListApp')
  .controller('ToDoCtrl', function ($scope, $http, socket) {
    $scope.toDos=[];
    $http.get('/api/toDos').success(function(toDos){
      $scope.toDos=toDos;
      socket.syncUpdates('toDo', $scope.awesomeThings);
    });
  });