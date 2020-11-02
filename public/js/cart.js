const searchBox = document.querySelector("#custom-nav-bar > div > div.custom-search-bar > form > input");
/**
 * SEARCH BOX FUNCTIONALITY
 */
const setDataList = incommingProducts => {
  const dataList = document.querySelector("#suggestions");
  const products = incommingProducts.matchedProducts;
  dataList.innerHTML = "";
  products.forEach(product => {
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
