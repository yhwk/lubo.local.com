<?php

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    $sql = "SELECT PK_COURSE_PLAN, PLAN_NAME, GUID, AUTHOR, MEMO,
                   START_TIME, MOVIE_MODE, SCREEN_MODE
            FROM rec_course_plan";
    $db = new PDO('sqlite:../iactive.db');
    $st = $db->prepare($sql);
    $st->execute();
    $result = $st->fetchAll();
    print json_encode($result);

} else {
    print json_encode(array('error' => '请使用post请求'));
}