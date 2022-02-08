console.log('[Cent222] Flappy Bird');

let frames = 0;
const som_HIT = new Audio();
som_HIT.src = "./efeitos/hit.wav";
const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');
contexto.imageSmoothingEnabled = false;

const telaGetReady = {
  spriteX: 134,
  spriteY: 0,
  largura: 174,
  altura: 152,
  x: ((canvas.width / 2) - (174 / 2)),
  y: ((canvas.height / 2) - (152 / 2)),

  desenha(){
    contexto.drawImage(
      sprites,
      this.spriteX, this.spriteY,
      this.largura, this.altura,
      this.x, this.y,
      this.largura, this.altura
    )
  }
}

const planoDeFundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 276,
  altura: 204,
  x: 0,
  y: canvas.height - 264,

  desenha(){
    contexto.fillStyle = "#70c5ce";
    contexto.fillRect(0, 0, canvas.height, canvas.width)
    contexto.drawImage(
      sprites,
      this.spriteX, this.spriteY,
      this.largura, this.altura,
      this.x, this.y,
      this.largura, this.altura
    ) 
    contexto.drawImage(
      sprites,
      this.spriteX, this.spriteY,
      this.largura, this.altura,
      (this.x + this.largura), this.y,
      this.largura , this.altura
    ) 
  }
}


function criaChao()  {
  const chao = {
    spritesX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,

    atualiza(){
      const movimentoChao = 1;
      const repeteEm = chao.largura / 2;
      const movimentacao = chao.x - movimentoChao;
      // console.log("Chao x: " + chao.x)
      // console.log("Repete em: " + repeteEm)
      // console.log("movimentacao: " + movimentacao)

      chao.x = movimentacao % repeteEm;
    },

    desenha(){
      contexto.drawImage(
        sprites,
        chao.spritesX, chao.spriteY,
        chao.largura, chao.altura,
        chao.x , chao.y ,
        chao.largura, chao.altura
      );

      contexto.drawImage(
        sprites,
        chao.spritesX, chao.spriteY,
        chao.largura, chao.altura,
        (chao.x + chao.largura) , chao.y ,
        chao.largura, chao.altura
      );
    }
  }
  return chao;
}

function fazColisao(flappyBird, chao){
  const flappyBirdY = flappyBird.y + flappyBird.altura;
  const chaoY = chao.y

  if (flappyBirdY >= chaoY){
    return true;
  }
  return false;
}

function criaFlappyBird(){
  const flappyBird = {
    spritesX: 0,
    spriteY: 0,
    largura: 34,
    altura: 24,
    x: 10,
    y: 50,
    pulo: 4.5,
    gravidade: 0.20,
    velocidade:0,
    
    pula() {
      flappyBird.velocidade = - flappyBird.pulo;  
    },
  
    atualiza(){
      if(fazColisao(flappyBird, globais.chao)){
        console.log('colidiu')
        som_HIT.play();
        setTimeout(() =>{

          mudaTela(telas.INICIO)
        }, 450)
        return;
      }
      flappyBird.velocidade += flappyBird.gravidade;
      flappyBird.y += flappyBird.velocidade;
    },
  
    movimentos: [
      { spriteX: 0, spriteY: 0, }, // asa pra cima
      { spriteX: 0, spriteY: 26, }, // asa no meio 
      { spriteX: 0, spriteY: 52, }, // asa pra baixo
      { spriteX: 0, spriteY: 26, }, // asa no meio 
    ],

    frameAtual: 0,
    atualizaFrameAtual(){
      const intervaloDeFrames = 10;
      const passouIntervalo = frames % intervaloDeFrames === 0;

      if(passouIntervalo){
        const baseDoIncremento = 1;
        const incremento = baseDoIncremento + flappyBird.frameAtual;
        const baseRepeticao = flappyBird.movimentos.length;
        flappyBird.frameAtual = incremento % baseRepeticao;
        
        // console.log("incremento: "+ incremento);
        // console.log("baseRepeticao: "+ baseRepeticao);
        // console.log("Frame: "+ incremento % baseRepeticao);
      }

    },

    desenha(){
      this.atualizaFrameAtual()
      const {spriteX, spriteY} = flappyBird.movimentos[this.frameAtual];
      contexto.drawImage(
        sprites, //imagem
        spriteX, spriteY, //posicao no sprite x e sprite y
        flappyBird.largura, flappyBird.altura, //largura e altura para recorte no sprite
        flappyBird.x, flappyBird.y, //posicao onde vai desenhar
        flappyBird.largura, flappyBird.altura // tamanho que vai desenhar
      );
    }
  }
  return flappyBird;
}

let globais = {};
let telaAtiva = {};

function mudaTela(novaTela){
  telaAtiva = novaTela;

  if(telaAtiva.inicializa){
    telaAtiva.inicializa();
  }
};

//telas
const telas = {
  INICIO: {
    inicializa(){
      globais.flappyBird = criaFlappyBird();
      globais.chao = criaChao();
    },
    desenha(){
      planoDeFundo.desenha();
      globais.flappyBird.desenha();
      globais.chao.desenha();
      telaGetReady.desenha();
    },
    atualiza(){
      globais.chao.atualiza();
    },
    click(){
      mudaTela(telas.JOGO)
    }
  },

  JOGO: {
    desenha(){
      planoDeFundo.desenha();
      globais.chao.desenha();
      globais.flappyBird.desenha()
    },
    click(){
      globais.flappyBird.pula();
    },
    atualiza(){
      globais.flappyBird.atualiza();
    },
  }
};


function loop() {
  telaAtiva.desenha();
  telaAtiva.atualiza();
  frames += 1;
  requestAnimationFrame(loop);
}

window.addEventListener('click', function (){
  if (telaAtiva.click){
    telaAtiva.click()
  }
})

mudaTela(telas.INICIO)
loop();
