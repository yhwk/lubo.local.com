<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $sv_nm = $_POST['serverName'];
    $mng_pw = $_POST['manPassword'];
    // TODO 密码的接口
    $dem_pw = $_POST['demPassword'];
    $ip = $_POST['ip'];
    $ct_ip = $_POST['centerIp'];
    
    $sql = "INSERT INTO rec_server (SERVER_NAME, MAN_PWD, IP, RES_CENTER_IP)
                             VALUES (:sv_nm, :mng_pw, :ip, :ct_ip) ";
    $db = new PDO('sqlite:../iactive.db');
    $st = $db->prepare($sql);
    $ar = array(
        'sv_nm' => $sv_nm,
        'mng_pw' => $mng_pw,
        'ip' => $ip,
        'ct_ip' => $ct_ip
    );
    $st->execute($ar);

    $st1 = $db->query('SELECT * FROM rec_server');
    $all = $st1->fetchAll();
    print json_encode($all);

} else {
    echo "method is post, server not allow";
    print json_encode(array('error' => '405'));
}