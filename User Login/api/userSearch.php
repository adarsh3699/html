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
                $userName = $data["userName"];
                $password = $data["password"];
                if ($userName != "" && $password != "") {
                    $query = "SELECT * FROM userSearch WHERE userName = '$userName'";
                    if ($queryRun = @mysqli_query($dbLink, $query)) {
                        $temp = @mysqli_fetch_assoc($queryRun);

                        if(is_null($temp) == true) {
                            $resp["msg"]= "user is not registered";
                            $resp["statusCode"] = 400; //bad request
                        } else if($temp["password"] != $password)  {
                            $resp["statusCode"] = 400; //bad request
                            $resp["msg"] = "Password is wrong";
                        } else {
                            $resp["msg"]= "successfully logged";
                            $resp["statusCode"] = 200;
                        }
                    } else {
                        $resp["statusCode"] = 400; //bad request
                        $resp["msg"] = "Bad request";
                    }
                } else {
                    $resp["statusCode"] = 400; //bad request
                    $resp["msg"] = "Please enter Your Username and Password"; 
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