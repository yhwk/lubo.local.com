<?php

namespace app;

class Req
{
    public static function post()
    {
        $is_post = ($_SERVER['REQUEST_METHOD'] == 'POST');
        return $is_post;
    }

    public static function get()
    {
        $is_get = $_SERVER['REQUEST_METHOD'] == 'GET';
        return $is_get;
    }
}