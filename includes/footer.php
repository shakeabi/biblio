<footer>
    <div class="row">
        <div class="col-lg-12">
            Made with &#10084; by <a href="https://github.com/shakeabi">Abishake</a>
        </div>

    </div>
</footer>

</div>

<script type="text/javascript">

  var modal = document.getElementById('myModal');
  var mContent = document.getElementById("modalContent");
  var btn = document.getElementById("searchBar");
  btn.onfocus = function() {
    modal.style.display = "block";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  }

  var rect = btn.getBoundingClientRect();
  var width = Math.round(rect.right - rect.left);
  console.log(rect.left);
  mContent.style.margin = (rect.bottom+10) + "px auto";
  mContent.style.left = (Math.round(rect.left)-10)+ "px";
  mContent.style.width = (width+80) + "px";

  function search(){
      var searchInput = document.getElementById("searchBar");
      searchBooks(searchInput.value,1);
  }


</script>

<script src="js/homedata.js"></script>
<script src="js/jquery.js"></script>
<script src="js/bootstrap.min.js"></script>

</body>

</html>
