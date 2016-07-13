<?php
//TODO 使用like 字段
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $sql = "SELECT PK_COURSE_PLAN, PLAN_NAME, AUTHOR, 
                   START_TIME, END_TIME, MOVIE_MODE, SCREEN_MODE
            FROM rec_course_plan_add";
    $db = new PDO('sqlite:../iactive.db');
    $st = $db->prepare($sql);
    $st->execute();
    $result = $st->fetchAll();
    print json_encode($result);

} else {
//  TODO 删除课程时候用
    $data = $_POST;

    $sql = "DELETE FROM rec_course_plan_add WHERE 
            PK_COURSE_PLAN = :number
           ";

    $db = new PDO('sqlite:../iactive.db');
    $st = $db->query($sql);
    foreach ($data as $d) {
        $st->execute(array('number' => intval($d)));
    }
    print json_encode($_POST);
    print json_encode(array('error' => '请使用get请求'));
}