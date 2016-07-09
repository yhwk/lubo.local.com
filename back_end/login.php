<?php
use app\Req;
use app\DB;

// TODO
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $type = $_POST['optionsRadios'];
    $password = $_POST['password'];
    $db = DB::Open();

    $sql = "SELECT * FROM user WHERE pw = :password AND type_id = :type";
    $query = $db->prepare($sql);
    $query->bindParam(":password", $password, PDO::PARAM_INT);
    $query->bindParam(":type", $type, PDO::PARAM_STR);
    $query->execute();


    try {
        $q_result = $query->fetch();
        if ($q_result == true) {
            $sv_host = $_SERVER['HTTP_HOST'];
            $res = 1;
            if ($q_result['type_id'] == 1) {
                header("Location: http://$sv_host/basicSet.html");
            } else {
                header("Location: http://$sv_host/basicSet.html");
            }

        } else {
            $res = 3;
            header("Location: http://$sv_host");
        }

    } catch (PDOException $e) {
        echo $e;
        ($q_result['password'] == $password) ? $res = 2 : $res = 4;
        $q_result = null;
    }

    header('Content-type: application/json');
    print json_encode(array('res' => $res, 'type' => $q_result['type_id']));

} else {
    $sv_host = $_SERVER['HTTP_HOST'];
    header("Location: http://$sv_host");
}