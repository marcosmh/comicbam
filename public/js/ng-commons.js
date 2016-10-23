/**
 * Created by Henry on 06/08/2015.
 */

angular.module("ngCommons", [])
    .run(function($rootScope, $location){
        $rootScope.$openModalDialog = function(){
            var path = $location.path();
            if (path != "/"){
                var token = path.split("/")[1];
                var selector = "#dlg".concat(token[0].toUpperCase().concat(token.substr(1)));

                if (selector){
                    $(selector).modal('show');
                }
            }
        };
    }).directive('sbInteger', function() {
        return {
            restrict: "AC"
            ,require: 'ngModel'
            ,link: function(scope, elm, attrs, ctrl, modelCtrl) {
                elm.on("keypress", function(e){
                    if (e.keyCode < 48 || e.keyCode > 57){
                        e.preventDefault();
                    }
                });

                ctrl.$parsers.unshift(function(value) {
                    if (value==null ||value==undefined||value==''){
                        ctrl.$setValidity('integer', true);
                        return value;
                    }
                    if (INTEGER_REGEXP.test(value)) {
                        // it is valid
                        ctrl.$setValidity('integer', true);
                        return value;
                    } else {
                        // it is invalid, return undefined (no model update)
                        ctrl.$setValidity('integer', false);
                        return undefined;
                    }

                });
            }
        };
    }).directive('sbFloat', function() {
        return {
            restrict: "AC"
            ,require: 'ngModel'
            ,link: function(scope, elm, attrs, ctrl) {
                elm.on("keypress", function(e){
                    if ((e.keyCode < 48 || e.keyCode > 57) && e.keyCode != 46){
                        e.preventDefault();
                    }
                });

                ctrl.$parsers.unshift(function(viewValue) {
                    if (viewValue==null ||viewValue==undefined||viewValue==''){
                        ctrl.$setValidity('float', true);
                        return viewValue;
                    }
                    if (FLOAT_REGEXP.test(viewValue)) {
                        ctrl.$setValidity('float', true);
                        return parseFloat(viewValue.replace(',', '.'));
                    } else {
                        ctrl.$setValidity('float', false);
                        return undefined;
                    }
                });
            }
        };
    });