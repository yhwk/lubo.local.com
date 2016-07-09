<?php

namespace app;

class DB
{
    const DB_DIR = "../iactive.db";


    public static function Open()
    {
        $db = new \PDO(DB::DB_DIR);
        return $db;
    }


    public static function SafeSearch($q_string = null, $pw, $tp)
    {
        if (is_null($q_string)) {
            return false;
        }
        $db = DB::Open();
        $query = $db->prepare($q_string);
        $query->bindParam(":password", $pw, \PDO::PARAM_INT);
        $query->bindParam(":type", $tp, \PDO::PARAM_STR);
        $query->execute();
        
        return $query;
    }
}