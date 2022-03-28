<?php
	include_once "dbConn.php";
	$resp = array();

    try {
        //getting data from frontend sent in json format
        $data = @json_decode(file_get_contents("php://input"), TRUE);

        //if json decoded successfully
        if (@json_last_error() == JSON_ERROR_NONE) {
            if (@is_array($data)) {
                //our logic
                $id = $data["id"];
                if ($id != "") {
                    $query = "SELECT * FROM notes WHERE id LIKE $id";
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
                } else {
                    $resp["statusCode"] = 400; //bad request
                    $resp["msg"] = "Bad request"; 
                }
                //our logic
            } else {
                $resp["statusCode"] = 500; //Internal server error
                $resp["msg"] = "Something went wrong";
            }
        } else {
            $resp["statusCode"] = 500; //Internal server error
            $resp["msg"] = "Something went wrong";
        }
    } catch (Throwable $e) {
        $resp["statusCode"] = 500; //bad request
        $resp["msg"] = "Something went wrong " . $e->getMessage();
    }

	print_r(@json_encode($resp));
?>