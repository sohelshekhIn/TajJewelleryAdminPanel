var firebaseConfig = {
  __FIREBASE_CONFIG__
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//Initialize Database
var db = firebase.firestore();

// Declaring dom variables
let totalCustomer = "#totalCustomersHead";
let newCustomer = "#newCustomersHead";
let totalSold = "#totalSoldHead";
let purchased = "#purchasedHead";
let totalPriceDisplay;
let totalPrice = 0;
let totalPurchasedDisplay;
let totalPurchasedPrice = 0;

db.collection("customer")
  .get()
  .then(function (res) {
    $(totalCustomer).text(res.size);
  });

db.collection("new_customer")
  .get()
  .then(function (res) {
    $(newCustomer).text(res.size);
  });

db.collection("sold-data")
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      totalPrice += Number(doc.data().A_salePrice);
    });
    totalPriceDisplay = totalPrice + " ₹";
    $(totalSold).text(totalPriceDisplay);
  });

db.collection("purchased-data")
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      totalPurchasedPrice += Number(doc.data().F_TotalPrice);
    });
    totalPurchasedDisplay = totalPurchasedPrice + " ₹";
    $(purchased).text(totalPurchasedDisplay);
  });
