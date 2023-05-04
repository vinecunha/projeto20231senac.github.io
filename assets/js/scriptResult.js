const anoAtual = new Date().getFullYear(); //pega o ano atual
var idade = localStorage.getItem("idade"); //pega o localstorage da idade
var idadeAposentadoria = localStorage.getItem("idadeAposentadoria"); //pega o localstorage da idade de aposentadoria
const remuneracoes = JSON.parse(localStorage.getItem('json')); //pega o localstorage dos dados do json
var genero = localStorage.getItem("gender"); //pega o localstorage do sexo informado pelo usuário

//recupera o genero
var gender = document.getElementById("gender");
gender.innerText = genero;

//recupera a idade atual
var currentAge = document.getElementById("currentAge");
currentAge.innerText = idade;


//código para calcular quantos meses de contribuição foram lidos no JSON
let count = 0;
for (let i = 0; i < remuneracoes.length; i++) {
  if (remuneracoes[i].hasOwnProperty("competencia")) {
    count++;
  }
}
var mesesContribuicao = document.getElementById("calculatedCNIS");
const anos = parseInt(count / 12);
const meses = count % 12;

if (anos === 1) {
  mesesContribuicao.innerText = `${anos} ano`;
} else if (anos > 1) {
  mesesContribuicao.innerText = `${anos} anos`;
}
if (anos > 0 && meses > 0) {
  mesesContribuicao.innerText += ` e `;
}
if (meses === 1) {
  mesesContribuicao.innerText += `${meses} mês`;
} else if (meses > 1) {
  mesesContribuicao.innerText += `${meses} meses`;
}
if (anos === 0 && meses === 0) {
  mesesContribuicao.innerText = `Menos de 1 mês`;
}

//calcula a média de contribuição em R$
const valoresRemuneracao = remuneracoes.map(obj => parseFloat(obj.remuneracao.replace(".","").replace(",",".")));
const mediaRemuneracoes = valoresRemuneracao.reduce((total, valores) => total + valores,0) / valoresRemuneracao.length;
const mediaRemuneracoesEmReais = mediaRemuneracoes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
var mediaINSS = document.getElementById("averageINSS");
mediaINSS.innerText = mediaRemuneracoesEmReais;

//recupera a idade que deseja se aposentar
var idadeAposentadoriaResult = document.getElementById("selectedYear");
idadeAposentadoriaResult.innerText = `${idadeAposentadoria} anos`;

//calcula o ano de aposentadoria
var calculatedYear = document.getElementById("calculatedYear");
calculatedYear.innerText = parseInt(anoAtual) + (parseInt(idadeAposentadoria) - idade);

//funcao para retornar o salário
var salario = document.getElementById("salary")
var mediaSalarios = ((mediaRemuneracoes * ((parseInt(idadeAposentadoria) - idade) * 12))/(valoresRemuneracao.length + (parseInt(idadeAposentadoria) - idade) * 12)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
/*
if((genero == "masculino" && (valoresRemuneracao.length)/(12+(parseInt(idadeAposentadoria) - idade))) < 20){
    alert("Não pode se aposentar com essa idade")
  }else if ((genero == "masculino" && valoresRemuneracao.length/(12+(parseInt(idadeAposentadoria) - idade))) >= 20){
    var mediaSalarios = mediaSalarios * (0.6 + 0.02 * (idadeAposentadoria - 20))
  }else if((genero == "feminino" && valoresRemuneracao.length/(12+(parseInt(idadeAposentadoria) - idade))) < 15){
    alert("Não pode se aposentar com essa idade")
  }else{
    var mediaSalarios = mediaSalarios * (0.6 + 0.02 * (idadeAposentadoria - 15))
  }
*/
salario.innerText = mediaSalarios

//ao clicar me reiniciar
const btnLimpar = document.getElementById("restart");
btnLimpar.addEventListener("click", function() {
  localStorage.clear();
});
