<?php
	include_once "dbConn.php";
	$resp = array();

    try {
        //our logic                
        $query = "SELECT * FROM `notes`";
        if ($queryRun = @mysqli_query($dbLink, $query)) {
            $temp = array();
            while ($array = @mysqli_fetch_assoc($queryRun)) {
                array_push($temp, $array);
            }
            $resp["statusCode"] = 200;
            $resp["data"] = $temp;
        } else {
            $resp["statusCode"] = 400; //bad request
            $resp["msg"] = "Bad request";
        }

        //our logic_End
    } catch (Throwable $e) {
        $resp["statusCode"] = 500; //bad request
        $resp["msg"] = "Something went wrong " . $e->getMessage();
    }

	print_r(@json_encode($resp));
?>