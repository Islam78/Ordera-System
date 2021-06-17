<?php

   

        include("Config.php");
        include("Queries.php");

        
        // $checkEmail = filter_input(INPUT_GET, "email", FILTER_SANITIZE_STRING);
        // $checkPassword = filter_input(INPUT_GET, "password", FILTER_SANITIZE_STRING);

         $query = new Query();
        //  $cond=array("CaptainName","CaptainPassword");
		//  $value=array($checkEmail,$checkPassword);
        //    $ret= $query->CheckWhere("captain2", $Conn, $cond, $value);
		//    if($ret) echo "Login OK . <br>";
		//    else echo "Login is not OK . <br>";

    print_r($query->SelectSome("inventory", $Conn, "best"));

           
  
?>
