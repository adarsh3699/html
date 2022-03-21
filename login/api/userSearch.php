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
                if ($userName != "") {
                    $query = "SELECT * FROM userSearch WHERE userName = '$userName' AND password = '$password'";
                    if ($queryRun = @mysqli_query($dbLink, $query)) {
                        $temp = array();
                        while ($array = @mysqli_fetch_assoc($queryRun)) {
                            array_push($temp, $array);
                        }
                        $resp["statusCode"] = 200;
                        $resp["data"] = $temp;

                        if($resp["data"] == []) {
                            $resp["msg"]= "Invalid username or password";
                        } else {
                            $resp["msg"]= "Logined";
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