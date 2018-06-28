<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container">

        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="home.php"><span class="glyphicon glyphicon-oil"></span> Biblio</a>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li>
                    <a href="home.php">Home</a>
                </li>
                <li>
                    <a href="profile.php">Profile</a>
                </li>
                <li class="list-group-item" style="margin:5px;border-radius:5px;">
                    <span id="torefresh">ActivityMode(<?php echo ucfirst($_SESSION['visibility']); ?>):</span>
                    <div class="material-switch pull-right">
                        <input id="switchVisibility" name="someSwitchOption001" type="checkbox"/>
                        <label for="switchVisibility" class="label-success"></label>
                    </div>
                </li>

            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li style="margin:10px;">
                <select id="mode" class="form-control" >

                   <option value='1'>Title</option>
                   <option value='2'>Author</option>
                   <option value='3'>Publisher</option>
                   <option value='4'>ISBN</option>
                   <option value='5'>Subject</option>

                </select>
              </li>
              <li>
                <form class="form-inline" style="position:relative;top:10px;">
                  <input class="form-control mr-sm-2" type="search" id="searchBar" placeholder="Search" name="Search" onkeyup="searchBooks(this.value,0);" onfocus="searchBooks(this.value,0);">
                  <span class="glyphicon glyphicon-search" style="color:grey;cursor:pointer;padding-left:3px;font-size:20px;" onmouseenter="this.style.color='white';" onmouseleave="this.style.color='grey';" onclick="search();"></span>
                </form>
              </li>
              <li>
                <a href="#"><?php echo $_SESSION['curr_user']; ?></a>
              </li>

              <li>
                  <a href="logout.php">Logout</a>
              </li>
            </ul>

        </div>

    </div>

</nav>
