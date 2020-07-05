if (localStorage.getItem("viewerStatus") == "true") {
  // Viewer Things
  $(document).ready(function () {
    let count_viewer;
    $("#addMore").click(function () {
      // itemsNumber++;
      count_viewer++;
      $("#card-container-fluid").append(
        "<div class='form-group form-row'><div class='col-6'><input type='text' id='item-" +
          count_viewer +
          "' class='form-control form-inline' placeholder='Item' /></div><div class='col-6'><input type='number' id='quantity-" +
          count_viewer +
          "' class='form-control form-inline' placeholder='Quantity'/></div></div>"
      );
    });

    $("#save-purchase").click(function (e) {
      e.preventDefault();
      errorShow(
        ".main",
        "You are not authenticated as Admin, login as Admin to add Purchase Data!"
      );
    });
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
  // Declaring variables
  let SellerName;
  let SellerAddress;
  let SellerNumber;
  let items = [];
  let quantities = [];
  let count = 1;
  let totalPrice = 0;
  var d = new Date($.now());
  let month = d.getMonth() - 1;
  let time;
  let date;

  $(document).ready(function () {
    // ============Start Add button Click ================//
    $("#addMore").click(function () {
      // itemsNumber++;
      count++;
      $("#card-container-fluid").append(
        "<div class='form-group form-row'><div class='col-6'><input type='text' id='item-" +
          count +
          "' class='form-control form-inline' placeholder='Item' /></div><div class='col-6'><input type='number' id='quantity-" +
          count +
          "' class='form-control form-inline' placeholder='Quantity'/></div></div>"
      );
    });

    // ========== End Add button click ================//
    // ==========Start Save Data button click ====== ==//
    $("#save-purchase").click(function (e) {
      e.preventDefault();

      // Geting value form input fields
      SellerName = $("#name").val();
      SellerAddress = $("#address").val();
      SellerNumber = $("#number").val();
      totalPrice = $("#totalPrice").val();

      if (SellerName == "") {
        errorShow(".main", "Enter Sellers Name");
      } else {
        if (SellerAddress == "") {
          errorShow(".main", "Enter Sellers Address");
        } else {
          if (SellerNumber == "") {
            errorShow(".main", "Enter Sellers number");
          } else {
            if (totalPrice == "") {
              errorShow(".main", "Enter Total Price");
            } else {
              // Getting date and time //
              date = d.getDate() + ":" + month + ":" + d.getFullYear();
              time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

              // Getting value of each row added
              for (let i = 1; i < count + 1; i++) {
                items.push($("#item-" + i).val());
                quantities.push($("#quantity-" + i).val());
              }

              db.collection("purchased-data")
                .add({
                  A_SellerName: SellerName,
                  B_Selleraddress: SellerAddress,
                  C_SellerNumber: SellerNumber,
                  D_Items: items,
                  E_Quantities: quantities,
                  F_TotalPrice: totalPrice,
                  G_Date: date,
                  H_Time: time,
                  I_month: month,
                })
                .then(function (docRef) {
                  successShow(".main", "Data added succesfully!");
                  setTimeout(function () {
                    window.location.reload();
                  }, 3000);
                })
                .catch(function (error) {
                  errorShow(".main", error);
                });
            }
          }
        }
      }
    });
    //  ==========End Save Data button click ========= ===//
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
