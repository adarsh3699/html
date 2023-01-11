<?php
    header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

    $dbHost = "localhost";
    $dbUser = "root";
    $dbPassword = "root";
    $dbName = "test";

    if ($dbLink = @mysqli_connect($dbHost, $dbUser, $dbPassword, $dbName)) {
    } else {
        $resp = array();
        $resp["statusCode"] = 500; //Internal server error
		$resp["msg"] = "db connection failed";
        print_r(@json_encode($resp));
    }
?>