const remuneracoes = JSON.parse(localStorage.getItem('json'));
console.log(remuneracoes);

let table = document.getElementById("tableContainer");

let headerRow = table.createTHead().insertRow();
let competenciaHeader = headerRow.insertCell(0);
let remuneracaoHeader = headerRow.insertCell(1);
competenciaHeader.innerHTML = "Competência";
remuneracaoHeader.innerHTML = "Remuneração";

// Cria o corpo da tabela apenas uma vez
let tbody = table.createTBody();

if (Array.isArray(remuneracoes)) {
  const itemsPerPage = 10;
  let currentPage = 1;
  const totalPages = Math.ceil(remuneracoes.length / itemsPerPage);

  function updateTable(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = remuneracoes.slice(startIndex, endIndex);

    // Remove o corpo da tabela antes de atualizá-lo com os itens da página atual
    tbody.innerHTML = "";

    pageItems.forEach((item) => {
      let row = tbody.insertRow();
      let competenciaCell = row.insertCell(0);
      let remuneracaoCell = row.insertCell(1);
      competenciaCell.innerHTML = item.competencia;
      remuneracaoCell.innerHTML = item.remuneracao;
    });
  }
  updateTable(currentPage);

  let paginationContainer = document.getElementById("paginationContainer");
  let paginationList = document.createElement("ul");
  paginationList.classList.add("pagination");

  for (let i = 1; i <= totalPages; i++) {
    let paginationItem = document.createElement("li");
    let paginationLink = document.createElement("a");
    paginationLink.href = "#";
    paginationLink.innerHTML = i;
    if (i === currentPage) {
      paginationItem.classList.add("active");
    }
    paginationItem.appendChild(paginationLink);
    paginationList.appendChild(paginationItem);

    paginationLink.addEventListener("click", function (event) {
      event.preventDefault();
      currentPage = i;
      updateTable(currentPage);
      let activeItem = paginationList.querySelector(".active");
      activeItem.classList.remove("active");
      paginationItem.classList.add("active");
    });
  }

  paginationContainer.appendChild(paginationList);
} else {
  console.error('O objeto armazenado em local storage não é um array.');
}
