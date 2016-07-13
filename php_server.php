<?php

namespace SocketServer {

    error_reporting(E_ALL);

//    保证在连接客户端时不会超时
    set_time_limit(0);

//
    ob_implicit_flush();

    $address = '127.0.0.1';
    $port = 10000;

    if (($sock = socket_create(AF_INET, SOCK_STREAM, SOL_TCP)) === false) {
        echo "socket_create() 失败原因: " . socket_strerror(socket_last_error()) . "\n";
    }

    if (socket_bind($sock, $address, $port) === false) {
        echo "socket_bind() 失败原因: " . socket_strerror(socket_last_error($sock)) . "\n";
    }

    if (socket_listen($sock, 5) === false) {
        echo "socket_listen() 失败原因: " . socket_strerror(socket_last_error($sock)) . "\n";
    }

    /**
     * @var $clients array
     */
    $clients = array();

    do {
        $read = array();
        $read[] = $sock;

        $read = array_merge($read, $clients);

        // 建立一个阻塞调用 ， 借用 socket_select
        $write = $except = NULL;
        if (socket_select($read, $write, $except, $tv_sec = 5) < 1) {
//                SocketServer::debug("Problem blocking socket_select?");
            continue;
        }

        // 处理新的连接
        if (in_array($sock, $read)) {

            if (($msgsock = socket_accept($sock)) === false) {
                echo "socket_accept() 失败原因: " . socket_strerror(socket_last_error($sock)) . "\n";
                break;
            }
            $clients[] = $msgsock;
            $key = array_keys($clients, $msgsock);

            $msg = "\n欢迎使用PHP测试服务器. \n" .
                "您是客户号: {$key[0]}\n" .
                "要退出，键入'quit'。要关闭服务器类型'shutdown'。\n";
            socket_write($msgsock, $msg, strlen($msg));

        }

//        处理输入对于每个连接的 socket 服务
        foreach ($clients as $key => $client) { // for each client
            if (in_array($client, $read)) {
                if (false === ($buf = socket_read($client, 2048, PHP_NORMAL_READ))) {
                    echo "socket_read() 失败原因: " . socket_strerror(socket_last_error($client)) . "\n";
                    break 2;
                }
                if (!$buf = trim($buf)) {
                    continue;
                }
                if ($buf == 'quit') {
                    unset($clients[$key]);
                    socket_close($client);
                    break;
                }
                if ($buf == 'shutdown') {
                    socket_close($client);
                    break 2;
                }
                $talkback = "Cliente {$key}: Usted dijo '$buf'.\n";
                socket_write($client, $talkback, strlen($talkback));
                echo "$buf\n";
            }

        }
    } while (true);

    socket_close($sock);
}

