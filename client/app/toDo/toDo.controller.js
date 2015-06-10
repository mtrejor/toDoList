'use strict';

angular.module('toDoListApp')
  .controller('ToDoCtrl', function ($scope, $http, socket) {
    $scope.toDos=[];
    $http.get('/api/toDos').success(function(toDos){
      $scope.toDos=toDos;
      socket.syncUpdates('toDo', $scope.awesomeThings);
    });

    $scope.addToDo = function() {
      if($scope.newToDo === '') {
        return;
      }
      $http.post('/api/toDos', { name: $scope.newToDo });
      $scope.newToDo = '';
      $http.get('/api/toDos').success(function(toDos){
      	$scope.toDos=toDos;
      	socket.syncUpdates('toDo', $scope.awesomeThings);
    	});
    };
    $scope.deleteToDo = function(toDo) {
      $http.delete('/api/toDos/' + toDo._id);
      $http.get('/api/toDos').success(function(toDos){
      	$scope.toDos=toDos;
      	socket.syncUpdates('toDo', $scope.awesomeThings);
    	});
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('toDo');
    });   
  });