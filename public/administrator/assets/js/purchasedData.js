if (localStorage.getItem("viewerStatus") == "true") {
  // Viewer Things
  $(document).ready(function () {
    errorShow(".main", "Authenticate as Admin to view Seller Data");
  });
} else {
  if (localStorage.getItem("loginStatus") == "true") {
    //Admin
    xea_12 = true;
  } else {
    window.location.replace("../");
  }
}

if (xea_12 == true) {
  var firebaseConfig = {
    __FIREBASE_CONFIG__,
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  //Initialize Database
  var db = firebase.firestore();
  let dataSize = 0;
  let index = 1;
  let items;
  let itemsDisplay = "";

  $(document).ready(function () {
    db.collection("purchased-data")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          $("#appending").append(
            "<tr><td id='date-" +
              index +
              "'></td><td id='seller-details'> <sohel-table id='name-" +
              index +
              "'></sohel-table ><br /><sohel-table id='address-" +
              index +
              "'></sohel-table> <br /><sohel-table id='number-" +
              index +
              "'></sohel-table></td><td id='items-" +
              index +
              "'></td><td id='cost-" +
              index +
              "'></td></tr>"
          );
          $("#date-" + index).text(doc.data().G_Date);
          $("#name-" + index).text(doc.data().A_SellerName);
          $("#address-" + index).text(doc.data().B_Selleraddress);
          $("#number-" + index).text(doc.data().C_SellerNumber);
          $("#cost-" + index).text(doc.data().F_TotalPrice);

          items = doc.data().D_Items;

          for (let ind = 0; ind < items.length; ind++) {
            itemsDisplay += items[ind] + ", ";
          }
          $("#items-" + index).text(itemsDisplay);
          itemsDisplay = "";
          index++;
        });
      });
  });
}

function successShow(element, message) {
  $(element).append(
    "<div class='alert alert-success alert-dismissible' id='alert-box' ><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
      message +
      "</div>"
  );
  setTimeout(function () {
    $("#alert-box").alert("close");
  }, 3000);
}

function errorShow(element, message) {
  $(element).append(
    "<div class='alert alert-danger alert-dismissible' id='alert-box' ><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
      message +
      "</div>"
  );
  setTimeout(function () {
    $("#alert-box").alert("close");
  }, 5000);
}

function searchTable() {
  // Declare variables
  var inputText,
    filter,
    table,
    tr,
    td,
    i,
    ii,
    iii,
    txtValue,
    textValue,
    textVal;

  inputText = document.getElementById("search");
  filter = inputText.value.toUpperCase();
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];

    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        // it didnt satisfied with td index 0
        for (ii = 0; ii < tr.length; ii++) {
          td = tr[i].getElementsByTagName("td")[2];

          if (td) {
            textValue = td.textContent || td.innerText;
            if (textValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              // it didnt satisfied with td index 0
              for (iii = 0; iii < tr.length; iii++) {
                td = tr[i].getElementsByTagName("td")[3];

                if (td) {
                  textVal = td.textContent || td.innerText;
                  if (textVal.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                  } else {
                    // it didnt satisfied with td index 0
                    tr[i].style.display = "none";
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
