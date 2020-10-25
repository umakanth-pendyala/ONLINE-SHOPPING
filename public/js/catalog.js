const signInButton = document.querySelectorAll(".modal-footer button")[1];
const userLoggedIn = false;

$(signInButton).on("click", () => {
  $.ajax({
    url: "/user/sign_in",
    data: JSON.stringify({
      name: "umakanth pendyala",
    }),
    contentType: "application/json",
    type: "POST",
    success: data => {
      alert("success");
    },
    error: data => {
      alert("error connecting to the server");
    },
  });
});

const checkUserLoggedIn = () => {
  if (!userLoggedIn) {
    const navItems = document.querySelectorAll("#custom-nav-items .custom-nav-item");
    const orders = navItems[0].querySelector("a");
    const Cart = navItems[1].querySelector("a");

    orders.style.visibility = "hidden";
    Cart.style.visibility = "hidden";
  } else {
    const navItems = document.querySelectorAll("#custom-nav-items .custom-nav-item");
    const orders = navItems[0].querySelector("a");
    const Cart = navItems[1].querySelector("a");

    orders.style.visibility = "visible";
    Cart.style.visibility = "visible";
  }
};

checkUserLoggedIn();
