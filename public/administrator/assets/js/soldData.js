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
    __FIREBASE_CONFIG__
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  //Initialize Database
  var db = firebase.firestore();
  let index = 1;
  let items;
  let quantity;
  let price;
  let total;
  let itemsDisplay = "";
  let quantityDisplay = "";
  let priceDisplay = "";
  let totalDisplay = "";

  $(document).ready(function () {
    db.collection("customer-logs")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          $("#appending").append(
            "<tr><td id='dateNtime-" +
              index +
              "'><sohel-table id='date-" +
              index +
              "'></sohel-table><br><sohel-table id='time-" +
              index +
              "'></sohel-table></td><td id='name-" +
              index +
              "'></td><td id='number-" +
              index +
              "'></td><td id='items-" +
              index +
              "'></td><td id='quantity-" +
              index +
              "'></td><td id='price-" +
              index +
              "'></td><td id='total-" +
              index +
              "'></td></tr>"
          );

          $("#date-" + index).text(doc.data().E_date);
          $("#time-" + index).text(doc.data().F_time);
          $("#name-" + index).text(doc.data().A_name);
          $("#number-" + index).text(doc.data().C_number);
          $("#total-" + index).text(doc.data().J_totalPrice);

          //   For items
          items = doc.data().G_item;
          for (let ind = 0; ind < items.length; ind++) {
            itemsDisplay += items[ind] + ", ";
          }
          $("#items-" + index).text(itemsDisplay);
          itemsDisplay = "";

          //   For quantity
          quantity = doc.data().H_quantity;
          for (let ind = 0; ind < quantity.length; ind++) {
            quantityDisplay += quantity[ind] + ", ";
          }
          $("#quantity-" + index).text(quantityDisplay);
          quantityDisplay = "";

          //   Price total
          price = doc.data().I_price;
          for (let ind = 0; ind < price.length; ind++) {
            priceDisplay += price[ind] + ", ";
          }
          $("#price-" + index).text(priceDisplay);
          priceDisplay = "";

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
    iiii,
    txtValue,
    textValue,
    textVal,
    txtVal;
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
                    for (iiii = 0; iiii < tr.length; iiii++) {
                      td = tr[i].getElementsByTagName("td")[6];

                      if (td) {
                        txtVal = td.textContent || td.innerText;
                        if (txtVal.toUpperCase().indexOf(filter) > -1) {
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
    }
  }
}

function hi() {
  console.log("hello");
}
