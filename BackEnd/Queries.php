<?php 
header('Content-Type: text/html; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

class Query
{
    private $tableName;
    private $command;

    public function SelectAll( $table, $conn)
    {
            
    $sql = "SELECT * FROM $table ;";

    $result = $conn->query($sql);

    if ($result->num_rows > 0)
    {
        while($FR = $result->fetch_assoc())//FR -> Final Result.
        {
            print_r($FR);
            echo "<br>";
        }
    }else{
        echo "0 Results. <br>";
    }
     if ($result)
     {echo "YES";}
     else
     {echo "NO";}
    
       
    }

    public function SelectSome($table, $conn, $Some)
    {
        $sql = "SELECT $Some FROM $table ;";

        $result = $conn->query($sql);
    
        $FR = "";
         if ($result->num_rows > 0)
         {
             while($FR = $result->fetch_assoc())//FR -> Final Result.
             {
                 //print_r($FR);
                 //echo "<br>";


             }
         }else{
             echo "0 Results. <br>";
         }
          if ($result)
          {echo "YES";}
          else
          {echo "NO";}

         return $FR;
        
    }

    public function Insert($table, $conn, $columns, $data)
    {
        $sql = "INSERT INTO $table $columns VALUES $data";

        $result = $conn->query($sql);
         
        if($result !== False)
        {
            echo "record added successfully. <br>";
        }
        else
        {
            echo "record wasn't added successfully. <br>";

        }
    
    }

    public function CheckWhere($table, $conn, $cond, $value ) // $cond => condition
    {
        $FResult = [];

        $sql = "SELECT * FROM $table where";
        for($i=0;$i<count($cond);$i++)
		{
			if($i<1)$sql=$sql." ".$cond[$i]."='".$value[$i]."'";
			else $sql=$sql." AND ".$cond[$i]."='".$value[$i]."'";
		}
        $result = $conn->query($sql);

        
        if ($result->num_rows > 0)
        {
            /*
			while($FResult = $result->fetch_assoc())
            {
                if ($FResult[$cond] === $value)
                {
                    echo "$cond correct : " . $value . "<br>";
                    //print_r($FResult);
                    echo "<br>";
                }

            }
			*/
			return "yes";
        }
        else{
            return "no";
        }

       // return $FResult;


    }
	
  public function SelectWhere($table, $conn,$names,$cols,$cond, $value,$need) // $cond => condition
    {
        $FResult = [];

        $sql = "SELECT ".implode(",",$cols)." FROM $table where";
        for($i=0;$i<count($cond);$i++)
		{
			if($i<1)$sql=$sql." ".$cond[$i]."='".$value[$i]."'";
			else $sql=$sql." AND ".$cond[$i]."='".$value[$i]."'";
		}
		
        $result = $conn->query($sql);

        $jsonarr=array();
        if ($result->num_rows > 0)
        {
            $j=0;
			while($row = $result->fetch_assoc())
            {
				// $jsonarr[$j]=array($names[0]=>$row[$cols[0]],)
				$temp=array();
               for($i=0;$i<count($cols);$i++)
			   {
				$temp[$names[$i]]=$row[$cols[$i]];
			   }
			   $jsonarr[$j]=$temp;
              $j++;
            }
			
			
        }
          return    json_encode(array($need=>$jsonarr));
	  }

       // return $FResult;


   

}

?>