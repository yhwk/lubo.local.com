<?php

$address = '127.0.0.1';
$port = 10000;

if (($socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP)) === false) {
    echo "创建失败\n";
}

if (($result = socket_connect($socket, $address, $address)) === false) {
    echo "连接失败\n";
}

