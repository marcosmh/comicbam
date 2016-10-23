/**
 * Created by dzuniga on 10/09/2015.
 */
angular.module("ngUtils", [])
    .factory("$ngUtils", function($window, $location){
        //var destino = "destino";
        //return destino;
        return{
            appBase: function(){
                //return $location.protocol().concat("://").concat($location.host()).concat("/").concat($window.location.pathname.split('/')[1]);
                //return $location.protocol().concat("://").concat($location.host()).concat(":").concat($location.port());

                var page = $window.location.pathname.split('/')[0];
                if($window.location.pathname.indexOf('comicbam') > 0){
                    page = $window.location.pathname.split('/')[1];
                    return $location.protocol().concat("://").concat($location.host()).concat(":").concat($location.port()).concat("/").concat(page);
                }else{
                    return $location.protocol().concat("://").concat($location.host()).concat(":").concat($location.port()).concat(page);
                }

            }
        }
    })
    .provider("$utils", function(){
        this.$get = function($window, $location){
            return {
                round: function (number, positionDecimals) {
                    if(positionDecimals==undefined){
                        positionDecimals = 2;
                    }
                    var potencia = Math.pow(10, positionDecimals);
                    return Math.round(number * potencia) / potencia;
                }
                , appBase: function(){
                    //return $location.protocol().concat("://").concat($location.host()).concat("/").concat($window.location.pathname.split('/')[1]);
                    //return $location.protocol().concat("://").concat($location.host()).concat(":").concat($location.port());

                    var page = $window.location.pathname.split('/')[0];
                    if($window.location.pathname.indexOf('comicbam') > 0){
                        page = $window.location.pathname.split('/')[1];
                        return $location.protocol().concat("://").concat($location.host()).concat(":").concat($location.port()).concat("/").concat(page);
                    }else{
                        return $location.protocol().concat("://").concat($location.host()).concat(":").concat($location.port()).concat(page);
                    }

                }
            };
        };
    });