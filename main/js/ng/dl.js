
var app = angular.module ( 'dl', [] );
angular.module ( 'dl' ).controller( 'dlCtrl', function ( $scope, $http )
{
    var DB = window.localStorage;
    var url = 'http://oxdb.johnfmarion.com/query.php' + window.location.search;
    
    $http.get ( url ).success ( function ( data )
    {
        $scope.sr = data;
    }).error ( function ()
    {
        $scope.error = true;
    });
    
    for ( var setting in DB )
    {
        $scope [ setting ] = DB.getItem ( setting );
    }
});