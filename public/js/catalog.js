const signInButton = document.querySelectorAll(".modal-footer button")[1];

const giveUserPrivelages = username => {
  const navItems = document.querySelectorAll("#custom-nav-items .custom-nav-item");
  const orders = navItems[0].querySelector("a");
  const Cart = navItems[1].querySelector("a");

  orders.style.visibility = "visible";
  Cart.style.visibility = "visible";

  const html = `
    <div class="custom-nav-item">
      <p class="server-incomming">welcome</p>
      <p class="server-incomming">${username}p>
    </div>
  `;

  const navBarElements = document.querySelector("#custom-nav-items ul");
  navBar.insertBefore(html, navBarElements.children[0]);

  //TODO: REMOVE THE SIGN IN OPTION

  const closeButton = document.querySelector(".modal-footer button");
  closeButton.click();
};

$(signInButton).on("click", () => {
  $.ajax({
    url: "/user/sign_in",
    type: "POST",
    ContentType: "application/json",
    data: {
      email: "umakanthpendyala@gmail.com",
      password: "123",
    },
    success: data => {
      if (data.userAuthenticated == true) {
        giveUserPrivelages();
      }
    },
    error: data => {
      alert("error connecting to the server");
    },
  });
});
