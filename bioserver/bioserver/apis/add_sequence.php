<?php 
    
    include "helpers.php";
    try{
        $db = @dbConnect();
        
        $sql = "INSERT INTO sequences (sequence_id, sequence_name, sequence)
        VALUES ('".$_POST['sequence_id']."', '".$_POST['sequence_name']."', '".$_POST['sequence']."')";

        if ($db->query($sql) === TRUE) {
            successResponse(null,"Inserted Successfully");
            
        }else {
            failResponse(null,"Didn't inserted");
        }
    }catch(Exception $ex){
        failResponse(null,"Something went wrong");
    }

    $db->close();


    
?>