<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $type = $_POST['optionsRadios'];
    $password = htmlspecialchars($_POST['password']);

//    $db = new MySqlite();
//    $query = $db->query("SELECT * FROM user");
//    if (!$db) {
//        echo $db->lastErrorMsg();
//    } else {
//        echo "Opened database successfully";
//    }

    header('Content-type: application/json');
    print json_encode(array('type' => 'login'));
};
