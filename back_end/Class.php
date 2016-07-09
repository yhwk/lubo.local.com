<?php

class User
{
    public function login()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            echo "hello";
        };
    }
}

class MySqlite extends SQLite3
{
    function __construct()
    {
        $this->open('var/www/lubo/iactive.db');
    }
}