<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $plan_name = $_POST['planName'];
    $subject = $_POST['subject'];
    $speaker = $_POST['speaker'];
    $memo = $_POST['memo'];

    $sql = "INSERT INTO rec_course_plan_add (PLAN_NAME, AUTHOR, MEMO) VALUES (:plan_name, :speaker, :memo)";
    $db = new PDO('sqlite:../iactive.db');
    $st = $db->prepare($sql);
    $ar = array(
        'plan_name' => $plan_name,
        'speaker' => $speaker,
        'memo' => $memo
    );
    $st->execute($ar);

    $st1 = $db->query('SELECT PK_COURSE_PLAN FROM rec_course_plan_add ');
    $all = $st1->fetchAll();
    print json_encode($all);

} else {
    echo "the method is get";
}