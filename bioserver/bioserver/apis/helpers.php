<?php
    set_error_handler (
        function($errno, $errstr, $errfile, $errline) {
            throw new ErrorException($errstr, $errno, 0, $errfile, $errline);     
        }
    );

    
    function failResponse($data = null,$msg = ""){
        header('Content-Type: application/json');
        echo json_encode(
            [
                'status' => false,
                'data' => $data,
                'msg' => $msg
            ]
        );
    }

    function successResponse($data = null,$msg = ""){
        header('Content-Type: application/json');
        echo json_encode(
            [
                'status' => true,
                'data' => $data,
                'msg' => $msg
            ]
        );
    }
    
    function dbConnect(){
        try{
            $db = new mysqli("localhost","root","","bioserver");
            if ($db->connect_error) {
                echo failResponse(null,'Db connection error');
                exit();
            }
        }catch(Exception $ex){
            echo failResponse(null,'Db connection error');
            exit();
        }
        return $db;
    }


	
    
    
    
?>