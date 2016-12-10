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
        $http.jsonp('https://api.instagram.com/v1/tags/' + $scope.search + '/media/recent?client_id=4d1732cfee2f48dfb136c5c441e9984a&callback=JSON_CALLBACK')
            .success(function(response) { $scope.products = response.data;});
    };
    
    $scope.current = 0;
    $scope.updateCurrent = function(value) {
        $scope.current = value;
        clearPiture()
        document.getElementById('previewImage').style.display = 'block';
    }       
});

