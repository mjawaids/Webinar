(function(){

    var app = angular.module('WebinarAdmin', []);

    app.controller('ScriptController', function(){
        this.scriptItems = statements;
    });

    var statements = [
            {text: "Hi, (owner name) this is {{admin_name}} with Weekly Homebuyers List, how are you?"},
            {text: "We set up an appointment for right now, are you on your computer? "},
            {text: "Yes: OK."},
            {text: "No: OK, are you able to log on to your computer? "},
            {text: "Ok great, before I give you our presentation site, tell me a little about you and your business?"},
            {text: "What do you do there?"},
            {text: "Are you the owner? "},
            {text: "Yes: Great! How long have you owned it?"},
            {text: "No:Oh, who is the owner there.  Does he/she know about this meeting?"},
            {text: "Do you make all the decisions regarding Marketing and Advertising?"},
        ];
})();