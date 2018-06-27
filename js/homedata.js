var randBooks = ["brief+history","diary+of","harry+potter","pride","alice","jungle+book"];

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
  var title = createEle("h2",{attr:"id",val:"itemTitle"},ftitle + "<small id='itemAuthor'> by " + fauthor + "</small>");
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
  var itemStatus = createEle("select",{attr:"class",val:"form-control"},"<option selected disabled>Status</option><option value='1'>Want to read</option><option value='2'>Currently reading</option><option value='3'>Finished reading</option>")
  itemStatus.setAttribute("title","Status");
  statusDiv.appendChild(itemStatus);
  var shelvesDiv = createEle("div",{attr:"class",val:"col-sm-6"},"");
  var currShelf = createEle("select",{attr:"class",val:"form-control"},"<option selected disabled>Shelf</option><option value='1'>Want to read</option><option value='2'>Currently reading</option><option value='3'>Finished reading</option>")
  currShelf.setAttribute("title","Status");
  shelvesDiv.appendChild(currShelf);

  var optionsRow2 = createEle("div",{attr:"class",val:"row"},"");
  optionsRow2.setAttribute("style","margin:10px;");

  var like = createEle("li",{attr:"id",val:"like"},"<a href:'#' style='cursor:pointer;'>Like</a>");

  optionsRow1.appendChild(statusDiv);
  optionsRow1.appendChild(shelvesDiv);
  optionsRow2.appendChild(like);
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

  document.getElementById("modalContent").appendChild(encloser);
  document.getElementById("modalContent").appendChild(hr1);

}

function getRandomInt(max) {
  return Math.floor(Math.random() * (max));
}

function initialise(){
  var xmlhttp;
  if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
  }
   else{
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  var randString = randBooks[getRandomInt(randBooks.length)];
  var url = "https://www.googleapis.com/books/v1/volumes?q="+randString;

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
  console.log(document.getElementById('mode').value);
  console.log(url);


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

          console.log(booksData);
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





initialise();
