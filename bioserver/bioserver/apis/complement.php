<?php 
    
    try{
        include "helpers.php";
        $sequence = strtoupper($_POST['sequence']);
        successResponse(['result' => strtr($sequence, ['A' => 'T','T' => 'A',
        'C' => 'G','G' => 'C'])],'Complemented Successfully');
    }catch(Exception $ex){
        failResponse();
    }