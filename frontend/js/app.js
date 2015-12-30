var feedbackApp = angular.module('feedbackApp', ['uiGmapgoogle-maps']);

feedbackApp.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
});

feedbackApp.controller('MainCtrl', function ($scope, $http) {
  $scope.items = [];
  $scope.average = 0.0;
  $scope.ratingLevels = [[],[],[],[],[]];
  $scope.map = { center: { latitude: 0, longitude: 0 }, zoom: 2 };

  $scope.$watch('items', function(newItems, oldItems) {
    console.log(newItems);
    var sum = 0;

    for (var i = 0; i < newItems.length; i++) {
      var item = newItems[i];

      sum += item.rating;

      $scope.ratingLevels[item.rating - 1].push(item);
    }

    $scope.average = sum / newItems.length;
  });

  $scope.getItemClass = function(index) {
    switch (index) {
      case 0: return "red-bg"; break;
      case 1: return "orange-bg"; break;
      case 2: return "dark-yellow-bg"; break;
      case 3: return "yellow-bg"; break;
      case 4: return "green-bg"; break;
      default: return "";
    }
  }

  $http.get('http://localhost:4567/data').then(function(res) {
    $scope.items = res.data;
  }, function(err) {
    console.log(err);
  });
});
