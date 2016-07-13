<?php

if ($_SERVER['REQUEST_METHOD'] == 'GET') {


} else {
    print json_encode(array('error' => '500'));
}