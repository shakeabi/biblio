<?php
include_once('config.php');
 ?>

<div class="col-md-4">

    <div class="well">
        <a href="add_note.php"> <h4><span class="glyphicon glyphicon-th-list"></span> Activity Log</h4></a>

    </div>

    <div class="well">
        <h4><u>Status Categories:</u></h4>
        <ul>
          <li style="margin:3px;"><button class="btn btn-primary">Want to Read</button></li>
          <li style="margin:3px;"><button class="btn btn-primary">Currently Reading</button></li>
          <li style="margin:3px;"><button class="btn btn-primary">Finished Reading</button></li>
        </ul>

    </div>
    <div class="well">
          <form action="" method="post">
          <div class="input-group">
              <input name="shelf_name" type="text" class="form-control" placeholder="Add a shelf" required>
              <span class="input-group-btn">
                  <button name="add_shelf" class="btn btn-default" type="submit">
                      <span class="glyphicon glyphicon-plus"></span>
              </button>
              </span>
          </div>
          </form>

    </div>
    <div class="well">
        <h4><u>Following:</u></h4>

    </div>


</div>

</div>

<hr>
