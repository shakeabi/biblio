<?php

	session_start();

	session_unset();
	session_destroy();

//	destroying cookies
	if (isset($_SERVER['HTTP_COOKIE'])) {
	    $cookies = explode(';', $_SERVER['HTTP_COOKIE']);
	    foreach($cookies as $cookie) {
	        $parts = explode('=', $cookie);
	        $name = trim($parts[0]);
	        setcookie($name, '', time()-1000);
	        setcookie($name, '', time()-1000, '/');
	    }
	}
//
// $cookie_name = 'PHPSESSID';
// unset($_COOKIE[$cookie_name]);
// // empty value and expiration one hour before
// $res = setcookie($cookie_name, '', time() - 3600*12);

  header("Location: index.php");
 ?>
