<?php 


    include "helpers.php";

    try{
        $sequence = strtoupper($_POST['sequence']);
        successResponse(['result' => strrev($sequence)],'Complemented Successfully');
    }catch(Exception $ex){
        failResponse();
    }