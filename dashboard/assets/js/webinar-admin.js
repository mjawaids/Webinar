(function(){

    var app = angular.module('WebinarAdmin', []);

    /*
    * Script controller to show script and handle keyboard navigation.
    */
    app.controller('ScriptController', ['$http', function($http){
        this.selectedRow = 0;
        this.admin_name = "Jawaid";

        var scriptPanel = this;
        scriptPanel.allScripts = [];
        scriptPanel.loadedScripts = [];

        $http.get('customer-script.json').success(function(data){
            // load all scripts
            scriptPanel.allScripts = data;
            // load first starter script
            scriptPanel.loadedScripts = data[0]; //.script;    // [0] represents first script. Following index will have following scripts. 
        });

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