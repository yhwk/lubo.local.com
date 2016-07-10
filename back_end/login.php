<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $userType = $_POST['type'];
    $password = $_POST['password'];
    $db = new PDO('sqlite:../iactive.db');

    $sql = "SELECT * FROM user WHERE password = :password AND userType = :userType";
    $st = $db->prepare($sql);
    $st->bindParam(":password", $password);
    $st->bindParam(":userType", $userType);
    $st->execute();

    try {
        $q_result = $st->fetch();
        if ($q_result == true) {
            $sv_host = $_SERVER['HTTP_HOST'];
            $res = 1;
            if ($q_result['type_id'] == 0) {
                header("Location: http://$sv_host/basicSet.html");

            } else {
                header("Location: http://$sv_host/basicSet.html");
            }

        } else if ($q_result['password'] != $password) {
            $res = 2;
            echo "密码错误";
        }

    } catch (PDOException $e) {
        echo $e;
        $q_result = null;
        $res = 4;
    }

    header('Content-type: application/json');
    print json_encode(array('res' => $res, 'userType' => $q_result['userType']));

} else {
    $sv_host = $_SERVER['HTTP_HOST'];
//    header("Location: http://$sv_host");
    echo "请求的方法为get";
}