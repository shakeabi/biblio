<?php
session_start();
include_once('config.php');
include_once('functions.php');
if(!isset($_SESSION['curr_id'])){redirect('index.php');}

if(isset($_POST['userId'])){
  $shelvesList=[];
  $table = $_POST['userId']."shelves";

  $query = "SELECT DISTINCT shelfName FROM $table";
  $result = $connection->query($query);
  confirmQuery($result);
  while($row = $result->fetch_assoc()){
    array_push($shelvesList,$row['shelfName']);
  }

  echo json_encode($shelvesList);


}

 ?>
