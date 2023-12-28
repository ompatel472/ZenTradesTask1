document.addEventListener("DOMContentLoaded", async function () {
  const apiUrl = "https://s3.amazonaws.com/open-to-cors/assignment.json";
  const itemsPerPage = 15;

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error.message);
      return [];
    }
  };

  const displayData = (data, page) => {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsToDisplay = data.slice(startIndex, endIndex);
    productsToDisplay.forEach((product) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${product.title}</td><td>${product.price}</td><td>${product.popularity}</td><td>${product.subcategory}</td>`;
      tableBody.appendChild(row);
    });

    currentPage = page;
    console.log(currentPage);
  };
  const generatePagination = (totalPages) => {
    let pagination = document.getElementById("pagination");
    pagination.innerHTML = 1;
  };

  const onPageClick = (page) => {
    currentpage = page;
    displayData(productsArray, page);
  };

  const rawData = await fetchData();
  const productsArray = Object.entries(rawData.products).map(
    ([key, value]) => ({ id: key, ...value })
  );
  productsArray.sort((a, b) => b.popularity - a.popularity);

  const totalPages = Math.ceil(productsArray.length / itemsPerPage);
  generatePagination(totalPages);

  let initial = 1;
  displayData(productsArray, initial);
  const prev = document.getElementById("prev");
  prev.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      let value = parseInt(document.getElementById("pagination").innerText);
      document.getElementById("pagination").innerHTML = value - 1;
      displayData(productsArray, currentPage);
    } else {
      alert("You are in first page");
    }
  });
  const next = document.getElementById("next");
  next.addEventListener("click", function () {
    if (currentPage < 67) {
      currentPage++;
      let value = parseInt(document.getElementById("pagination").innerText);
      document.getElementById("pagination").innerHTML = value + 1;
      displayData(productsArray, currentPage);
    } else {
      alert("You are in Last page");
    }
  });
});
