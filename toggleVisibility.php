<?php
session_start();
include_once('config.php');
include_once('functions.php');
if(!isset($_SESSION['curr_id'])){redirect('index.php');}

if($_SESSION['visibility']=='public'){
  $_SESSION['visibility']='private';
  echo true;
}
else{
  $_SESSION['visibility']='public';
  echo true;
}
?>
