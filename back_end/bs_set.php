<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $sv_nm = $_POST['serverName'];
    $mng_pw = $_POST['manPassword'];
    $dem_pw = $_POST['demPassword'];
    $ip = $_POST['ip'];
    $ct_ip = $_POST['centerIp'];
    
    $sql = "INSERT INTO ";
    $db = new PDO('sqlite:../iactive.db');
    $query = $db->prepare($sql);
    $query->bindParam(":password", $password, PDO::PARAM_INT);
    $query->bindParam(":type", $type, PDO::PARAM_STR);
    $query->execute();

} else {

}