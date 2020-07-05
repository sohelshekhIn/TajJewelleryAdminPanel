new Chart(document.getElementById("barchart"), {
  type: "bar",
  data: {
    labels: [
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
        data: [10, 20, 30, 40, 50, 60, 70, 80],
        label: "Total User",
        backgroundColor: "#4755AB",
        borderWidth: 1,
      },
      {
        data: [30, 10, 70, 15, 30, 20, 70, 80],
        label: "New User",
        backgroundColor: "#E7EDF6",
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    legend: {
      position: "top",
    },
  },
});
