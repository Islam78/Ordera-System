<?php 

    include "helpers.php";
    try{
        $db = @dbConnect();

        $query = "SELECT * FROM sequences";
        if(isset($_GET['id'])){
            $query .=  " WHERE id=".$_GET['id'];
        }
        else if(isset($_GET['sequence_id'])){
            $query .= " WHERE sequence_id LIKE '".$_GET['sequence_id']."%'";
        }
        else if(isset($_GET['sequence_name'])){
            $query .= " WHERE sequence_name LIKE '".$_GET['sequence_name']."%'";
        } 
        else if(isset($_GET['sequence'])){
            $query .= " WHERE sequence LIKE '".$_GET['sequence']."%'";  
        }

        $result = $db->query($query);
        
        
        if ($result->num_rows > 0) {
            $sequences = array();
            while ($row = $result->fetch_assoc()) {
                $sequences[] = $row; 
            }
            successResponse($sequences);
        } else {
            failResponse(null,'No data to show');
        }
    }catch(Exception $ex){
        failResponse(null,"Something went wrong");
    }

    $db->close();


    
?>