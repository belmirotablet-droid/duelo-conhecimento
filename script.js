const TURMAS = [
"9ºIM01-EF",
"9ºIM02-EF",
"9ºIM03-EF",
"1ªIM01-LCH",
"1ªIM01-MCN",
"1ªIM02-LCH",
"1ªIM02-MCN",
"1ªV01-LCH",
"1ªV01-MCN",
"1ªV02-LCH",
"2ªIM01-LCH",
"2ªIM01-MCN",
"2ªIM02-LCH",
"2ªV01-LCH",
"2ªV01-MCN",
"2ªV02-LCH",
"2ªV03-LCH",
"3ªV01-EM-MID",
"3ªV02-EM-MID",
"3ªV03-EM-MID"
];

let vida1 = 10;
let vida2 = 10;

let pontos1 = 0;
let pontos2 = 0;

let acertos1 = 0;
let acertos2 = 0;

console.log("Script carregado");

let jogador1 = {};
let jogador2 = {};

let questaoAtual = null;
let danoAtual = 1;

let rodadaEncerrada = false;

const turma1 = document.getElementById("turma1");
const turma2 = document.getElementById("turma2");

TURMAS.forEach(turma => {

  turma1.innerHTML += `<option>${turma}</option>`;
  turma2.innerHTML += `<option>${turma}</option>`;

});

document
.getElementById("btnIniciar")
.addEventListener("click", iniciarDuelo);

function iniciarDuelo(){

  jogador1.nome =
    document.getElementById("nome1").value;

  jogador1.turma =
    document.getElementById("turma1").value;

  jogador1.personagem =
    document.getElementById("personagem1").value;

  jogador2.nome =
    document.getElementById("nome2").value;

  jogador2.turma =
    document.getElementById("turma2").value;

  jogador2.personagem =
    document.getElementById("personagem2").value;

  document.getElementById("nomeJogador1")
    .textContent = jogador1.nome;

  document.getElementById("nomeJogador2")
    .textContent = jogador2.nome;

  document.getElementById("pokemon1")
    .textContent = jogador1.personagem;

  document.getElementById("pokemon2")
    .textContent = jogador2.personagem;

  document
    .getElementById("telaInicio")
    .classList.add("oculto");

  document
    .getElementById("telaBatalha")
    .classList.remove("oculto");
 
  atualizarPontos();
  
  novaRodada();
}

function novaRodada(){

  rodadaEncerrada = false;

  danoAtual =
    Math.floor(Math.random()*3)+1;

  document.getElementById("danoRodada")
    .innerHTML =
    `⚔️ DANO DA RODADA<br>${"❤️".repeat(danoAtual)}`;

  const disciplinas =
    Object.keys(bancoQuestoes);

  const disciplina =
    disciplinas[
      Math.floor(
        Math.random()*disciplinas.length
      )
    ];

  const lista =
    bancoQuestoes[disciplina];

  questaoAtual =
    lista[
      Math.floor(
        Math.random()*lista.length
      )
    ];

  document.getElementById("disciplina")
    .textContent = disciplina;

  document.getElementById("pergunta")
    .textContent = questaoAtual.pergunta;

  configurarAlternativas();
}

function configurarAlternativas(){

  const controles =
    document.querySelectorAll(".controle");

  controles.forEach((controle, jogador)=>{

    const botoes =
      controle.querySelectorAll("button");

    botoes.forEach((botao,index)=>{

      botao.textContent =
        questaoAtual.alternativas[index];

      botao.onclick = ()=>{

        responder(
          jogador+1,
          index
        );

      };

    });

  });

}

function responder(jogador,resposta){

  if(rodadaEncerrada) return;

  rodadaEncerrada = true;

  const acertou =
    resposta === questaoAtual.correta;

  console.log("RESPONDEU");
  console.log("Jogador:", jogador);
  console.log("Acertou?", acertou);

  if(acertou){

    if(jogador===1){

      vida2 -= danoAtual;

      pontos1 += 100;
      acertos1++;

      document
      .getElementById("mensagemBatalha")
      .innerHTML =
      `🔥 ${jogador1.nome}
       atacou ${jogador2.nome}
       e causou ${danoAtual}
       de dano!`;

    }

    else{

      vida1 -= danoAtual;

      pontos2 += 100;
      acertos2++;

      document
      .getElementById("mensagemBatalha")
      .innerHTML =
      `🔥 ${jogador2.nome}
       atacou ${jogador1.nome}
       e causou ${danoAtual}
       de dano!`;

    }

  }

  else{

    if(jogador===1){

      vida1 -= danoAtual;

      pontos1 -= 50;

      document
      .getElementById("mensagemBatalha")
      .innerHTML =
      `💥 ${jogador1.nome}
       errou e recebeu
       ${danoAtual} de dano!`;

    }

    else{

      vida2 -= danoAtual;

      pontos2 -= 50;

      document
      .getElementById("mensagemBatalha")
      .innerHTML =
      `💥 ${jogador2.nome}
       errou e recebeu
       ${danoAtual} de dano!`;

    }

  }

  atualizarVida();

  atualizarPontos();

  verificarFim();

  setTimeout(()=>{

    if(vida1>0 && vida2>0){

      novaRodada();

    }

  },2000);

}
function atualizarVida(){

  document.getElementById("vida1")
    .textContent =
    "❤️".repeat(
      Math.max(0,vida1)
    );

  document.getElementById("vida2")
    .textContent =
    "❤️".repeat(
      Math.max(0,vida2)
    );

}

function verificarFim(){

  if(vida1<=0){

    alert(
      `🏆 ${jogador2.nome} venceu!`
    );

  }

  if(vida2<=0){

    alert(
      `🏆 ${jogador1.nome} venceu!`
    );

  }

}

function atualizarPontos(){

  document.getElementById("pontos1")
    .innerHTML =
    `🏆 ${pontos1} pts`;

  document.getElementById("pontos2")
    .innerHTML =
    `🏆 ${pontos2} pts`;

  document.getElementById("acertos1")
    .innerHTML =
    `✅ ${acertos1} acertos`;

  document.getElementById("acertos2")
    .innerHTML =
    `✅ ${acertos2} acertos`;

}
