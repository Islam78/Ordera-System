<?php 


    include "helpers.php";
    try{
        $sequence = strtoupper($_POST['sequence']);
        $gc_content = (substr_count($sequence,'G') + substr_count($sequence,'C')) / strlen($sequence) * 100;
        successResponse(['result' => $gc_content],'GC Content');
    }catch(Exception $ex){
        failResponse();
    }