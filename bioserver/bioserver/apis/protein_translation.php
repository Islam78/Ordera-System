<?php 
    try{
        include "helpers.php";
    
        $sequence = strtoupper($_POST['sequence']);
        $mrna = str_replace("T","U",$sequence);
        $genetic_code = array(
        "UUU" => "F",
        "UUC" => "F",
        "UUA" => "L",
        "UUG" => "L",
        "CUU" => "L",
        "CUC" => "L",
        "CUA" => "L",
        "CUG" => "L",
        "AUU" => "I",
        "AUC" => "I",
        "AUA" => "I",
        "AUG" => "M",
        "GUU" => "V",
        "GUC" => "V",
        "GUA" => "V",
        "GUG" => "V",
        "UCU" => "S",
        "UCC" => "S",
        "UCA" => "S",
        "UCG" => "S",
        "CCU" => "P",
        "CCC" => "P",
        "CCA" => "P",
        "CCG" => "P",
        "ACU" => "T",
        "ACC" => "T",
        "ACA" => "T",
        "ACG" => "T",
        "GCU" => "A",
        "GCC" => "A",
        "GCA" => "A",
        "GCG" => "A",
        "UAU" => "Y",
        "UAC" => "Y",
        "UAA" => "Stop",
        "UAG" => "Stop",
        "CAU" => "H",
        "CAC" => "H",
        "CAA" => "Q",
        "CAG" => "Q",
        "AAU" => "N",
        "AAC" => "N",
        "AAA" => "K",
        "AAG" => "K",
        "GAU" => "D",
        "GAC" => "D",
        "GAA" => "E",
        "GAG" => "E",
        "UGU" => "C",
        "UGC" => "C",
        "UGA" => "Stop",
        "UGG" => "W",
        "CGU" => "R",
        "CGC" => "R",
        "CGA" => "R",
        "CGG" => "R", 
        "AGU" => "S",   
        "AGC" => "S", 
        "AGA" => "R", 
        "AGG" => "R", 
        "GGU" => "G",
        "GGC" => "G",
        "GGA" => "G",
        "GGG" => "G"
    );
    
    $translated_sequence = "";
    
    $codons = str_split($mrna,3);
    
    foreach($codons as $codon){
        
        $translated_codon = $genetic_code[$codon];
        if($translated_codon == "Stop"){
            break;
        }
            $translated_sequence .= $translated_codon;
    }
    
    successResponse(['result' => $translated_sequence],"Translated to protein successfully") ;
}catch(Exception $ex){
    failResponse(null,"Something went wrong");
}