<?php
session_start();
include_once("config.php");
include_once("functions.php");

$table = "users";

if(isset($_POST['username'])){

	$username = $_POST['username'];

	$sql = "SELECT * FROM $table WHERE username = '$username';";
	$result = $connection->query($sql);
  confirmQuery($result);

	if($result->num_rows>0){
		echo false;
	}
	else{
		echo true;
	}

}

?>
