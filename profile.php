<?php
  include_once('config.php');
  include_once('functions.php');
  session_start();
  if(!isset($_SESSION['curr_id'])){
    if(!isset($_GET['mode'])||$_GET['mode']!='follow'){
      header("Location: index.php");
    }

  }

 ?>

<?php include_once('includes/header.php') ?>

    <!-- Navigation -->
<?php include_once('includes/navigation_p.php') ?>

    <!-- Content -->
    <div class="container">

        <div class="row">


            <div class="col-md-8">

                <h1 class="page-header">
                    <?php
                      if(isset($_GET['mode'])&&($_GET['mode']=='follow')){
                          echo $_GET['follow']."'s Profile";
                      }
                      else {
                        echo "{$_SESSION['curr_user']}'s Profile";
                      }
                     ?>
                </h1>
        <!-- ///////////////////////////////////////////////////////////////////////// -->
                <?php
                  $disp_head=null;
                  $flag = 0;
                    if(isset($_GET['mode'])){
                      switch($_GET['mode']){
                        case 'activity':$disp_head='Activity Log:';
                                        activityLog();
                                        break;
                        case 'status':$disp_head= ($_GET['status']==1)?'Want to read':(($_GET['status']==2)?'Currently reading':'Finished reading');
                                        statusFilter();
                                        break;
                        case 'shelf':$disp_head=$_GET['shelf'];
                                        shelfDisplay();
                                        break;
                        case 'follow':$disp_head=$_GET['follow']."'s Activity";
                                        activityDisplay();
                                        break;
                      }
                    }

                  function activityLog(){
                    global $disp_head;
                    global $connection;

                    $shareURL = "<iframe src='https://www.facebook.com/sharer/sharer.php?u=localhost%2Fbook%2Fprofile.php%2F&amp%3Bsrc=sdkpreparse' width='73' height='28' style='border:none;overflow:hidden' scrolling='no' frameborder='0' allowTransparency='true' allow='encrypted-media'></iframe>";

                    echo "<h3 class='page-header'><u>{$disp_head}</u>{$shareURL}</h3>";

                    $table = $_SESSION['curr_id']."activity";

                    $query = "SELECT * FROM $table ORDER BY id DESC";
                    $result = $connection->query($query);
                    confirmQuery($result);
                     while($row = $result->fetch_assoc()){
                        $flag = 1;

                        $act_id = $row['id'];
                        $act_bname = $row['bookName'];
                        $act_aname = $row['authorName'];
                        $act_img = $row['imgLink'];
                        $act_act = $row['activity'];
                        $act_support = $row['actSupport'];
                        $act_volid = $row['volId'];
                        $act_vis = $row['visibility'];
                        ?>
                        <div class="clearfix row">
                          <img src=<?php echo $act_img; ?> class="floatLeft" alt="Sorry image not available!" style="margin-right:10px;width:80px;">
                            <div class="">
                              <h3 id="itemTitle">
                                <span><?php echo $act_bname; ?></span><small id="itemAuthor"> by <?php echo $act_aname; ?></small>
                              </h3>
                              <p id="activity" style="font-weight:bold;color:orange;">
                                <?php
                                    switch($act_act){
                                      case 'status': echo "Changed reading status to: ".$act_support;
                                                      break;
                                      case 'shelf': echo "Book added to '".$act_support."' shelf.";
                                                      break;
                                      case 'like':    if($act_support)
                                                      echo "Liked this book.";
                                                      else
                                                      echo "Disliked this book.";
                                                      break;
                                    }
                                ?>
                              </p>
                            </div>
                          </div>
                          <hr>
          <?php
                     }

                  }

                  function statusFilter(){
                    global $disp_head;
                    global $connection;
                    echo "<h3 class='page-header'><u>{$disp_head}</u></h3>";

                    $table = $_SESSION['curr_id']."books";

                    $query = "SELECT * FROM $table WHERE status = '{$disp_head}' ORDER BY id DESC";
                    $result = $connection->query($query);
                    confirmQuery($result);
                     while($row = $result->fetch_assoc()){
                        $flag = 1;

                        $act_id = $row['id'];
                        $act_bname = $row['bookName'];
                        $act_aname = $row['authorName'];
                        $act_img = $row['imgLink'];
                        $act_status = $row['status'];
                        $act_shelf = $row['shelf'];
                        $act_likes = $row['likes'];
                        $act_volid = $row['volId'];
                        ?>
                        <div class="clearfix row">
                          <img src=<?php echo $act_img; ?> class="floatLeft" alt="Sorry image not available!" style="margin-right:10px;width:80px;">
                            <div class="">
                              <h3 id="itemTitle">
                                <span><?php echo $act_bname; ?></span><small id="itemAuthor"> by <?php echo $act_aname; ?></small>
                              </h3>
                            </div>
                          </div>
                          <hr>
          <?php
                     }
                  }

                  function shelfDisplay(){
                    global $disp_head;
                    global $connection;
                    echo "<h3 class='page-header'><u>{$disp_head}</u></h3>";

                    $table = $_SESSION['curr_id']."books";

                    $query = "SELECT * FROM $table WHERE shelf = '{$_GET['shelf']}' ORDER BY id DESC";
                    $result = $connection->query($query);
                    confirmQuery($result);
                     while($row = $result->fetch_assoc()){
                        $flag = 1;

                        $act_id = $row['id'];
                        $act_bname = $row['bookName'];
                        $act_aname = $row['authorName'];
                        $act_img = $row['imgLink'];
                        $act_status = $row['status'];
                        $act_shelf = $row['shelf'];
                        $act_likes = $row['likes'];
                        $act_volid = $row['volId'];
                        ?>
                        <div class="clearfix row">
                          <img src=<?php echo $act_img; ?> class="floatLeft" alt="Sorry image not available!" style="margin-right:10px;width:80px;">
                            <div class="">
                              <h3 id="itemTitle">
                                <span><?php echo $act_bname; ?></span><small id="itemAuthor"> by <?php echo $act_aname; ?></small>
                              </h3>
                            </div>
                          </div>
                          <hr>
          <?php
                     }
                  }

                  function activityDisplay(){
                    global $disp_head;
                    global $connection;
                    echo "<h3 class='page-header'><u>{$disp_head}</u></h3>";
                    $table = "users";
                    $query = "SELECT id FROM $table WHERE username = '{$_GET['follow']}'";
                    $result = $connection->query($query);
                    confirmQuery($result);
                    $row = $result->fetch_assoc();

                    $table = $row['id']."activity";

                    $query = "SELECT * FROM $table WHERE visibility = 'public' ORDER BY id DESC";
                    $result = $connection->query($query);
                    confirmQuery($result);
                     while($row = $result->fetch_assoc()){
                       $flag = 1;

                       $act_id = $row['id'];
                       $act_bname = $row['bookName'];
                       $act_aname = $row['authorName'];
                       $act_img = $row['imgLink'];
                       $act_act = $row['activity'];
                       $act_support = $row['actSupport'];
                       $act_volid = $row['volId'];
                       $act_vis = $row['visibility'];
                        ?>
                        <div class="clearfix row">
                          <img src=<?php echo $act_img; ?> class="floatLeft" alt="Sorry image not available!" style="margin-right:10px;width:80px;">
                            <div class="">
                              <h3 id="itemTitle">
                                <span><?php echo $act_bname; ?></span><small id="itemAuthor"> by <?php echo $act_aname; ?></small>
                              </h3>
                              <p id="activity" style="font-weight:bold;color:orange;">
                                <?php
                                    switch($act_act){
                                      case 'status': echo "Changed reading status to: ".$act_support;
                                                      break;
                                      case 'shelf': echo "Book added to '".$act_support."' shelf.";
                                                      break;
                                      case 'like':    if($act_support)
                                                      echo "Liked this book.";
                                                      else
                                                      echo "Disliked this book.";
                                                      break;
                                    }
                                ?>
                              </p>
                            </div>
                          </div>
                          <hr>
          <?php
                     }
                  }

                 ?>



        <!-- ///////////////////////////////////////////////////////////////////////// -->

            </div>

            <!-- Sidebar -->
<?php if(isset($_SESSION['curr_id'])){
  include_once('includes/sidebar_p.php');
}
 ?>

        <!-- Footer -->
<?php include_once('includes/footer_p.php') ?>
