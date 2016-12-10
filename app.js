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
        $http.jsonp('https://api.instagram.com/v1/tags/' + $scope.search + '/media/recent?client_id=c127b9e50e934452830bc8d3ea161d9f&callback=JSON_CALLBACK')
            .success(function(response) { $scope.products = response.data;});
    };
    
    $scope.current = 0;
    $scope.updateCurrent = function(value) {
        $scope.current = value;
        clearPiture()
        document.getElementById('previewImage').style.display = 'block';
    }       
});

