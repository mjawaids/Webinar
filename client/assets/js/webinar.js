$(document).ready(function(){
    $("#Next0").click(function(){ // Move from slide 0 to 1
        $("#webinar-carousel").carousel(1);
    });
    $("#Next1").click(function(){ // Move from slide 1 to 2
        $("#webinar-carousel").carousel(2);
    });
    $("#Next2").click(function(){ // Move from slide 2 to 3
        $("#webinar-carousel").carousel(3);
    });
    $("#Next3").click(function(){ // Move from slide 3 to 4
        $("#webinar-carousel").carousel(4);
    });
    $("#Next4").click(function(){ // Move from slide 4 to 5
        $("#webinar-carousel").carousel(5);
    });
    $("#Next5").click(function(){ // Move from slide 5 to 6
        $("#webinar-carousel").carousel(6);
    });
    $("#Next6").click(function(){ // Move from slide 6 to 7
        $("#webinar-carousel").carousel(7);
    });

    /*
    * Connection with Server to send messages to admin
    */
    var conn = new WebSocket('ws://localhost:8080');
    conn.onopen = function(e) {
        console.log("Connection established!");
    };

    conn.onmessage = function(e) {
        console.log(e.data);
        alert(e.data);
    };
});