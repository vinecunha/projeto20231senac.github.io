// carrega o arquivo PDF
const url = 'arquivo.pdf';
const loadingTask = pdfjsLib.getDocument(url);

// processa o arquivo PDF e extrai os dados
loadingTask.promise.then(function(pdf) {
  const pageNumber = 1;
  return pdf.getPage(pageNumber);
}).then(function(page) {
  const scale = 1.5;
  const viewport = page.getViewport({ scale: scale });

  // cria um elemento de canvas para renderizar a página
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  document.body.appendChild(canvas);

  // renderiza a página em um elemento de canvas
  const renderContext = {
    canvasContext: context,
    viewport: viewport
  };
  page.render(renderContext).promise.then(function() {
    // extrai o texto da página e cria as linhas da tabela
    const textContent = page.getTextContent();
    const items = textContent.items;
    const rows = [];
    let row = '';
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.str == '\n') {
        rows.push(row);
        row = '';
      } else {
        row += item.str;
      }
    }

    // adiciona as linhas à tabela
    const table = document.getElementById('pdf-data');
    for (let i = 0; i < rows.length; i++) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.textContent = rows[i];
      tr.appendChild(td);
      table.appendChild(tr);
    }
  });
});
