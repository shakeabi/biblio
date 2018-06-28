<?php
include_once('config.php');
include_once('functions.php');
session_start();
if(!isset($_SESSION['curr_id'])){header("Location: index.php");}

  echo "ActivityMode(".ucfirst($_SESSION['visibility'])."):   ";

?>
