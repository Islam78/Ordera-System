<?php
header('Content-Type: text/html; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');
include("./endpointsGP.php");

if(isset($_REQUEST["need"])) {
	$need=$_REQUEST["need"];
	$epoint = new endpoints();
	$epoint->need=$need;
if(isset($_REQUEST["param1"])) $epoint->param1=$_REQUEST["param1"];
if(isset($_REQUEST["param2"])) $epoint->param2=$_REQUEST["param2"];
if(isset($_REQUEST["param3"])) $epoint->param3=$_REQUEST["param3"];
$epoint->SelectNeed();
}

?>