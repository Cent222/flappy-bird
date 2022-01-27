console.log('[Cent222] Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');
contexto.imageSmoothingEnabled = false;

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
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      planoDeFundo.x, planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura
    ) 
    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
      planoDeFundo.largura , planoDeFundo.altura
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

const flappyBird = {
  spritesX: 0,
  spriteY: 0,
  largura: 34,
  altura: 24,
  x: 10,
  y: 50,
  gravidade: 0.20,
  velocidade:0,

  atualiza(){
    flappyBird.velocidade += flappyBird.gravidade;
    flappyBird.y += this.velocidade;
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

function loop() {
  flappyBird.atualiza();

  planoDeFundo.desenha();
  chao.desenha();
  flappyBird.desenha();

  requestAnimationFrame(loop);
}

loop();
