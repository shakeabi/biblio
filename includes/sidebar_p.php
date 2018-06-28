<?php
include_once('config.php');
if(isset($_POST['add_shelf'])){
  $table = $_SESSION['curr_id']."shelves";

  $query = "INSERT INTO $table(shelfName) ";
  $query .= "VALUES('{$_POST['shelf_name']}')";
  $result = $connection->query($query);
  confirmQuery($result);
}
 ?>

<div class="col-md-4">

    <div class="well">
        <a href="profile.php?mode=activity"> <h4><span class="glyphicon glyphicon-th-list"></span> Activity Log</h4></a>

    </div>

    <div class="well">
        <h4><u>Status Categories:</u></h4>
        <ul>
          <li style="margin:3px;"><button class="btn btn-primary" onclick="location.href='profile.php?mode=status&status=1';">Want to Read</button></li>
          <li style="margin:3px;"><button class="btn btn-primary" onclick="location.href='profile.php?mode=status&status=2';">Currently Reading</button></li>
          <li style="margin:3px;"><button class="btn btn-primary" onclick="location.href='profile.php?mode=status&status=3';">Finished Reading</button></li>
        </ul>

    </div>
    <div class="well">
          <form action="" method="post" style="margin-bottom:15px;">
          <div class="input-group">
              <input name="shelf_name" type="text" class="form-control" placeholder="Add a shelf" required>
              <span class="input-group-btn">
                  <button name="add_shelf" class="btn btn-default" type="submit">
                      <span class="glyphicon glyphicon-plus"></span>
              </button>
              </span>
          </div>
          </form>
          <ul>
            <?php
              $table = $_SESSION['curr_id']."shelves";
              $query = "SELECT DISTINCT shelfName FROM $table";
              $result = $connection->query($query);
              confirmQuery($result);
              while($row = $result->fetch_assoc()){
                $s_name = $row['shelfName'];
                if($s_name!=""){
                ?>

              <li style="margin-top:3px;"><button class="btn btn-success" onclick="location.href='profile.php?mode=shelf&shelf=<?php echo $s_name;?>';"><?php echo $s_name;?></button></li>

            <?php
                }
              }
            ?>

          </ul>


    </div>
    <div class="well">
        <h4><u>Following:</u></h4>

    </div>


</div>

</div>

<hr>
