<?php


try{
    include "helpers.php";
    $sequence = $_POST['sequence'];
    $k = $_POST['k'];


    $kmers = ""; 
    $length = strlen($sequence);
    $nucleotides = array();
    for($i = 0 ; $i < $length-$k+1; $i++ ){
        $nucleotides[$i] = substr($sequence,$i,$k);
        $kmers .= $nucleotides[$i]." ";
    }
    
    $counter = 0;
    $max = 0;
    $finalKmer = "";
    
    foreach($nucleotides as $nucleotide){
        foreach($nucleotides as $nucleotide2){
            if($nucleotide == $nucleotide2)
            {
                $counter += 1;
            }
        }
        if($counter > $max)
        {
            $max = $counter;
            $finalKmer = $nucleotide;
        }
        $counter = 0 ;
    }
    successResponse(['result' => $kmers."\nMost Frequent Kmer: ".$finalKmer . " ". $max],"Most Frequent Kmer");
}catch(Exception $ex){
    failResponse();
}
