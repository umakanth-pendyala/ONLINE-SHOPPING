const signInButton = document.querySelectorAll(".modal-footer button")[1];
const searchBox = document.querySelector("#custom-nav-bar > div > div.custom-search-bar > form > input");

const giveUserPrivelages = username => {
  const html = `
    <div class="custom-nav-item">
      <p class="server-incomming">welcome</p>
      <p class="server-incomming">${username}</p>
    </div>
    <div class="custom-nav-item">
      <a href="/user/orders" class="custom-primary-hover">Orders</a>
    </div>
    <div class="custom-nav-item">
      <a href="" class="custom-primary-hover">Cart</a>
    </div>
    <div class="custom-nav-item">
      <a href="/user/logout" class="custom-primary-hover">log out</a>
    </div>
  `;

  const navItems = document.querySelector("#custom-nav-items ul");
  const closeButton = document.querySelector(".modal-footer button");
  closeButton.click();

  //FUNCTION: ADD THE HTML INTO NAV ITEMS
  navItems.innerHTML = html;
};
//******************************************************* */

const showErrorMessage = () => {
  const errorMessage = `
    <div class="alert alert-danger" role="alert">
      Username or password Invalid! PLease Check
    </div>
  `;

  var parser = new DOMParser();
  const htmlScript = parser.parseFromString(errorMessage, "text/html");
  const htmlErrorScript = htmlScript.getElementsByTagName("BODY")[0];

  const modalDialog = document.querySelector("#custom-nav-items ul .custom-nav-item .modal-dialog .modal-body");

  modalDialog.insertBefore(htmlErrorScript, modalDialog.children[1]);
};
//*************************************************** */

/**
 * REMOVE THE "SIGN IN TO ORDER TAB FUNCTION"
 */
const removeSignInWarning = () => {
  const productInformationSecton = document.querySelector(".product-information");
  productInformationSecton.removeChild(productInformationSecton.children[3]);
};

/**
 * ACTIVATE THE CART AND ORDER BUTTON FUNCTION
 */
const activateButtons = () => {
  const cartButton = document.querySelector(
    "body > header > div > div > div.product-information > div.user-options > div:nth-child(1) > button"
  );

  const orderButton = document.querySelector(
    "body > header > div > div > div.product-information > div.user-options > div:nth-child(2) > a > button"
  );

  orderButton.classList.add("hover-blue");
  cartButton.classList.add("hover-blue");
  cartButton.disabled = false;
  orderButton.disabled = false;
};

/**
 * AJAX CALL TO VALIDATE USER. (LOGIN MODULE)
 */
$(signInButton).on("click", () => {
  const email = document.querySelector(
    "#exampleModalCenter > div > div > div.modal-body > form > div > div:nth-child(1) > input[type=email]"
  ).value;

  const password = document.querySelector(
    "#exampleModalCenter > div > div > div.modal-body > form > div > div:nth-child(2) > input[type=password]"
  ).value;

  $.ajax({
    url: "/user/sign_in",
    type: "POST",
    ContentType: "application/json",
    data: {
      email: email,
      password: password,
    },
    success: data => {
      if (data.userAuthenticated == true) {
        giveUserPrivelages(data.username);
        removeSignInWarning();
        activateButtons();
      } else if (data.userAuthenticated == false) {
        showErrorMessage();
      }
    },
    error: data => {
      alert("error connecting to the server");
    },
  });
});

/**
 * SEARCH BOX FUNCTIONALITY
 */
const setDataList = incommingProducts => {
  const dataList = document.querySelector("#suggestions");
  const products = incommingProducts.matchedProducts;
  dataList.innerHTML = "";
  products.forEach(product => {
    // console.log(product);
    dataList.innerHTML += `<option value=${product.productName}>`;
  });
};
searchBox.addEventListener("keypress", e => {
  const search = e.target.value.trim();
  $.ajax({
    url: "/search",
    type: "POST",
    ContentType: "application/json",
    data: {
      userInput: search,
    },
    success: data => {
      setDataList(data);
    },
    error: data => {
      alert("error");
    },
  });
});
