<?php
require 'vendor/autoload.php';

$app = new \Slim\Slim();  

// List all 
$app->get('/viewers', function() {
    $viewer1 = array(
        "id" => 1,
        "name" => "Jawaid",
        "business_name" => "Ibexoft",
        "email" => "jawaid@ibexofts.tk",
        "address" => "Dilkusha Forum, Tariq Road",
        "city" => "Karachi",
        "state" => "Sind",
        "zip" => "74600",
        "phone" => "03323383358",
        "fax" => "03323383358"
    );

    $viewer2 = array(
        "id" => 2,
        "name" => "Faisal Shamshad",
        "business_name" => "New Optican",
        "email" => "faisal@newoptican.pk",
        "address" => "Ayesha Manzil",
        "city" => "Karachi",
        "state" => "Sind",
        "zip" => "74600",
        "phone" => "03212522088",
        "fax" => "03212522088"
    );

    $viewers = array($viewer1, $viewer2);
  
    echo json_encode ($viewers);  
});

// List single
$app->get('/viewer/:id', function($id) {  
    echo json_encode (['r' => 'Fetching single friend']);  
});

// Add new
$app->post('/add-viewer', function() {  
    echo json_encode (['r' => 'Adding friend']);  
});

// Update
$app->put('/update-viewer/:id', function($id) {  
    echo json_encode (['r' => 'Updating friend']);  
});

// Delete
// $app->delete('/delete-viewer/:id', function($id) {  
$app->get('/delete-viewer/:id', function($id) {  
    echo json_encode (['r' => 'Delete friend']);  
});
 
$app->run();