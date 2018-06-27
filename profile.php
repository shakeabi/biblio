<?php
  include_once('config.php');
  include_once('functions.php');
  session_start();
  if(!isset($_SESSION['curr_id'])){header("Location: index.php");}
  $flag=0;
 ?>

<?php include_once('includes/header.php') ?>

    <!-- Navigation -->
<?php include_once('includes/navigation.php') ?>

    <!-- Content -->
    <div class="container">

        <div class="row">


            <div class="col-md-8">

                <h1 class="page-header">
                    <?php echo "{$_SESSION['curr_user']}'s Profile" ?>
                </h1>



            </div>

            <!-- Sidebar -->
<?php include_once('includes/sidebar_p.php') ?>

        <!-- Footer -->
<?php include_once('includes/footer.php') ?>
