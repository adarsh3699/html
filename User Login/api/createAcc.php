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
                    $checkUserExistsQuery = "SELECT * FROM userSearch WHERE userName = '$userName'";
                    if ($checkUserExistsQueryRun = @mysqli_query($dbLink, $checkUserExistsQuery)) {
                        $temp = @mysqli_fetch_assoc($checkUserExistsQueryRun);
                        if(is_null($temp) == true) {
                            //user is not registered
                            $query = "INSERT INTO userSearch (userName, password) VALUES ('$userName', '$password');";
                            if ($queryRun = @mysqli_query($dbLink, $query)) {
                                $resp["statusCode"] = 200;
                                $resp["msg"] = "user registered";
                            } else {
                                $resp["statusCode"] = 400; //bad request
                                $resp["msg"] = "Bad request";
                            }   
                        } else {
                            $resp["msg"]= "user is already registered";
                            $resp["statusCode"] = 400; //bad request
                        }
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