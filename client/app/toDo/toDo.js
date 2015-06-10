'use strict';

angular.module('toDoListApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/toDo', {
        templateUrl: 'app/toDo/toDo.html',
        controller: 'ToDoCtrl'
      });
  });
