<?php 

    include "helpers.php";
    try{
        $db = @dbConnect();
        
        $sql = "DELETE FROM sequences WHERE id=".$_GET['id'];
        $result = $db->query($sql);
        if ($result == TRUE) {
            successResponse(null,"Deleted Successfully");
        } else {
            failResponse(null,"Didn't Deleted");
        }
    }catch(Exception $ex){
        failResponse(null,"Something went wrong");
    }
    $db->close();


    
?>