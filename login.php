<?php
session_start();
include_once('config.php');
include_once('functions.php');

  $flag = 0;
  $db_username = null;
  $db_password = null;
  $db_id = null;
  $_SESSION['message'] = '';


  if(isset($_POST['login'])){
    $username = $_POST['usernamelogin'];
    $username = $connection->real_escape_string($username);
    $password = $_POST['passwordlogin'];

    $hashFormat = "$2y$10$";
    $salt = "agendarisawesomeuseitnow";
    $hashAndSalt = $hashFormat . $salt;
    $password = crypt($password, $hashAndSalt);

    $query = "SELECT * FROM users";
    $result = $connection->query($query);

    while($row = $result->fetch_assoc()){
      $db_username = $row['username'];
      $db_password = $row['password'];
      $db_id = $row['id'];

      if($username == $db_username && $password == $db_password){
        $flag = 1;
        break;
      }
    }

  if($flag == 1){
    $flag = 0;
    $_SESSION['curr_user'] = $db_username;
    $_SESSION['curr_id'] = $db_id;
    $_SESSION['visibility'] = "public";
    redirect("home.php");
  }
  else{
      $_SESSION['message'] = 'Wrong Credentials';
  }




  }

 ?>
<!DOCTYPE html>
<html lang="en" >
    <head>
        <meta charset="UTF-8" >
        <title>Biblio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="images/book.png">
        <link rel="stylesheet" type="text/css" href="css/styley.css" >
        <link href="https://fonts.googleapis.com/css?family=Oswald:400,700" rel="stylesheet">
        <link href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css" rel="stylesheet"  type='text/css'>

    </head>
    <body>
        <div class="container" >
            <header >
                <h1>Welcome to <span><strong>Biblio</strong></span></h1>
            </header>
            <section>
                <div id="container_inner" >
                    <div id="wrapper">
                        <div id="login" class="animate form">
                            <form  action="login.php" autocomplete="off" method="post">
                                <h1>Log in</h1>
                                <p>
                                    <div id="error" style="color:red;text-align:center;border-radius:10px;"><?php echo $_SESSION['message'];?></div>
                                </p>
                                <p>
                                    <label for="username" class="uname" ><i class="fa fa-user" aria-hidden="true"></i> Your username</label>
                                    <input id="username" name="usernamelogin" type="text" placeholder="myusername"  required>
                                </p>
                                <p>
                                    <label for="password" class="youpasswd" ><i class="fa fa-key" aria-hidden="true"></i> Your password </label>
                                    <input id="password" name="passwordlogin" type="password" pattern=".{8,}" placeholder="atleast 8 characters"  required>
                                </p>

                                <p class="login button">
                                    <input type="submit" value="Login" name="login">
								                </p>
                                <p class="change_link">
									                Not a member yet ?
									              <a href="register.php" class="to_register"> Register </a>
								                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

              <div class="foot" style="margin: 20px;">
                Made with &#10084; by <a href="https://github.com/shakeabi">Abishake</a>
              </div>
        </div>

    </body>
</html>
