/**
 * Created by nader on 27/07/16.
 */
(function () {
    'use strict'; //for clean code and errors



    var w = angular.module("WeatherApp",  ['ngMaterial','ngSanitize' ]);
     w.controller("ListController", ['$scope', '$http', function ($scope, $http) {

            $scope.results ;


            $scope.isSearching = false;

            $scope.cityname = '';
         $scope.checkCon = false;

        $scope.codeAddress = function(address) {
            console.log('hoa');
            geocoder.geocode({address: address}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);//center the map over the result
                    //place a marker at the location
                    var marker = new google.maps.Marker(
                            {
                                map: map,
                                position: results[0].geometry.location
                            });
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });

        }

            $scope.search = function () {
                $scope.isSearching = true;
                $http.get("http://api.openweathermap.org/data/2.5/weather?q="+$scope.cityname+"&APPID=a574e71530f7067061869ace1afb937d&&mode=html").success(function (data) {
                    $scope.myhtml = data.replace('&quot;', '"');
					$scope.isSearching = false;

                    console.log(data, "data retured from api")
                    $scope.checkCon = true;
                    $scope.codeAddress($scope.cityname);



                }).error(function (error) {
                    console.error(error);
                    $scope.isSearching = false;
                });
            }
        }]);


}());
