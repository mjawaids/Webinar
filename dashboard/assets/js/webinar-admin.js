(function(){

    var app = angular.module('WebinarAdmin', []);

    // Initialize the admin name
    app.run(function ($rootScope) {
        $rootScope.adminName = 'Admin'; //global variable
        $rootScope.viewerName = '';
    });

    /*
    * WebSocket Service to provide communication with server
    */
    app.factory('WSService', function() {
        var service = {};

        service.connect = function() {
        if(service.ws) { return; }

        // NOTE: Update the URL when deployed
        var ws = new WebSocket("ws://localhost:8080");

        ws.onopen = function() {
          console.log("Succeeded to open a connection");
        };

        ws.onerror = function() {
          console.log("Failed to open a connection");
        }

        ws.onmessage = function(message) {
          service.callback(message.data);
        };

        service.ws = ws;
        }

        service.send = function(message) {
            service.ws.send(message);
        }

        service.subscribe = function(callback) {
            service.callback = callback;
        }

        return service;
    });

    /*
    * Filter to substitute admin variables within script
    */
    app.filter('replaceAdmin', ['$rootScope',
      function($rootScope) {
        return function(input) {
          input = input || '';
          return input.replace(/\$admin/gi, $rootScope.adminName);
        };
      }
    ]);

    /*
    * Filter to substitute admin variables within script
    */
    app.filter('replaceViewer', ['$rootScope',
      function($rootScope) {
        return function(input) {
          input = input || '';
          return input.replace(/\$viewer/gi, $rootScope.viewerName);
        };
      }
    ]);

    /*
    * Script controller to show script and handle keyboard navigation.
    */
    app.controller('ScriptController', ['$http', '$rootScope', '$log', 'WSService', function($http, $rootScope, $log, WSService){
        
        /*
        * Connect to server and send receive messages
        */

        // Listen to incoming messages
        WSService.subscribe(function(message) {
            // TODO: parse message received and change script
            $log.log(message);
        });

        // Connect to server
        WSService.connect();
        // TODO: Send message to server
        //WSService.send(message);
        
        
        /*
        *
        */

        this.selectedRow = 0;

        var scriptPanel = this;
        scriptPanel.allScripts = [];
        scriptPanel.loadedScripts = [];

        // Load customer script
        $http.get('customer-script.json').success(function(data){
            // load all scripts
            scriptPanel.allScripts = data;
            // load first starter script
            scriptPanel.loadedScripts = data[0]; //.script;    // [0] represents first script. Following index will have following scripts. 
        });

        /*
        * Sets name of admin defined as global variable in main app module
        */
        this.setAdminName = function(name){
            $rootScope.adminName = name;
        };

        /*
        * Add script at the end of loaded scripts.
        */
        this.appendScript = function(index){
            scriptPanel.loadedScripts.push( scriptPanel.allScripts[index] );
        };

        /*
        * Replace loaded scripts with the new one.
        */
        this.replaceScript = function(index){
            scriptPanel.loadedScripts = scriptPanel.allScripts[index];
        };

        /*
        * Reset loaded scripts with the first one.
        */
        this.resetScript = function(){
            scriptPanel.loadedScripts = scriptPanel.allScripts[0];
        };

        /*
        * Highlights the next or previous element on up/down arrow keys.
        */
        this.move = function(event, index){
            if(event.keyCode == 38){                        // UP
                if(this.selectedRow > 0) this.selectedRow--;
            }
            else if(event.keyCode == 40){                   // DOWN
                if(this.selectedRow < this.loadedScripts.length-1) this.selectedRow++;
            }
            else if(event.keyCode == 9){ /* do nothing */ }    // TAB
        };
    }]);

    /*
    * Slides controller to show slide thumbs.
    */
    app.controller('SlideController', ['$http', function($http){
        var slidePanel = this;
        slidePanel.slides = [];

        $http.get('slides-thumb-urls.json').success(function(data){
            slidePanel.slides = data;
        });
    }]);

    /*
    * Viewer Screen controller to show what viewer is currently seeing.
    */
    app.controller('ViewerScreenController', ['$http', function($http){
        var viewerScreenPanel = this;
        viewerScreenPanel.slides = [];
        viewerScreenPanel.currentSlide = null;

        $http.get('slides-thumb-urls.json').success(function(data){
            viewerScreenPanel.slides = data;
            viewerScreenPanel.currentSlide = data[0];
        });

        // Change the current viewing slide
        this.changeSlide = function(slideIndex){
            viewerScreenPanel.currentSlide = viewerScreenPanel.slides[slideIndex];
        };
    }]);

    /*
    * Common directive for Focus - Courtesy http://jsfiddle.net/prash/Cp73s/261/
    */
    app.directive('focus',
        function($timeout) {
            return {
                scope : {
                    trigger : '@focus'
                },
                link : function(scope, element) {
                    scope.$watch('trigger', function(value) {
                        if (value === "true") {
                            $timeout(function() {
                                element[0].focus();
                            });
                        }
                    });
                }
            };
        }
    ); 

})();