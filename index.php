<?php
session_start();
include_once('config.php');
include_once('functions.php');
if(isset($_SESSION['curr_id'])){redirect('home.php');}

 ?>
<!DOCTYPE html>
<html lang="en" >

<head>
  <meta charset="UTF-8">
  <title>Biblio</title>
  <link href='https://fonts.googleapis.com/css?family=Oswald:300' rel='stylesheet' type='text/css'>
  <link rel='stylesheet prefetch' href='https://ilt-insightdlp-static.s3.amazonaws.com/css/default.css'>
  <link rel="stylesheet" href="css/style.css">
  <link rel="shortcut icon" href="images/book.png">


</head>

<body>
  <div class="container">
    <header >
        <h1>Welcome to <span><strong>Biblio</strong></span></h1>
    </header>

    <div class="container row-xGrid-yMiddle">
      <div class="row-xGrid iso-standard">
        <button class="ctrl-standard typ-subhed fx-bubbleDown" style="margin-left:50px;"><a href="login.php">Login</a></button>
        <button class="ctrl-standard typ-subhed fx-bubbleDown"><a href="register.php">Register</a></button>
      </div>
    </div>
    <div class="foot" style="margin: 20px;">
      Made with &#10084; by <a href="https://github.com/shakeabi">Abishake</a>
    </div>

  </div>
</body>

</html>
