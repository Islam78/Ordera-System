<?php
header('Content-Type: text/html; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

class endpoints{
public $need="";
public $param1="";
public $param2="";
public $param3="";

public function SelectNeed()
{

switch ($this->need) {
	case "login" :  $this->Login();
		break;
	case "best" : $this->BestProducts();
		break; 
}
}

public function Login()
{
	include("./ConfigGP.php");
	include("./Queries.php");
	$table = "";
	if ($this->param3 === "customer")
	{
		$table = "customer2";
		$cond=array("CustomerName","CustomerPassword");
	$values=array($this->param1,$this->param2);
	$q=new Query();
	$ret=$q->CheckWhere($table, $Conn,$cond, $values);
	echo $ret;
	}
	elseif($this->param3 === "captain")
	{
		$table = "captain2";
		$cond=array("CaptainName","CaptainPassword");
	$values=array($this->param1,$this->param2);
	$q=new Query();
	$ret=$q->CheckWhere($table, $Conn,$cond, $values);
	echo $ret;
	}
	else
	{
		echo "please enter type of account (param3)";
	}
}

public function BestProducts()
{
	include("./ConfigGP.php");
	include("./Queries.php");

	$q = new Query;
	$CheckBest = $q->SelectSome("inventory", $Conn, "best");
	
	$table="inventory";
	$cond=array("item_id","best");
	$values=array($this->param1,$this->param2);
	$q=new Query();
	$ret=$q->CheckWhere($table, $Conn,$cond, $values);
	echo $ret;
}




}

?>