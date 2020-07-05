let xea_12;

if (localStorage.getItem("viewerStatus") == "true") {
  // Viewer Things
  $("#name").text("Viewer");
  $(".sohel-btn-logout").click(function (e) {
    e.preventDefault();
    localStorage.setItem("viewerStatus", false);
  });
  $("#logout").click(function (e) {
    e.preventDefault();
    window.location.replace("../");
    localStorage.setItem("viewerStatus", false);
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
  // All Admin proccess here
  $(".logout").click(function () {
    window.location.replace("../");
    localStorage.setItem("loginStatus", false);
  });
}
