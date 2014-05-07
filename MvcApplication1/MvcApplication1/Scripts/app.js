var TodoApp = angular.module('TodoApp', ['ngRoute','ngResource']).config(function ($routeProvider) {

    $routeProvider.when('/',
    {
        templateUrl: 'list.html',
        controller: 'ListController'
    });
    $routeProvider.when('/new',
    {
        templateUrl: 'add.html',
        controller: 'AddNewController'
    });
    $routeProvider.when('/edit/:editId',
  {
      templateUrl: 'add.html',
      controller: 'EditController'
  });
});


//TodoApp.controller('ListController', [
//    '$scope', '$resource', function($scope, $resource) {
//        var todoes = $resource('/api/Todo/:id', { id: "@id" }, {});
//        $scope.todoes = todoes.query();
//    }]);

//var Delete = function () {

//    var itemId = this.todo.id;
//    todoes.delete({ id: itemId });
//}



        TodoApp.factory('Todo', function ($resource) {
            return $resource('/api/Todo/:id', { id: '@id' }, { update: { method: 'PUT' } });
        });

        var ListController = function ($scope, $location, Todo) {
            $scope.todoes = Todo.query();

            $scope.Delete = function() {

               
                var itemId = this.todo.TodoItemId;
                Todo.delete({ id: itemId });
                $scope.todoes = Todo.query();

            }
        };

    var EditController = function($scope, $location, $routeParams, Todo) {

       
        $scope.action = 'Update';
        var editItemId = $routeParams.editId;
        $scope.todo = Todo.get({ id: editItemId });


        $scope.save = function() {
            Todo.update({ id: editItemId }, $scope.todo, function () {
                $location.path('/');
            });
        }
    }


    var AddNewController = function ($scope, $location, Todo) {

        $scope.action = 'Add';
        $scope.save = function () {
                Todo.save($scope.todo, function() {

                    $location.path('/');

                });
            }
        }