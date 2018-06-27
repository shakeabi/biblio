<?php

  include_once('functions.php');

  ///////////////////////////////////////////////////////////////////
  //recaptcha vars
  $recaptcha = "disabled";
  $public_key = "";
  $private_key = "";
  ///////////////////////////////////////////////////////////////////

  define ('DB_HOST','localhost');
  define ('DB_USER','root');
  define ('DB_PASSWORD','');

  $connection = new mysqli(DB_HOST,DB_USER,DB_PASSWORD);

  $query = "CREATE DATABASE IF NOT EXISTS biblio";
  $connection->query($query);
  confirmQuery($connection);

  $query = "USE biblio";
  $connection->query($query);
  confirmQuery($connection);

  $query = "CREATE TABLE IF NOT EXISTS users(
  		id INT(11) NOT NULL AUTO_INCREMENT,
  		username VARCHAR(255) NOT NULL,
  		email VARCHAR(255) NOT NULL,
  		password VARCHAR(255) NOT NULL,
  		PRIMARY KEY (id,username)
  		)";
  $connection->query($query);
  confirmQuery($connection);



?>
