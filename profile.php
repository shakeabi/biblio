<?php
  include_once('config.php');
  include_once('functions.php');
  session_start();
  if(!isset($_SESSION['curr_id'])){header("Location: index.php");}
 ?>

<?php include_once('includes/header.php') ?>

    <!-- Navigation -->
<?php include_once('includes/navigation_p.php') ?>

    <!-- Content -->
    <div class="container">

        <div class="row">


            <div class="col-md-8">

                <h1 class="page-header">
                    <?php echo "{$_SESSION['curr_user']}'s Profile" ?>
                </h1>
        <!-- ///////////////////////////////////////////////////////////////////////// -->
                <?php
                  $disp_head=null;
                    if(isset($_GET['mode'])){
                      switch($_GET['mode']){
                        case 'activity':$disp_head='Activity Log:';
                                        activityLog();
                                        break;
                        case 'status':$disp_head= ($_GET['status']==1)?'Want to Read':(($_GET['status']==2)?'Currently Reading':'Finished Reading');
                                        statusFilter();
                                        break;
                        case 'shelf':$disp_head=$_GET['shelf']." books";
                                        shelfDisplay();
                                        break;
                      }
                    }

                  function activityLog(){
                    global $disp_head;
                    echo "<h3 class='page-header'>{$disp_head}</h3>";
                  }

                  function statusFilter(){
                    global $disp_head;
                    echo "<h3 class='page-header'>{$disp_head}</h3>";
                  }

                  function shelfDisplay(){
                    global $disp_head;
                    echo "<h3 class='page-header'>{$disp_head}</h3>";
                  }
                 ?>



        <!-- ///////////////////////////////////////////////////////////////////////// -->

            </div>

            <!-- Sidebar -->
<?php include_once('includes/sidebar_p.php') ?>

        <!-- Footer -->
<?php include_once('includes/footer.php') ?>
