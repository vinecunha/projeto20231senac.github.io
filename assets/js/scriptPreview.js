const anoAtual = new Date().getFullYear();

function controleDeIdadeAposentadoria() {
    var inputIdadeAposentadoria = document.getElementById("idadeAposentadoria");
    var botaoDecrementoAposentadoria = document.getElementById("decrementoIdadeAposentadoria");
    var botaoIncrementoAposentadoria = document.getElementById("incrementoIdadeAposentadoria");
    var selectedYear = document.getElementById("selectedYear");
    selectedYear.innerText = inputIdadeAposentadoria.value;
    var calculatedYear = document.getElementById("calculatedYear");
    calculatedYear.innerText = parseInt(anoAtual) + parseInt(inputIdadeAposentadoria.value);
  
    botaoDecrementoAposentadoria.addEventListener("click", function() {
      var valorAtualAposentadoria = inputIdadeAposentadoria.value;
      if (valorAtualAposentadoria > 0) {
        inputIdadeAposentadoria.value = parseInt(valorAtualAposentadoria) - 1;
        selectedYear.innerText = idadeAposentadoria.value;
        calculatedYear.innerText = parseInt(anoAtual) + parseInt(inputIdadeAposentadoria.value);
      }
    });
  
    botaoIncrementoAposentadoria.addEventListener("click", function() {
      var valorAtualAposentadoria = inputIdadeAposentadoria.value;
      inputIdadeAposentadoria.value = parseInt(valorAtualAposentadoria) + 1;
      selectedYear.innerText = idadeAposentadoria.value;
      calculatedYear.innerText = parseInt(anoAtual) + parseInt(inputIdadeAposentadoria.value);
    });   
    
  }
controleDeIdadeAposentadoria()


document.addEventListener("DOMContentLoaded", function() {
    var idade = localStorage.getItem("idade");
    if (idade) {
      var currentAge = document.getElementById("currentAge");
      currentAge.innerText = idade;
    }
});

function atualizarAnoAtual() {
    const spanAnoAtual = document.getElementById("currentYear");
    spanAnoAtual.textContent = anoAtual;
}  
atualizarAnoAtual()



  
  