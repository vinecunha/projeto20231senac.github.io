const anoAtual = new Date().getFullYear(); //pega o ano atual
var idade = localStorage.getItem("idade"); //pega o localstorage da idade
var selectedYear = document.getElementById("selectedYear");

//funcao para selecionar e atualizar a idade que gostaria de se aposentar
function controleDeIdadeAposentadoria() {
    var inputIdadeAposentadoria = document.getElementById("idadeAposentadoria");
    localStorage.setItem("idadeAposentadoria", inputIdadeAposentadoria.value); //define a idade do value do input no localstorage
    inputIdadeAposentadoria.addEventListener("change", function(){ //se mudar ele atualiza o localstorage
      selectedYear.innerText = inputIdadeAposentadoria.value;
      calculatedYear.innerText = parseInt(anoAtual) + (parseInt(inputIdadeAposentadoria.value) - idade); //calcula o ano de aposentadoria
      localStorage.setItem("idadeAposentadoria", inputIdadeAposentadoria.value);
    })

    var botaoDecrementoAposentadoria = document.getElementById("decrementoIdadeAposentadoria");
    var botaoIncrementoAposentadoria = document.getElementById("incrementoIdadeAposentadoria");
    
    selectedYear.innerText = inputIdadeAposentadoria.value; //define a idade selecionado como idade para aposentadoria
    
    var calculatedYear = document.getElementById("calculatedYear");
    //calcula o ano de aposentadoria
    calculatedYear.innerText = parseInt(anoAtual) + (parseInt(inputIdadeAposentadoria.value) - idade);
  
    botaoDecrementoAposentadoria.addEventListener("click", function() {
      var valorAtualAposentadoria = inputIdadeAposentadoria.value;
      if (valorAtualAposentadoria > 0) {
        inputIdadeAposentadoria.value = parseInt(valorAtualAposentadoria) - 1;
        localStorage.setItem("idadeAposentadoria", inputIdadeAposentadoria.value) //ao diminuir um ano ele atualiza o localstorage
        selectedYear.innerText = idadeAposentadoria.value; //define a idade selecionado como idade para aposentadoria
        calculatedYear.innerText = parseInt(anoAtual) + (parseInt(inputIdadeAposentadoria.value) - idade); //calcula o ano de aposentadoria
      }
    });
  
    botaoIncrementoAposentadoria.addEventListener("click", function() {
      var valorAtualAposentadoria = inputIdadeAposentadoria.value;
      inputIdadeAposentadoria.value = parseInt(valorAtualAposentadoria) + 1;
      localStorage.setItem("idadeAposentadoria", inputIdadeAposentadoria.value) //ao adicionar um ano ele atualiza o localstorage
      selectedYear.innerText = idadeAposentadoria.value; //define a idade selecionado como idade para aposentadoria
      calculatedYear.innerText = parseInt(anoAtual) + (parseInt(inputIdadeAposentadoria.value) - idade); //calcula o ano de aposentadoria
    });   
    
  }
controleDeIdadeAposentadoria()


document.addEventListener("DOMContentLoaded", function() {
    if (idade) {
      var currentAge = document.getElementById("currentAge");
      currentAge.innerText = `${idade} anos`; //valida se tem idade no localstorage e exibe na span correspondente
    }
});

function atualizarAnoAtual() {
    const spanAnoAtual = document.getElementById("currentYear");
    spanAnoAtual.textContent = anoAtual; //define o ano atual
}  
atualizarAnoAtual()



  
  