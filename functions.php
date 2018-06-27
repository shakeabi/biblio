<?php


function confirmQuery($result) {
  global $connection;
    if(!$result ) {
          echo "The requested userID does not exist.<br>";
          die("QUERY FAILED ." . mysqli_error($connection));


      }


}

function redirect($location){


    header("Location:" . $location);
    exit;

}

 ?>
