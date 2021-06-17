<?php 

    include "helpers.php";
    try{
        $db = @dbConnect();
        
        $sql = "UPDATE sequences SET sequence_id='".$_POST['sequence_id']."',
        sequence_name='".$_POST['sequence_name']."',sequence='".$_POST['sequence']."' WHERE id=".$_POST['id'];
        $result = $db->query($sql);
        if ($result == TRUE) {
            successResponse(null,"Updated Successfully");
        } else {
            failResponse(null,"Didn't Updated");
        }
    }catch(Exception $ex){
        failResponse(null,"Something went wrong");
    }
    $db->close();


    
?>