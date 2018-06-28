<?php
session_start();
include_once('config.php');
include_once('functions.php');
if(!isset($_SESSION['curr_id'])){redirect('index.php');}

if(isset($_POST['actObj'])){
  $obj = json_decode($_POST['actObj']);
  $imgLink = "http://books.google.com/books/content?id="."{$obj->volId}"."&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api";
  /////////////////////////////////////////////////////
  if($obj->action == "shelf"){
    $table = $_SESSION['curr_id']."books";

    $query = "SELECT * FROM $table WHERE volId = '$obj->volId'";
    $result = $connection->query($query);
    confirmQuery($result);

    if($result->num_rows>0){
        $query = "UPDATE $table SET shelf = '$obj->support' WHERE volId = '$obj->volId'";
        $result_temp = $connection->query($query);
        confirmQuery($result_temp);
    }
    else {
        $query = "INSERT INTO $table(bookName,authorName,imgLink,shelf,volId) ";
        $query .= "VALUES('$obj->title','$obj->author','$imgLink','$obj->support','$obj->volId')";
        $result_temp = $connection->query($query);
        confirmQuery($result_temp);
    }

  }
  ////////////////////////////////////////////////////////
  if($obj->action == "status"){
    $table = $_SESSION['curr_id']."books";

    $query = "SELECT * FROM $table WHERE volId = '$obj->volId'";
    $result = $connection->query($query);
    confirmQuery($result);

    if($result->num_rows>0){
        $query = "UPDATE $table SET status = '$obj->support' WHERE volId = '$obj->volId'";
        $result_temp = $connection->query($query);
        confirmQuery($result_temp);
    }
    else {
        $query = "INSERT INTO $table(bookName,authorName,imgLink,status,volId) ";
        $query .= "VALUES('$obj->title','$obj->author','$imgLink','$obj->support','$obj->volId')";
        $result_temp = $connection->query($query);
        confirmQuery($result_temp);
    }

  }
  /////////////////////////////////////////////////////// working on this
  if($obj->action == "like"){
    $table = $_SESSION['curr_id']."books";

    $query = "SELECT * FROM $table WHERE volId = '$obj->volId'";
    $result = $connection->query($query);
    confirmQuery($result);

    if($result->num_rows>0){
        $row = $result->fetch_assoc();
        $likeStatus = $row['likes'];
        if($likeStatus!='0'){
          $obj->support = '0';
        }
        else{
          $obj->support = '1';
        }
        $query = "UPDATE $table SET likes = '$obj->support' WHERE volId = '$obj->volId'";
        $result_temp = $connection->query($query);
        confirmQuery($result_temp);
    }
    else {
        $query = "INSERT INTO $table(bookName,authorName,imgLink,likes,volId) ";
        $query .= "VALUES('$obj->title','$obj->author','$imgLink','$obj->support','$obj->volId')";
        $result_temp = $connection->query($query);
        confirmQuery($result_temp);
    }

  }
  ///////////////////////////////////////////////////////

  //updating activity
  $table = $_SESSION['curr_id']."activity";

  $query = "INSERT INTO $table(bookName,authorName,imgLink,activity,actSupport,volId,visibility) ";
  $query .= "VALUES('$obj->title','$obj->author','$imgLink','$obj->action','$obj->support','$obj->volId','{$_SESSION['visibility']}')";
  $result_temp = $connection->query($query);
  confirmQuery($result_temp);


}

?>
