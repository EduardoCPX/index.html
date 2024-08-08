//variavei da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 22;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variaveis da raquete
let Xraquete = 5;
let Yraquete = 150;

//variaveis do oponente
let XRaqueteOponente = 585;
let YRaqueteOponente = 150;
let velocidadeYOponente;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

let colidiu = false;

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background("black");
  mostraAbola();
  movimentaçao();
  colisao();
  mostraRaquete(Xraquete, Yraquete);
  movimentacao();
  //colisaoRaquete();
  verificaColisaoRaquete(Xraquete, Yraquete);
  mostraRaquete(XRaqueteOponente, YRaqueteOponente);
  movimentaRaqueteOponente();
  marcaPontos();
  verificaColisaoRaquete(XRaqueteOponente, YRaqueteOponente);
  incluiPlacar();
}

function mostraAbola() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaçao() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function colisao() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentacao() {
  if (keyIsDown(UP_ARROW)) {
    Yraquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    Yraquete += 10;
  }
}

function colisaoRaquete() {
  if (
    xBolinha - raio < Xraquete + raqueteComprimento &&
    yBolinha - raio < Yraquete + raqueteAltura &&
    yBolinha + raio > Yraquete
  ) {
    velocidadeXBolinha *= -1;
  }
}

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(
    x,
    y,
    raqueteComprimento,
    raqueteAltura,
    xBolinha,
    yBolinha,
    raio
  );
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente() {
  if (keyIsDown(87)) {
    YRaqueteOponente -= 10;
  }
  if (keyIsDown(83)) {
    YRaqueteOponente += 10;
  }
}

function incluiPlacar() {
  stroke("white");
  textAlign(CENTER);
  textSize(16);
  fill("rgb(255,140,0)");
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill("rgb(255,140,0)");
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcaPontos() {
  if (xBolinha > 585) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 15) {
    pontosOponente += 1;
    ponto.play();
  }
}
