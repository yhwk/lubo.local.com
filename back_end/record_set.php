<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $screenMode = $_POST['screenMode'];
    $screenCourse = $_POST['screenCourse'];
    $movieMode = $_POST['movieMode'];
    $movieCourse = $_POST['movieCourse'];
    $movieSize = $_POST['movieSize'];
    $movieFlow = $_POST['movieFlow'];
    $movieFrame = $_POST['movieFrame'];

    $iacSplit = $_POST['iacSplit'];
    $ipSplit = $_POST['ipSplit'];
    $iacMovie = $_POST['iacMovie'];
    $ipMovie = $_POST['ipMovie'];

    $flvNative = $_POST['flvNative'];
    $flvThird = $_POST['flvThird'];
    $flvUrl = $_POST['flvUrl'];
    $isRecode = $_POST['isRecode'];
    $recodeSize = $_POST['recodeSize'];
    $recodeFlow = $_POST['recodeFlow'];

    $db = new PDO('sqlite:../iactive.db');
    $st = $db->prepare('SELECT * FROM rec_server');
    if (($st != false)) {
        $sql = "UPDATE rec_server SET
                      SCREEN_MODE = :sr_md, SCREEN_COURSE_TYPE = :sr_cr, MOVIE_MODE = :mv_md, MOVIE_COURSE_TYPE = :mv_cr,
                      MOVIE_SIZE = :mv_sz,  MOVIE_FLOW = :mv_fl, IS_RECODE=:is_rcd, RECODE_SIZE=:rcd_sz, RECODE_FLOW=:rcd_fl,
                      IS_LOCAL_IAC_SPLIT_LIVE=:iac_sp, 
                      IS_LOCAL_IAC_MOVIE_LIVE = :iac_mv,
                      IP_MULTICAST_SPLIT = :ip_sp,
                      IP_MULTICAST_MOVIE = :ip_mv,
                      FLV_LIVE_TYPE = :flv_type,
                      FLV_THIRD_LIVE_URL = :flc_url
                ";
    } else {

        $sql = "INSERT INTO 
                rec_server (SCREEN_MODE, SCREEN_COURSE_TYPE, MOVIE_MODE, MOVIE_COURSE_TYPE, MOVIE_SIZE, MOVIE_FLOW,
                            IS_LOCAL_IAC_SPLIT_LIVE, IS_LOCAL_IAC_MOVIE_LIVE, IP_MULTICAST_SPLIT, IP_MULTICAST_MOVIE,
                            FLV_LIVE_TYPE, FLV_THIRD_LIVE_URL, IS_RECODE, RECODE_SIZE, RECODE_FLOW)
                VALUES (:sr_md, :sr_cr, :mv_md, :mv_cr, :mv_sz, :mv_fl, :mv_fr, 
                        :iac_sp, :iac_mv, :ip_sp, :ip_mv,
                        :flv_type, :flc_url, :is_rcd, :rcd_sz, :rcd_fl) 
        ";
    }


    $st = $db->prepare($sql);
    $ar = array(
        'sr_md' => $screenMode, 'sr_cr' => $screenCourse, 'mv_md' => $movieMode, 'mv_cr' => $movieCourse,
        'mv_sz' => $movieSize, 'mv_fl' => $movieFlow, 'mv_fr' => $movieFrame, 'iac_sp' => $iacSplit,
        'iac_mv' => $iacMovie, 'ip_sp' => $ipSplit, 'ip_mv' => $ipMovie, 'flv_type' => $flvNative,
        'flc_url' => $flvUrl, 'is_rcd' => $isRecode, 'rcd_sz' => $recodeSize, 'rcd_fl' => $recodeFlow
    );
    $st->execute($ar);

    $st1 = $db->query('SELECT FLV_THIRD_LIVE_URL FROM rec_server WHERE FTP_PORT > 0');
    $all = $st1->fetchAll();
    print json_encode($all);

} else {
    echo "the method is get";
}