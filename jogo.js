console.log('[Cent222] Flappy Bird');

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


const chao = {
  spritesX: 0,
  spriteY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height - 112,

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
      if(fazColisao(flappyBird, chao)){
        console.log('colidiu')
        mudaTela(telas.INICIO)
        return;
      }
      flappyBird.velocidade += flappyBird.gravidade;
      flappyBird.y += flappyBird.velocidade;
    },
  
    desenha(){
      contexto.drawImage(
        sprites, //imagem
        flappyBird.spritesX, flappyBird.spriteY, //posicao no sprite x e sprite y
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
    },
    desenha(){
      planoDeFundo.desenha();
      chao.desenha();
      globais.flappyBird.desenha();
      telaGetReady.desenha();
    },
    atualiza(){

    },
    click(){
      mudaTela(telas.JOGO)
    }
  },

  JOGO: {
    desenha(){
      planoDeFundo.desenha();
      chao.desenha();
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
  requestAnimationFrame(loop);
}

window.addEventListener('click', function (){
  if (telaAtiva.click){
    telaAtiva.click()
  }
})

mudaTela(telas.INICIO)
loop();
