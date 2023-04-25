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

var inputIdade = document.getElementById("idade");
var inputIdadeAposentadoria = document.getElementById("idadeAposentadoria");

function controleDeIdade() {
    var botaoDecremento = document.getElementById("decrementoIdade");
    var botaoIncremento = document.getElementById("incrementoIdade");
  
    botaoDecremento.addEventListener("click", function() {
      var valorAtual = inputIdade.value;
      if (valorAtual > 0) {
        inputIdade.value = parseInt(valorAtual) - 1;
      }
    });
  
    botaoIncremento.addEventListener("click", function() {
      var valorAtual = inputIdade.value;
      inputIdade.value = parseInt(valorAtual) + 1;
    });
  }
  controleDeIdade();

  function controleDeIdadeAposentadoria() {
    var botaoDecrementoAposentadoria = document.getElementById("decrementoIdadeAposentadoria");
    var botaoIncrementoAposentadoria = document.getElementById("incrementoIdadeAposentadoria");
  
    botaoDecrementoAposentadoria.addEventListener("click", function() {
      var valorAtualAposentadoria = inputIdadeAposentadoria.value;
      if (valorAtualAposentadoria > 0) {
        inputIdadeAposentadoria.value = parseInt(valorAtualAposentadoria) - 1;
      }
    });
  
    botaoIncrementoAposentadoria.addEventListener("click", function() {
      var valorAtualAposentadoria = inputIdadeAposentadoria.value;
      inputIdadeAposentadoria.value = parseInt(valorAtualAposentadoria) + 1;
    });
  }
  controleDeIdadeAposentadoria();

  function preview(){
    var botaoAvancarFirstStep = document.getElementById("AvancarFirstStep");

    botaoAvancarFirstStep.addEventListener("click", function(event) {
        event.preventDefault();
        localStorage.setItem("idade", inputIdade.value);
        window.location.href = "preview.html";
    });

    var spanCurrentAge = document.getElementById("currentAge");
    var idadeArmazenada = localStorage.getItem("idade");

    if (idadeArmazenada) {
        spanCurrentAge.textContent = idadeArmazenada;
    }
}