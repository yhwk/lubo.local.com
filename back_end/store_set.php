<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $ftp_open = $_POST['ftpOpen'];
    $ftp_ip = $_POST['ftpIp'];
    $ftp_port = $_POST['ftpPort'];
    $ftp_username = $_POST['ftpUsername'];
    $ftp_password = $_POST['ftpPassword'];

    $db = new PDO('sqlite:../iactive.db');
    $st = $db->prepare('SELECT * FROM rec_server');

//    判断表中有无数据，从而进行更新或插入
    if ($st != false) {
        $sql = "UPDATE rec_server SET 
                FTP_IP = :ftp_ip,
                FTP_PORT = :ftp_port,
                FTP_USERNAME = :ftp_username,
                FTP_PWD = :ftp_password,
                FTP_OPEN = :ftp_open";
    } else {
        $sql = "INSERT INTO rec_server WHERE 
                FTP_IP = :ftp_ip,
                FTP_PORT = :ftp_port,
                FTP_USERNAME = :ftp_username,
                FTP_PWD = :ftp_password,
                FTP_OPEN = :ftp_open
                ";
    }
    $st = $db->prepare($sql);
    $ar = array(
        'ftp_ip' => $ftp_ip,
        'ftp_port' => $ftp_port,
        'ftp_username' => $ftp_username,
        'ftp_password' => $ftp_password,
        'ftp_open' => $ftp_open
    );
    $st->execute($ar);

    $st1 = $db->query('SELECT FTP_USERNAME FROM rec_server WHERE FTP_PORT > 0');
    $all = $st1->fetchAll();
    print json_encode($all);

} else {
    echo "the method is get";
}