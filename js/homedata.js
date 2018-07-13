var randBooks = ["brief+history","diary+of","harry+potter","pride","alice","jungle+book","famous+five","mystery"];
var shelvesList = [];

document.getElementById('switchVisibility').onclick = function(){
  var xmlhttp;
  if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
  }
   else{
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  var url = "toggleVisibility.php";
  xmlhttp.onreadystatechange = function(){
	    if(this.readyState==4&&this.status==200){
        if(this.responseText == true)
          console.log('visibility changed');
        else {
          console.log("couldn't change");
        }
	    }
    };

    xmlhttp.open("POST",url,true);//true implies asynchronous
    xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xmlhttp.send();

    load();
}

function createEle(ele,attribute,displayValue){
  var temp = document.createElement(ele);
  temp.setAttribute(attribute.attr,attribute.val);
  temp.innerHTML = displayValue;

  return temp;
}

function clearResults(id){
  document.getElementById(id).innerHTML = "";
}

function displayBooks(ftitle,fauthor,fdesc,fimgLink,favgRating,fvolumeId,readMore){
  //createEle("",{attr:"",val:""},""); template
  var encloser = createEle("div",{attr:"class",val:"clearfix"},"");
  encloser.classList.add("row");

  var img = createEle("img",{attr:"src",val:fimgLink},"");
  img.setAttribute("class","floatLeft");
  img.setAttribute("alt","Sorry image not available!");

  var bookDetails = createEle("div",{attr:"class",val:"col-sm-7"},"");
  var title = createEle("h2",{attr:"id",val:"itemTitle"},"<span>" + ftitle +"</span>"+ "<small id='itemAuthor'> by " + fauthor + "</small>");
  var hr1 = document.createElement("hr");
  var hr2 = document.createElement("hr");
  var description = createEle("p",{attr:"id",val:"itemDesc"},fdesc);
  if(readMore){
    var anchor = createEle("a",{attr:"href",val:"https://books.google.co.in/books?id="+fvolumeId},"Read More");
    description.appendChild(anchor);
  }
  var avgRating = createEle("p",{attr:"id",val:"itemAvgRating"},"Avg. Rating: "+favgRating);
  avgRating.setAttribute("style","font-weight:bold;");

  bookDetails.appendChild(title);
  bookDetails.appendChild(avgRating);
  bookDetails.appendChild(hr1);
  bookDetails.appendChild(description);

  var optionsDiv = createEle("div",{attr:"class",val:"col-sm-3"},"");

  var optionsRow1 = createEle("div",{attr:"class",val:"row"},"");

  var statusDiv = createEle("div",{attr:"class",val:"col-sm-6"},"");
  var itemStatus = createEle("select",{attr:"class",val:"form-control"},"<option selected disabled>Status</option><option value='Want to read'>Want to read</option><option value='Currently reading'>Currently reading</option><option value='Finished reading'>Finished reading</option>");
  itemStatus.setAttribute("title","Status");
  itemStatus.addEventListener("change",statusChange,false);
  statusDiv.appendChild(itemStatus);

  var shelvesDiv = createEle("div",{attr:"class",val:"col-sm-6"},"");
  var currShelf = createEle("select",{attr:"class",val:"form-control"},"<option selected disabled>Shelf</option>");

  for(var i=0;i<shelvesList.length;++i){
    currShelf.innerHTML += "<option value='"+shelvesList[i]+"'>"+shelvesList[i]+"</option>";
  }

  currShelf.setAttribute("title","Status");
  currShelf.addEventListener("change",shelfChange,false);
  shelvesDiv.appendChild(currShelf);

  var optionsRow2 = createEle("div",{attr:"class",val:"row"},"");
  optionsRow2.setAttribute("style","margin:10px;");

  var like = createEle("li",{attr:"id",val:"likeBook"},"<a href:'#' style='cursor:pointer;'>Like <span class='glyphicon glyphicon-thumbs-up' style='cursor:pointer;'></span></a>");
  like.addEventListener("click",likeHandler,false);
  var reviewInput = createEle("textarea",{attr:"id",val:"review"},"");
  reviewInput.setAttribute("class","form-control");
  reviewInput.setAttribute("rows","4");
  reviewInput.setAttribute("cols","30");
  var review = createEle("li",{attr:"id",val:"reviewBook"},"<a href:'#' style='cursor:pointer;'>Submit Review</a>");
  review.addEventListener("click",reviewHandler,false);


  var volAnchor = createEle("a",{attr:"href",val:"https://books.google.co.in/books?id="+fvolumeId},"GBooks Link");

  optionsRow1.appendChild(statusDiv);
  optionsRow1.appendChild(shelvesDiv);
  optionsRow2.appendChild(like);
  optionsRow2.appendChild(reviewInput);
  optionsRow2.appendChild(review);
  optionsRow2.appendChild(volAnchor);
  optionsDiv.appendChild(optionsRow1);
  optionsDiv.appendChild(optionsRow2);

  encloser.appendChild(img);
  encloser.appendChild(bookDetails);
  encloser.appendChild(optionsDiv);

  document.getElementById("displayRegion").appendChild(encloser);
  document.getElementById("displayRegion").appendChild(hr2);

}

function displayDySearchBooks(ftitle,fauthor,fimgLink){
  //createEle("",{attr:"",val:""},"");
  var encloser = createEle("div",{attr:"class",val:"clearfix"},"");

  var img = createEle("img",{attr:"src",val:fimgLink},"");
  img.setAttribute("class","floatLeft");
  img.setAttribute("alt","Sorry image not available!");
  img.setAttribute("width","50px");

  var bookDetails = createEle("div",{attr:"class",val:"bookDataText"},"");
  var title = createEle("h5",{attr:"id",val:"itemTitle"},ftitle + "<small id='itemAuthor'> by " + fauthor + "</small>");
  var hr1 = document.createElement("hr");

  bookDetails.appendChild(title);

  encloser.appendChild(img);
  encloser.appendChild(bookDetails);
  encloser.addEventListener("click",searchClickHandler,false);
  encloser.setAttribute("style","cursor:pointer");

  document.getElementById("modalContent").appendChild(encloser);
  document.getElementById("modalContent").appendChild(hr1);

}

function getRandomInt(max) {
  return Math.floor(Math.random() * (max));
}

function getShelfValues(){
  var xmlhttp;
  if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
  }
   else{
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  var url = "getShelves.php";
  var parameter = "userId="+curr_user_id;
  xmlhttp.onreadystatechange = function(){
	    if(this.readyState==4&&this.status==200){
        shelvesList = JSON.parse(this.responseText);
	    }
    };

    xmlhttp.open("POST",url,true);//true implies asynchronous
    xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xmlhttp.send(parameter);


}

function initialise(){
  var xmlhttp;
  if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
  }
   else{
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  getShelfValues();

  var randString = randBooks[getRandomInt(randBooks.length)];
  // var randString = String(1000000000000+Math.round(Math.random()*9999999999999));
  var url = "https://www.googleapis.com/books/v1/volumes?q="+randString+"&key=AIzaSyDYGGsWxP-2k2HHGLblEj5282E0Ak2HNFg";

  xmlhttp.onreadystatechange = function(){
	    if(this.readyState==4&&this.status==200){
	    	var booksData = JSON.parse(this.responseText);
	    	if(booksData.totalItems!=0){
          for(i=0;i<booksData.items.length;++i){
            var title = booksData.items[i].volumeInfo.title;
            var author = booksData.items[i].volumeInfo.authors?booksData.items[i].volumeInfo.authors[0]:null;
            var desc = booksData.items[i].volumeInfo.description?booksData.items[i].volumeInfo.description:null;
            var imgLink = booksData.items[i].volumeInfo.imageLinks?booksData.items[i].volumeInfo.imageLinks.thumbnail:null;
            var avgRating = booksData.items[i].volumeInfo.averageRating?booksData.items[i].volumeInfo.averageRating:"NA";
            var volumeId = booksData.items[i].id;
            var readMore = false;
            if(desc!=null && desc.length >= 350){
              desc = desc.substr(0,349) + "...";
              readMore = true;
            }
            displayBooks(title,author,desc,imgLink,avgRating,volumeId,readMore);
          }


	    	}
	    	else{
          var pass = document.getElementById("displayRegion");
          nothingToDisplay(pass);
		    }
	    }
    };
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}

function likeHandler(e){

  if(e.target.textContent == "Like "){
    console.log("changing");
    e.target.innerHTML = "Dislike <span class='glyphicon glyphicon-thumbs-down' style='cursor:pointer;'></span>";
  }
  else{
    e.target.innerHTML = "Like <span class='glyphicon glyphicon-thumbs-up' style='cursor:pointer;'></span>";
  }

  var parent = e.target.parentNode.parentNode.parentNode.parentNode;
  var auth = parent.children[1].firstChild.children[1].textContent;
  var bookId = parent.children[2].children[1].children[3].href;
  bookId = bookId.substring(bookId.indexOf('id=')+3);
  var bookObj = {

    title:  parent.children[1].firstChild.firstChild.textContent,
    author: auth.substring(4),
    action: "like",
    volId:  bookId,
    support: '1',
  }
  console.log(bookObj);

  var xmlhttp;
  if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
  }
   else{
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  var url = "addActivity.php";
  var parameter = "actObj="+JSON.stringify(bookObj);

  xmlhttp.onreadystatechange = function(){
      if(this.readyState==4&&this.status==200){
        if(this.responseText == true)
        console.log('liked successfully!');
      }
  }
  xmlhttp.open("POST",url,true);
  xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
  xmlhttp.send(parameter);
}

function load()
{   url = 'refresher.php';
    element = document.getElementById('refresh');
    req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send(null);

    element.innerHTML = req.responseText;
    console.log("refreshing");
}

function notAldreadyRead(volId){
  var flag = 0;
  var flag_response = 0;
  console.log("checking");


  if(flag_response){
      if(flag==0){
      return false;
    }
    else {
      return true;
    }
  }
}

function nothingToDisplay(obj){
  obj.innerHTML = "Nothing To Display!";
}

function searchBooks(input,isSearchButtonClicked){

  var xmlhttp;
  if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
  }
   else{
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  var url;
  //getting mode...
  switch(document.getElementById('mode').value){
    case '1': url = "https://www.googleapis.com/books/v1/volumes?q="+input;break;
    case '2': url = "https://www.googleapis.com/books/v1/volumes?q=+inauthor:"+input;break;
    case '3': url = "https://www.googleapis.com/books/v1/volumes?q=+inpublisher:"+input;break;
    case '4': url = "https://www.googleapis.com/books/v1/volumes?q=+isbn:"+input;break;
    case '5': url = "https://www.googleapis.com/books/v1/volumes?q=+subject:"+input;break;
    default: url = "https://www.googleapis.com/books/v1/volumes?q="+input;
  }
    
    url+="&key=AIzaSyDYGGsWxP-2k2HHGLblEj5282E0Ak2HNFg";


  xmlhttp.onreadystatechange = function(){
	    if(this.readyState==4&&this.status==200){

        if(isSearchButtonClicked){
            clearResults('displayRegion');
        }
	    	var booksData = JSON.parse(this.responseText);
	    	if(booksData.totalItems!=0){
          if(!isSearchButtonClicked){
            clearResults("modalContent");
          }


          var max = isSearchButtonClicked?booksData.items.length:((booksData.items.length>5)?5:booksData.items.length);
          for(i=0;i<max;++i){
            var title = booksData.items[i].volumeInfo.title;
            var author = booksData.items[i].volumeInfo.authors?booksData.items[i].volumeInfo.authors[0]:"NA";
            var desc = booksData.items[i].volumeInfo.description?booksData.items[i].volumeInfo.description:"";
            var imgLinks = booksData.items[i].volumeInfo.imageLinks?booksData.items[i].volumeInfo.imageLinks.smallThumbnail:null;
            var avgRating = booksData.items[i].volumeInfo.averageRating?booksData.items[i].volumeInfo.averageRating:"NA";
            var volumeId = booksData.items[i].id;
            var readMore = false;

            if(isSearchButtonClicked){
              if(desc!=null && desc.length >= 350){
                desc = desc.substr(0,349) + "...";
                readMore = true;
              }
              imgLinks = booksData.items[i].volumeInfo.imageLinks?booksData.items[i].volumeInfo.imageLinks.thumbnail:null;
              document.getElementById('pageHeading').innerHTML = "Search Results:";
              displayBooks(title,author,desc,imgLinks,avgRating,volumeId,readMore);
            }
            else {
              if(title!=null && title.length >= 20){
                title = title.substr(0,19) + "...";
              }
              displayDySearchBooks(title,author,imgLinks);
            }
          }


	    	}
	    	else{
          var pass = document.getElementById("modalContent");
          nothingToDisplay(pass);
		    }
	    }
    };
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}

function searchClickHandler(e){
  var volId = this.firstChild.src;
  volId = volId.substring(volId.indexOf('id=')+3);
  volId = volId.substring(0,volId.indexOf('&'));
  console.log(volId);


    var xmlhttp;
    if (window.XMLHttpRequest) {
          xmlhttp = new XMLHttpRequest();
    }
     else{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url = "https://www.googleapis.com/books/v1/volumes?q="+volId;

    clearResults('displayRegion');

    xmlhttp.onreadystatechange = function(){
  	    if(this.readyState==4&&this.status==200){

  	    	var booksData = JSON.parse(this.responseText);
  	    	if(booksData.totalItems!=0){
            var max = 1;
            for(i=0;i<max;++i){
              var title = booksData.items[i].volumeInfo.title;
              var author = booksData.items[i].volumeInfo.authors?booksData.items[i].volumeInfo.authors[0]:"NA";
              var desc = booksData.items[i].volumeInfo.description?booksData.items[i].volumeInfo.description:"";
              var imgLinks = booksData.items[i].volumeInfo.imageLinks?booksData.items[i].volumeInfo.imageLinks.thumbnail:null;
              var avgRating = booksData.items[i].volumeInfo.averageRating?booksData.items[i].volumeInfo.averageRating:"NA";
              var volumeId = booksData.items[i].id;
              var readMore = false;


                if(desc!=null && desc.length >= 350){
                  desc = desc.substr(0,349) + "...";
                  readMore = true;
                }
                document.getElementById('pageHeading').innerHTML = "Search Results:";
                displayBooks(title,author,desc,imgLinks,avgRating,volumeId,readMore);
              }
            }


  	    	}
  	    }
      xmlhttp.open("GET",url,true);
      xmlhttp.send();
}

function shelfChange(e){//change the volid detector when adding reviews
  var parent = e.target.parentNode.parentNode.parentNode.parentNode;
  var auth = parent.children[1].firstChild.children[1].textContent;
  var bookId = parent.children[2].children[1].children[3].href;
  bookId = bookId.substring(bookId.indexOf('id=')+3);
  var bookObj = {

    title:  parent.children[1].firstChild.firstChild.textContent,
    author: auth.substring(4),
    action: "shelf",
    volId:  bookId,
    support:  e.target.value,
  }
  console.log(bookObj);

  var xmlhttp;
  if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
  }
   else{
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  var url = "addActivity.php";
  var parameter = "actObj="+JSON.stringify(bookObj);

  xmlhttp.onreadystatechange = function(){
	    if(this.readyState==4&&this.status==200){
        if(this.responseText == true)
        console.log('shelved successfully!');
      }
  }
  xmlhttp.open("POST",url,true);
  xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
  xmlhttp.send(parameter);

}

function statusChange(e){
  var parent = e.target.parentNode.parentNode.parentNode.parentNode;
  var auth = parent.children[1].firstChild.children[1].textContent;
  var bookId = parent.children[2].children[1].children[3].href;
  bookId = bookId.substring(bookId.indexOf('id=')+3);
  var bookObj = {

    title:  parent.children[1].firstChild.firstChild.textContent,
    author: auth.substring(4),
    action: "status",
    volId:  bookId,
    support:  e.target.value,
  }
  console.log(bookObj);

  var xmlhttp;
  if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
  }
   else{
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  var url = "addActivity.php";
  var parameter = "actObj="+JSON.stringify(bookObj);

  xmlhttp.onreadystatechange = function(){
	    if(this.readyState==4&&this.status==200){
        if(this.responseText == true)
        console.log('statused successfully!');
      }
  }
  xmlhttp.open("POST",url,true);
  xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
  xmlhttp.send(parameter);

}

function reviewHandler(e){
  if(e.target.textContent == "Submit Review"){
    e.target.innerHTML = "Review Submitted";

    var parent = e.target.parentNode.parentNode.parentNode.parentNode;
    var auth = parent.children[1].firstChild.children[1].textContent;
    var bookId = parent.children[2].children[1].children[3].href;
    bookId = bookId.substring(bookId.indexOf('id=')+3);
    var review = parent.children[2].children[1].children[1].value;
    var bookObj = {

      title:  parent.children[1].firstChild.firstChild.textContent,
      author: auth.substring(4),
      action: "review",
      volId:  bookId,
      support: review,
    }
    console.log(bookObj);

    var xmlhttp;
    if (window.XMLHttpRequest) {
          xmlhttp = new XMLHttpRequest();
    }
     else{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url = "addActivity.php";
    var parameter = "actObj="+JSON.stringify(bookObj);

    xmlhttp.onreadystatechange = function(){
        if(this.readyState==4&&this.status==200){
          if(this.responseText == true)
          console.log('reviewed successfully!');
        }
    }
    xmlhttp.open("POST",url,true);
    xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xmlhttp.send(parameter);
  }


}





initialise();
