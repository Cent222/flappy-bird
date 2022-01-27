console.log('[Cent222] Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

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
      chao.x + chao.largura , chao.y ,
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
  desenha(){
    contexto.drawImage(
      sprites, //imagem
      flappyBird.spritesX, flappyBird.spriteY, //posicao no sprite x e sprite y
      flappyBird.largura, flappyBird.altura, //largura e altura para recorte no sprite
      flappyBird.x, flappyBird.y, //posicao onde vai desenhar
      flappyBird.largura, flappyBird.altura // tamanho que vai desenhar
    )
  
  }
}

function loop() {
  chao.desenha();
  flappyBird.desenha();
  requestAnimationFrame(loop);
}

loop();