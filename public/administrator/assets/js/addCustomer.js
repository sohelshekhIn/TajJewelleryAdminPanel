if (localStorage.getItem("viewerStatus") == "true") {
  // Viewer Things
  $(document).ready(function () {
    let count_viewer;
    $("#addMore").click(function () {
      // itemsNumber++;
      count_viewer++;
      $("#card-container-fluid").append(
        "<div class='form-group form-row '><div class='col'><input type='text'class='form-control form-inline' id='item-" +
          count_viewer +
          "' placeholder='Item'/></div><div class='col'><input type='number'class='form-control form-inline'placeholder='Quantity' id='quantity-" +
          count_viewer +
          "' /></div><div class='col'><input type='number'class='form-control form-inline'placeholder='Price' id='price-" +
          count_viewer +
          "' /></div></div>"
      );
    });

    $("#save-sales").click(function (e) {
      e.preventDefault();
      errorShow(
        ".main",
        "You are not authenticated as Admin, login as Admin to add Sales!"
      );
    });

    $("#checkOld").click(function (e) {
      e.preventDefault();
      errorShow(
        ".main",
        "You are not authenticated as Admin, login as Admin to Check database!"
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

  let id;
  var new_customer = "new_customer";
  var customer_logs = "customer-logs";
  let salesRead;

  // Declaring variables
  let CustomerName;
  let CustomerAddress;
  let CustomerNumber;
  let CustomerType;
  let count = 1;
  let CustomerSales = [];
  let items = [];
  let quantities = [];
  let prices = [];
  let rowPrice = [];
  let finalPrice = 0;
  var d = new Date($.now());
  let month = d.getMonth() + 1;
  let time;
  let date;

  $(document).ready(function () {
    $("#addMore").click(function () {
      // itemsNumber++;
      count++;
      $("#card-container-fluid").append(
        "<div class='form-group form-row '><div class='col'><input type='text'class='form-control form-inline' id='item-" +
          count +
          "' placeholder='Item'/></div><div class='col'><input type='number'class='form-control form-inline'placeholder='Quantity' id='quantity-" +
          count +
          "' /></div><div class='col'><input type='number'class='form-control form-inline'placeholder='Price' id='price-" +
          count +
          "' /></div></div>"
      );
    });

    $("#save-sales").click(function (e) {
      e.preventDefault();
      CustomerName = $("#name").val();
      CustomerAddress = $("#address").val();
      CustomerNumber = $("#number").val();
      CustomerType = $("#type").val();

      date = d.getDate() + ":" + month + ":" + d.getFullYear();
      time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

      for (let i = 1; i < count + 1; i++) {
        items.push($("#item-" + i).val());
        quantities.push($("#quantity-" + i).val());
        prices.push($("#price-" + i).val());
      }

      // multiplying quantities and prices of item of each row in rowPrice array
      for (let ii = 0; ii < count; ii++) {
        rowPrice.push(quantities[ii] * prices[ii]);
      }

      // Adding each row price to final price array
      for (let iii = 0; iii < count; iii++) {
        finalPrice += Number(rowPrice[iii]);
      }

      if (CustomerType == "New") {
        //Adding user details to customer document
        db.collection(new_customer)
          .doc(CustomerNumber)
          .set({
            A_name: CustomerName,
            B_address: CustomerAddress,
            C_number: CustomerNumber,
            D_sales: CustomerSales,
          })
          .then(function (result) {})
          .catch(function (error) {
            alert(error);
            errorShow(".main", "ERROR: " + error);
          });

        db.collection("customer").doc(CustomerNumber).set({
          A_name: CustomerName,
          B_number: CustomerNumber,
          C_address: CustomerAddress,
        });
      } else {
        db.collection("customer")
          .doc(CustomerNumber)
          .onSnapshot(function (doc) {
            if (doc.data() == undefined) {
              db.collection("customer").doc(CustomerNumber).set({
                A_name: CustomerName,
                B_number: CustomerNumber,
                C_address: CustomerAddress,
              });
            }
          });
      }

      db.collection(new_customer)
        .doc(CustomerNumber)
        .onSnapshot(function (doc) {
          if (doc.data() == undefined) {
            db.collection(new_customer)
              .doc(CustomerNumber)
              .set({
                D_sales: [],
              })
              .then(function () {
                db.collection(new_customer)
                  .doc(CustomerNumber)
                  .onSnapshot(function (doc) {
                    salesRead = doc.data().D_sales;
                  });
              })
              .catch(function (error) {
                errorShow(".main", error);
                console.log(error);
              });
          } else {
            db.collection(new_customer)
              .doc(CustomerNumber)
              .onSnapshot(function (doc) {
                salesRead = doc.data().D_sales;
              });
          }
        });

      // Adding customer
      db.collection(customer_logs)
        .add({
          A_name: CustomerName,
          B_address: CustomerAddress,
          C_number: CustomerNumber,
          D_type: CustomerType,
          E_date: date,
          F_time: time,
          G_item: items,
          H_quantity: quantities,
          I_price: prices,
          J_totalPrice: finalPrice,
        })
        .then(function (docRef) {
          setTimeout(function () {
            // Updating customer with sales id
            id = docRef.id;
            salesRead.push(id);
            db.collection(new_customer)
              .doc(CustomerNumber)
              .update({
                D_sales: salesRead,
              })
              .then(function () {
                successShow(".main", "Sales add successful!");
              })
              .catch(function (error) {
                errorShow(".main", "ERROR: " + error);
              });

            //Entering sold price data to database
            db.collection("sold-data")
              .add({
                A_salePrice: finalPrice,
                B_month: month,
                C_saleId: id,
              })
              .then(function (RefID) {
                // On sucess
                setTimeout(function () {
                  window.location.reload();
                }, 3500);
              })
              .catch(function (error) {
                errorShow(".main", "ERROR: " + error);
                console.log(error);
              });
          }, 3200);
        })
        .catch(function (error) {
          errorShow(".main", "ERROR: " + error);
          console.error("Error adding document: ", error);
        });
    });

    $("#checkOld").click(function (e) {
      e.preventDefault();
      CustomerType = $("#type").val();
      CustomerNumber = $("#number").val();

      if (CustomerType == "Old") {
        db.collection("customer")
          .where("B_number", "==", CustomerNumber)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              // doc.data() is never undefined for query doc snapshots
              successShow(".main", "Customer found!");

              CustomerName = doc.data().A_name;
              CustomerNumber = doc.data().B_number;
              CustomerAddress = doc.data().C_address;

              $("#name").val(CustomerName);
              $("#address").val(CustomerAddress);
              $("#number").val(CustomerNumber);
              $("#type").val("Old");
            });
          })
          .catch(function (error) {
            console.log("Error getting documents: " + error);
          });
      } else {
        if (CustomerType == "New") {
          errorShow(".main", "Customer type is New");
        }
      }
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
