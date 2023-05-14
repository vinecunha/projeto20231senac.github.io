const remuneracoes = JSON.parse(localStorage.getItem('json')); // Recupera do localStorage o JSON definido em scriptFirstStep

// Cria a tabela
let table = document.getElementById("tableContainer");

// Cria o cabeçalho
let headerRow = table.createTHead().insertRow();
let competenciaHeader = headerRow.insertCell(0);
let remuneracaoHeader = headerRow.insertCell(1);
competenciaHeader.innerHTML = "Competência";
remuneracaoHeader.innerHTML = "Remuneração";
competenciaHeader.style.fontWeight = "bold";
remuneracaoHeader.style.fontWeight = "bold";
headerRow.style.borderBottom = "2px solid #000";

// Cria o corpo da tabela apenas uma vez
let tbody = table.createTBody();

if (Array.isArray(remuneracoes)) {
  const itemsPerPage = 10;
  let currentPage = 1;
  const totalPages = Math.ceil(remuneracoes.length / itemsPerPage);
  let visiblePages = calculateVisiblePages(); // Define o número de páginas visíveis inicialmente
  window.addEventListener('resize', function() {
    visiblePages = calculateVisiblePages(); // Recalcula o número de páginas visíveis ao redimensionar a janela
    renderPagination(); // Atualiza a renderização da paginação com o novo número de páginas visíveis
  });

  function calculateVisiblePages() {
    return window.innerWidth < 768 ? 2 : window.innerWidth < 1140 ? 3 : 5;
  }

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
      competenciaCell.innerText = item.competencia;
      remuneracaoCell.innerText = `R$ ${item.remuneracao}`;
      competenciaCell.style.borderRight = "2px solid #000";

      // Definir largura e estilo de alinhamento para as células
      competenciaCell.style.maxWidth = "50%";
      competenciaCell.style.textAlign = "center";
      remuneracaoCell.style.maxWidth = "50%";
      remuneracaoCell.style.textAlign = "center";
    });
  }
  updateTable(currentPage);

  // Cria o footer paginador da tabela
  let tfoot = table.createTFoot();
  let paginationRow = tfoot.insertRow();
  let paginationCell = paginationRow.insertCell();
  paginationCell.colSpan = 2;
  paginationCell.style.textAlign = "center";

  let paginationList = document.createElement("ul");
  paginationList.classList.add("pagination");
  paginationList.style.width = "100%";

  function renderPagination() {
    paginationList.innerHTML = ""; // Limpa os botões anteriores

    let startPage = currentPage - Math.floor(visiblePages / 2);
    startPage = Math.max(startPage, 1);
    let endPage = startPage + visiblePages - 1;
    endPage = Math.min(endPage, totalPages);

    // Botão para a primeira página
    if (currentPage > 1) {
      let firstItem = document.createElement("li");
      let firstLink = document.createElement("a");
      firstLink.href = "#";
      firstLink.innerHTML = "&laquo;&laquo;"; // Símbolo para primeira página
      firstItem.appendChild(firstLink);
      paginationList.appendChild(firstItem);

      firstLink.addEventListener("click", function (event) {
        event.preventDefault();
        currentPage = 1;
        updateTable(currentPage);
        renderPagination();
      });
    }

    // Botão para a página anterior
    if (currentPage > 1) {
      let prevItem = document.createElement("li");
      let prevLink = document.createElement("a");
      prevLink.href = "#";
      prevLink.innerHTML = "&laquo;"; // Símbolo para página anterior
      prevItem.appendChild(prevLink);
      paginationList.appendChild(prevItem);

      prevLink.addEventListener("click", function (event) {
        event.preventDefault();
        currentPage--;
        updateTable(currentPage);
        renderPagination();
      });
    }

    // Botões para as páginas
    for (let i = startPage; i <= endPage; i++) {
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
        renderPagination();
      });
    }

    // Adicionar a mensagem "de X páginas"
    let pagesMessage = document.createElement("span");
    pagesMessage.innerText = `de ${totalPages}`;
    paginationList.appendChild(pagesMessage);


    // Botão para a próxima página
    if (currentPage < totalPages) {
      let nextItem = document.createElement("li");
      let nextLink = document.createElement("a");
      nextLink.href = "#";
      nextLink.innerHTML = "&raquo;"; // Símbolo para próxima página
      nextItem.appendChild(nextLink);
      paginationList.appendChild(nextItem);

      nextLink.addEventListener("click", function (event) {
        event.preventDefault();
        currentPage++;
        updateTable(currentPage);
        renderPagination();
      });
    }

    // Botão para a última página
    if (currentPage < totalPages) {
      let lastItem = document.createElement("li");
      let lastLink = document.createElement("a");
      lastLink.href = "#";
      lastLink.innerHTML = "&raquo;&raquo;"; // Símbolo para última página
      lastItem.appendChild(lastLink);
      paginationList.appendChild(lastItem);

      lastLink.addEventListener("click", function (event) {
        event.preventDefault();
        currentPage = totalPages;
        updateTable(currentPage);
        renderPagination();
      });
    }
    
    paginationCell.innerHTML = ""; // Limpa o conteúdo anterior
    paginationCell.appendChild(paginationList);
  }

  renderPagination();

} else { // Se houver algum erro com o JSON informado
  alert('O objeto anexado não é um array no formato correto. Refaça o upload, por gentileza.')
  console.error('O objeto armazenado em localStorage não é um array.');
  window.location.href = 'first-step.html'; // Redireciona para a página first-step.html
}
