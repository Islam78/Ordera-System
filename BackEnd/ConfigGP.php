<?php

class Conn{

    //Atributes.
    private $ServerName, $UserName, $PassWord, $DBName ;

    //Constructor.
    public function __construct($server, $username, $password, $dbname)
    {
        $this->ServerName = $server;   
        $this->UserName = $username;   
        $this->PassWord = $password;   
        $this->DBName = $dbname;


    }

    // public function connect()
    // {
    //     $connect = this->
    // }

    //

    // Getters.
    public function getServerName(){return $this->ServerName;}
    public function getUserName(){return $this->UserName;}
    public function getPassword(){return $this->PassWord;}
    public function getDBName(){return $this->DBName;}
}

 
//can be wrettin in other File while including this page. 

$connection = new Conn("localhost", "root", "", "ordera");

$ServerName = $connection->getServerName();
$UserName = $connection->getUserName();
$Password = $connection->getPassword();
$DBName = $connection->getDBName();


$Conn = new mysqli($ServerName, $UserName, $Password, $DBName);
$Conn->set_charset('utf8');


if ($Conn->connect_error)
{
    die("Connection Error " . $Conn->connect_error); 
}
?>