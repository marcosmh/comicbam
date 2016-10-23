/**
 * Created by dzuniga on 07/08/2015.
 */
angular.module("ngAlert", ["ngUtils"])
    .provider("$ngAlert", function(){
        var templateUrl = "/lib/js/ng-alert/ng-alert.html";

        this.$get = function($q, $templateCache, $http, $window, $timeout, $ngUtils){
            var urlBase = $ngUtils.appBase();
            templateUrl = urlBase.concat(templateUrl);

            var body = angular.element($window.document.body);
            var localHandler = undefined;
            var modalBody = undefined;
            var $modal = undefined;

            fetchTemplate().then(function(t){
                this.modal = angular.element(t)[0];
                $modal = $(this.modal);
                this.modalHeader = $(".modal-header", modal);
                this.title = $(".modal-title", modalHeader);
                this.icon = $(".glyphicon", modalHeader);
                modalBody = $(".modal-body", modal);
                this.modalFooter = $(".modal-footer", modal);
                this.btnCancel = $(".btn-cancel", modalFooter);
                this.btnOk = $(".btn-ok", modalFooter);
            });

            function fetchTemplate(){
                return $q.when($templateCache.get(templateUrl) || $http.get(templateUrl)).then(function(response) {
                    if(angular.isObject(response)) {
                        $templateCache.put(templateUrl, response.data);
                        return response.data;
                    }
                    return response;
                });
            };

            function showAlert(text, handler, options){
                //Colocar el texto del mensaje.
                if(modalBody != undefined)
                    modalBody.html(text);
                modalFooter.show();

                //Ocultar boton cancelar.
                btnCancel.hide();

                if (handler){
                    if (angular.isFunction(handler)){
                        localHandler = handler;
                    }else{
                        localHandler = function(){
                            $(modal).modal("hide");
                            $timeout(function(){
                                $(handler).focus();
                            }, 100);

                        };
                    }
                }else{
                    localHandler = function(){
                        $(modal).modal("hide");
                    };
                }

                if (localHandler && angular.isFunction(localHandler)){
                    btnOk.unbind("click");
                    btnOk.click(function(){
                        localHandler(modal);
                        localHandler == undefined;
                    });
                }

                //Clases
                title.html("Mensaje del sistema");
                title.css.color='#000';
                $modal.attr({class: "modal ".concat(" " + options.modalClass)});
                icon.attr({class: "pull-left ".concat(options.icon)/*.concat(" " + options.textClass)*/});
                btnOk.attr({class: "btn btn-ok ".concat(options.btnClass)});

                if(options.classHeader)
                    $(modalHeader).addClass(options.classHeader);
                if(options.classBody)
                    $(modalBody).addClass(options.classBody);

                btnOk.html("Aceptar");
                btnCancel.html("Cancelar");

                //Mostrar el dialog.
                $timeout(function(){
                    if (!$(modalBody).is(':visible')){
                        $(modal).modal("show");
                        btnOk.focus();
                    }
                }, 100);
            }

            return {
                working: function(show){
                    if (show == undefined || show === true){
                        if (modalBody) {
                            showAlert('El sistema esta trabajando, espere un momento por favor.',
                                {
                                 classHeader:'modal-working'
                                },
                                {
                                 icon: "fa fa-spinner fa-spin", modalClass: "modal-primary", textClass: "none", btnClass: "btn-success"
                                });
                            title.html("Trabajando.");
                            modalFooter.hide();
                        }
                    }else{
                        if($modal != undefined){
                            $($modal).modal("hide");
                        }
                    }
                    $(this.modalHeader).addClass('modal-working');
                    $(modalBody).addClass('modal-working');
                    $(this.modalFooter).addClass('bg-contenido-alertas');
                }
                ,warning: function(text, handler){
                    showAlert(text, handler, {
                        icon: "glyphicon glyphicon-warning-sign"
                        //,modalClass: "modal-warning"
                        ,textClass: "text-warning"
                        ,btnClass: "btn-warning"
                        ,classHeader:'modal-warning'

                    });

                    $(this.modalHeader).addClass('modal-warning');
                    $(modalBody).addClass('modal-warning');
                    $(this.modalFooter).addClass('bg-contenido-alertas');


                    title.html("Mensaje de advertencia");
                }
                ,info: function(text, handler){
                    showAlert(text, handler, {
                        icon: "glyphicon glyphicon-info-sign"
                        //,modalClass: "modal-succes"
                        ,textClass: "text-info"
                        ,btnClass: "btn-default"
                        ,classHeader:'modal-info'
                    });
                    $(this.modalHeader).addClass('modal-succes');
                    $(modalBody).addClass('modal-succes');
                    $(this.modalFooter).addClass('bg-contenido-alertas');

                    title.html("Mensaje de informaci&oacute;n");
                }
                /**
                 * Muestra una pantalla modal de tipo <b>SUCCESS</b>.
                 * @param text {string} mensaje de texto a mostrar, puede incluir código <b>HTML</b>
                 * @param handler {string | object | element | function} tareas que deben ejecutarse cuando se
                 * oprima el boton OK, si es parametro es una cadena, un objeto jquery o un elemento HTML se enviará el foco
                 * al elemento HTML al que hace referencia, si el parametro es una función se ejecurá esta función al oprimir
                 * el botón OK pasandole el parametro del objeto modal que se esta ejecutando.
                 */
                ,success: function(text, handler){
                    showAlert(text, handler, {
                        icon: "glyphicon glyphicon-ok"
                        //,modalClass: "modal-success"
                        ,textClass: "text-success"
                        ,btnClass: "btn-success"
                        ,classHeader:'modal-succes'
                    });

                    $(this.modalHeader).addClass('modal-succes');
                    $(modalBody).addClass('modal-succes');
                    $(this.modalFooter).addClass('bg-contenido-alertas');

                    title.html("Mensaje del sistema.");
                }
                /**
                 * Muestra una pantalla modal de tipo <b>CONFIRMACIÓN</b>.
                 * @param text {string} mensaje de texto a mostrar, puede incluir código <b>HTML</b>
                 * @param handler {string | object | element | function} tareas que deben ejecutarse cuando se
                 * oprima el boton OK, si es parametro es una cadena, un objeto jquery o un elemento HTML se enviará el foco
                 * al elemento HTML al que hace referencia, si el parametro es una función se ejecurá esta función al oprimir
                 * el botón OK pasandole el parametro del objeto modal que se esta ejecutando.
                 * @param options { btnCancel: {string}, btnOk: {string} } Titulos de los botones para ser mostrados en
                 * el dialogo de confirmación
                 */
                ,confirm: function(text, handler, options){
                    showAlert(text, handler, {});

                    //Seteo de los titulos del los botones de confirmación.
                    if(options && options.btnCancel){
                        btnCancel.html(options.btnCancel);
                    }else{
                        btnCancel.html("Cancelar");
                    }

                    if(options && options.btnOk){
                        btnOk.html(options.btnOk);
                    }else{
                        btnOk.html("Aceptar");
                    }

                    $(this.modalHeader).addClass('modal-succes');
                    $(modalBody).addClass('modal-succes');
                    $(this.modalFooter).addClass('bg-contenido-alertas');

                    //Mostrar boton cancelar.
                    btnCancel.show();

                    //Clases
                    title.html("Confirmación");
                    $modal.attr({class: "modal modal-default"});
                    icon.attr({class: "pull-left glyphicon glyphicon-question-sign"});
                    btnOk.attr({class: "btn btn-ok"});
                }
                /**
                 * Muestra una pantalla modal de tipo <b>PELIGRO</b>.
                 * @param text {string} mensaje de texto a mostrar, puede incluir código <b>HTML</b>
                 * @param handler {string | object | element | function} tareas que deben ejecutarse cuando se
                 * oprima el boton OK, si es parametro es una cadena, un objeto jquery o un elemento HTML se enviará el foco
                 * al elemento HTML al que hace referencia, si el parametro es una función se ejecurá esta función al oprimir
                 * el botón OK pasandole el parametro del objeto modal que se esta ejecutando.
                 */
                ,danger: function(text, handler){
                    showAlert(text, handler, {
                        icon: "glyphicon glyphicon-remove-circle"
                    //    ,modalClass: "modal-danger"
                        ,textClass: "text-danger"
                        ,btnClass: "btn-danger"
                        ,classHeader:'modal-danger'
                    });
                    $(this.modalHeader).addClass('modal-danger');
                    $(modalBody).addClass('modal-danger');
                    $(this.modalFooter).addClass('bg-contenido-alertas');

                    title.html("Mensaje de error");
                }
            }
        }
    });