<?php
session_start();
include_once('config.php');
include_once('functions.php');
if(!isset($_SESSION['curr_id'])){redirect("index.php");}

date_default_timezone_set('Asia/Kolkata');


 ?>

<?php include_once('includes/header.php') ?>

    <!-- Navigation -->
<?php include_once('includes/navigation.php') ?>

    <div id="myModal" class="modal">

      <div class="modal-content" id="modalContent">
  
      </div>

    </div>

    <!-- Content -->
    <div class="container">


        <div class="row">

            <div class="col-md-12">

                <h1 class="page-header" id="pageHeading">
                    Suggestions:
                </h1>
<!-- //////////////////////////////////////////////////////////////////////// -->
                <div id="displayRegion">

                </div>
<!-- //////////////////////////////////////////////////////////////////////// -->

            </div>
            <!-- <hr style="width:5px;color:red;"> -->



        <!-- Footer -->
<?php include_once('includes/footer.php') ?>
