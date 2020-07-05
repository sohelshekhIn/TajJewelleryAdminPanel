//  ===== Setting data models ============//

// For purchased data
let purchasedJanuary = 0;
let purchasedFebruary = 0;
let purchasedMarch = 0;
let purchasedApril = 0;
let purchasedMay = 0;
let purchasedJune = 0;
let purchasedJuly = 0;
let purchasedAugust = 0;
let purchasedSeptember = 0;
let purchasedOctober = 0;
let purchasedNovember = 0;
let purchasedDecember = 0;
let soldJanuary = 0;
let soldFebruary = 0;
let soldMarch = 0;
let soldApril = 0;
let soldMay = 0;
let soldJune = 0;
let soldJuly = 0;
let soldAugust = 0;
let soldSeptember = 0;
let soldOctober = 0;
let soldNovember = 0;
let soldDecember = 0;
let dataForPurchased = [];
let dataForSold = [];
// let dataForSold = [
//   soldJanuary,
//   soldFebruary,
//   soldMarch,
//   soldApril,
//   soldMay,
//   soldJune,
//   soldJuly,
//   soldAugust,
//   soldSeptember,
//   soldOctober,
//   soldNovember,
//   soldDecember,
// ];

// ====== End Data models ===========//

//  =========== Getting Data form server ==================== //
let soldData = [];
let soldMonth = [];
let purchasedData = [];
let purchasedMonth = [];

// ===== For Purchased Data ======//
for (let i = 1; i < 13; i++) {
  db.collection("purchased-data")
    .where("I_month", "==", i)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        purchasedData.push(doc.data().F_TotalPrice);
        purchasedMonth.push(doc.data().I_month);
        let purMonth = doc.data().I_month;
        // console.log(purchasedData);
        // console.log(purchasedMonth);
        // console.log(purchasedData.length);
        console.log(purMonth);
        foo(purchasedMonth);
      });
    })
    .catch(function (error) {
      errorShow("body", error);
    });
}

//  ========== For Sold data =============//
for (let i = 1; i < 13; i++) {
  db.collection("sold-data")
    .where("B_month", "==", i)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        soldData.push(doc.data().A_salePrice);
        soldMonth.push(doc.data().B_month);
      });
    })
    .catch(function (error) {
      errorShow("body", error);
    });
}
// =========End getting data form server ============//

// for (let iii = 0; iii < purchasedData.length; iii++) {
//   console.log(iii);
// }

function check(value) {
  console.log(value);

  // if (purchasedMonth[i] == 1) {
  //   purchasedJanuary = purchasedData[i];
  // } else {
  //   if (purchasedMonth[i] == 2) {
  //     purchasedFebruary = purchasedData[i];
  //   } else {
  //     if (purchasedMonth[i] == 3) {
  //       purchasedMarch = purchasedData[i];
  //     } else {
  //       if (purchasedMonth[i] == 4) {
  //         purchasedApril = purchasedData[i];
  //       } else {
  //         if (purchasedMonth[i] == 5) {
  //           purchasedMay = purchasedData[i];
  //         } else {
  //           if (purchasedMonth[i] == 6) {
  //             purchasedJune = purchasedData[i];
  //           } else {
  //             if (purchasedMonth[i] == 7) {
  //               purchasedJuly = purchasedData[i];
  //             } else {
  //               if (purchasedMonth[i] == 8) {
  //                 purchasedAugust = purchasedData[i];
  //               } else {
  //                 if (purchasedMonth[i] == 9) {
  //                   purchasedSeptember = purchasedData[i];
  //                 } else {
  //                   if (purchasedMonth[i] == 10) {
  //                     purchasedOctober = purchasedData[i];
  //                   } else {
  //                     if (purchasedMonth[i] == 11) {
  //                       purchasedNovember = purchasedData[i];
  //                     } else {
  //                       if (purchasedMonth[i] == 12) {
  //                         purchasedDecember = purchasedData[i];
  //                       }
  //                     }
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
  // hq();
}

// console.log(i);

// if (i < 12) {
// }

function hq() {
  dataForPurchased = [
    purchasedJanuary,
    purchasedFebruary,
    purchasedMarch,
    purchasedApril,
    purchasedMay,
    purchasedJune,
    purchasedJuly,
    purchasedAugust,
    purchasedSeptember,
    purchasedOctober,
    purchasedNovember,
    purchasedDecember,
  ];

  console.log(dataForPurchased);
}

// ===================Setting up line Chart ===================//
new Chart(document.getElementById("linechart"), {
  type: "line",
  data: {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Sold",
        backgroundColor: window.chartColors.navy,
        borderColor: window.chartColors.navy,
        data: [11, 10, 20, 25, 0, 20, 10, 10],
        fill: false,
      },
      {
        label: "Purchased",
        fill: false,
        backgroundColor: window.chartColors.purple,
        borderColor: window.chartColors.purple,
        data: [10, 40, 20, 35, 25, 50, 10, 70],
      },
    ],
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: "Sold and Purchased data Chart",
    },
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Month",
          },
        },
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Value",
          },
        },
      ],
    },
  },
});

let araay = [
  1,
  1,
  1,
  5,
  1,
  8,
  6,
  2,
  5,
  6,
  6,
  5,
  1,
  5,
  3,
  5,
  3,
  2,
  8,
  8,
  7,
  4,
  5,
  6,
  5,
  5,
];

function foo(arr) {
  var a = [],
    b = [],
    prev;

  arr.sort();
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== prev) {
      a.push(arr[i]);
      b.push(1);
    } else {
      b[b.length - 1]++;
    }
    prev = arr[i];
  }

  console.log(a);
  console.log(b);

  return [a, b];
}
