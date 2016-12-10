var app = angular.module('puzzleGame', ['ngSanitize']);
    
app.controller('ImageController', function($scope, $http) {
    if($scope.search === undefined){
        $scope.search = "dogsofinstagram";
        fetch();
    }
  
    var pendingTask;
    $scope.change = function(){
        if(pendingTask) {
            clearTimeout(pendingTask);
        }
        pendingTask = setTimeout(fetch, 800);
    };
    
    function fetch(){
         $http.jsonp('https://api.instagram.com/v1/users/639615785/media/recent/?access_token=639615785.c127b9e.1d2e8ab6cc024d0a90f7ba7ad4cca66c&callback=JSON_CALLBACK')
            .success(function(response) { $scope.products = response.data;});
    };
    
    $scope.current = 0;
    $scope.updateCurrent = function(value) {
        $scope.current = value;
        clearPiture()
        document.getElementById('previewImage').style.display = 'block';
    }       
});

