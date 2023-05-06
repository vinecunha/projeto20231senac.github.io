/*VARIÁVEIS
Na página extract.html
TABLE: pdf-data -> local onde serão exibidas as contribuições extraídas do extrato CNIS

Na página preview.html
currentYear -> define o ano que estamos atualmente.
currentAge -> exibe a idade informada na página first-step pelo usuário
selectedYear -> exibe a idade informada pelo usuário na própria página preview.html como a idade que gostaria de se aposentar
calculatedYear -> calculatedYear = currentYear + (selectedYear - currentAge)  -> a formula define que ano será quando o usuário tiver a idade informada.  

Na página result.html
currentAge -> exibe a idade informada na página first-step pelo usuário
gender -> exibe o gênero informado na página first-step pelo usuário
calculatedCNIS -> exibe o tempo de contribuição de acordo com o extrato CNIS anexado pelo usuário na página first-step
averageINSS -> exibe a média salarial de contribuição de acordo com o extrato CNIS anexado pelo usuário na página first-step 
salary -> exibe o resultado do cálculo principal
calculatedYear -> calculatedYear = currentYear + (selectedYear - currentAge)  -> a formula define que ano será quando o usuário tiver a idade informada.  

*/
function controleDeIdade() {
    var inputIdade = document.getElementById("idade");
    localStorage.setItem("idade", inputIdade.value); //define a idade do value do input no localstorage
    
    inputIdade.addEventListener("change", function(){ //se mudar ele atualiza o localstorage
      localStorage.setItem("idade", inputIdade.value);
    })
    
    var botaoDecremento = document.getElementById("decrementoIdade");
    var botaoIncremento = document.getElementById("incrementoIdade");
  
    botaoDecremento.addEventListener("click", function() {
      var valorAtual = inputIdade.value;
      if (valorAtual > 0) {
        inputIdade.value = parseInt(valorAtual) - 1;
        localStorage.setItem("idade", inputIdade.value) //ao diminuir um ano ele atualiza o localstorage
      }
    });
  
    botaoIncremento.addEventListener("click", function() {
      var valorAtual = inputIdade.value;
      inputIdade.value = parseInt(valorAtual) + 1;
      localStorage.setItem("idade", inputIdade.value) //ao adicionar um ano ele atualiza o localstorage
    });    
  }
controleDeIdade()

// Selecione os elementos de radio
const radios = document.getElementsByName('Sexo');
let radioMarcado = false;

// Adicione um event listener para cada radio
for (const radio of radios) {
  radio.addEventListener('change', (event) => {
    const valor = event.target.value;
    if (radio.checked) {
      radioMarcado = true;
    }
    localStorage.setItem('gender', valor);
  });
}

document.getElementById('carregarJSON').addEventListener('click', (event) => {
  if (!radioMarcado) {
    event.preventDefault();
    document.getElementById("alertSexo").style.display = "block";
  }
});

// Obtém uma referência para o checkboxCiente
var checkboxCiente = document.getElementById("ciente");
// Obtém uma referência para o botão carregarJSON
var botaoCarregarJSON = document.getElementById("carregarJSON");

// Função para manipular o evento de clique do botão
function handleButtonClick(event) {
  if (!checkboxCiente.checked) {
    event.preventDefault();
  }
}

// Adiciona um ouvinte de evento para detectar mudanças no checkbox
checkboxCiente.addEventListener("change", function() {
  if (!this.checked) {
    botaoCarregarJSON.addEventListener("click", handleButtonClick);
    checkboxCiente.style.border = "2px solid #f00";
    document.getElementById("labelForCiente").style.color = "#ff0000";
  } else {
    botaoCarregarJSON.removeEventListener("click", handleButtonClick);
    checkboxCiente.style.border = "none";
    document.getElementById("labelForCiente").style.color = "#f5f5f5";
  }
});

// Obtém uma referência para o checkboxCorrecao
var checkboxCorrecao = document.getElementById("correcao");

// Adiciona um ouvinte de evento para detectar mudanças no checkbox
checkboxCorrecao.addEventListener("change", function() {
  if (!this.checked) {
    botaoCarregarJSON.addEventListener("click", handleButtonClick);
    checkboxCorrecao.style.border = "2px solid #f00";
    document.getElementById("labelForCorrecao").style.color = "#f00";
  } else {
    botaoCarregarJSON.removeEventListener("click", handleButtonClick);
    checkboxCorrecao.style.border = "none";
    document.getElementById("labelForCorrecao").style.color = "#f5f5f5";
  }
});

//funcao para carregar o JSON anexado e exibir na tabela
const fileInput = document.getElementById('formFileLg');
const consoleButton = document.getElementById('carregarJSON');

consoleButton.addEventListener('click', (event) => {
  const file = fileInput.files[0];
  const reader = new FileReader();

  if (!file) {
    event.preventDefault(); 
    document.getElementById("alertAnexo").style.display = "block";
  }else{

    reader.addEventListener('load', () => {
      const data = JSON.parse(reader.result);
      localStorage.setItem("json", JSON.stringify(data));
    });

    reader.readAsText(file);
  }
});