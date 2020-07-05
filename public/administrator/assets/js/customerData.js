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
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  //Initialize Database
  var db = firebase.firestore();
  let index = 1;

  $(document).ready(function () {
    db.collection("customer")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          $("#appending").append(
            "<tr><td id='name-" +
              index +
              "'></td><td id='address-" +
              index +
              "'></td><td id='number-" +
              index +
              "'></td></tr>"
          );
          $("#name-" + index).text(doc.data().A_name);
          $("#address-" + index).text(doc.data().C_address);
          $("#number-" + index).text(doc.data().B_number);

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
    textVal,
    inputText = document.getElementById("search");
  filter = inputText.value.toUpperCase();
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];

    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        // it didnt satisfied with td index 0
        for (ii = 0; ii < tr.length; ii++) {
          td = tr[i].getElementsByTagName("td")[1];

          if (td) {
            textValue = td.textContent || td.innerText;
            if (textValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              // it didnt satisfied with td index 0
              for (iii = 0; iii < tr.length; iii++) {
                td = tr[i].getElementsByTagName("td")[2];

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
