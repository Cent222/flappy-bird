console.log('[Cent222] Flappy Bird');

let frames = 0;
const som_HIT = new Audio();
som_HIT.src = "./efeitos/hit.wav";
const som_PULO = new Audio();
som_PULO.src = "./efeitos/pulo.wav"
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

const telaGameOver = {
  spriteX: 134,
  spriteY: 153,
  largura: 226,
  altura: 200,
  x: ((canvas.width / 2) - (226 / 2)),
  y: ((canvas.height / 2) - (200 / 2)),

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
      som_PULO.play();
      flappyBird.velocidade = - flappyBird.pulo;  
    },
  
    atualiza(){
      if(fazColisao(flappyBird, globais.chao)){
        som_HIT.play();

        mudaTela(telas.GAME_OVER)
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

function criaCanos(){
  const canos = {
    largura: 52,
    altura: 400,
    chao: {
      spriteX: 0,
      spriteY: 169,
    },
    ceu:{
      spriteX: 52,
      spriteY: 169,
    },
    espaco: 80,

    desenha(){
      canos.pares.forEach(function(par){
        const yRandom = par.y;
        const espacamentoEntreCanos = 90;
       
        // cano ceu  
        const canoCeuX = par.x;
        const canoCeuY = yRandom;
        contexto.drawImage(
          sprites,
          canos.ceu.spriteX, canos.ceu.spriteY,
          canos.largura, canos.altura,
          canoCeuX, canoCeuY,
          canos.largura, canos.altura,
        )
      
        // cano chao 
        const canoChaoX = par.x;
        const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
        contexto.drawImage(
          sprites,
          canos.chao.spriteX, canos.chao.spriteY,
          canos.largura, canos.altura,
          canoChaoX, canoChaoY,
          canos.largura, canos.altura,
        )

        par.canoCeu  = {
          x: canoCeuX,
          y: canos.altura + canoCeuY
        };
        par.canoChao = {
          x: canoChaoX,
          y: canoChaoY
        }
      })
    },
    fazColisaoComFlappyBird(par){
      const cabecaDoFlappy = globais.flappyBird.y;
      const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura

      if((globais.flappyBird.x + globais.flappyBird.largura - 5) >= par.x){
        if(cabecaDoFlappy <= par.canoCeu.y){
          return true;
        };
        
        if (peDoFlappy >= par.canoChao.y){
          return true;
        };
      }
      return false;
    },

    pares: [],

    atualiza(){
      const passou100Frames = (frames % 100) === 0;
      if(passou100Frames){
        // console.log( 'passou 100 frames')
        canos.pares.push({
          x: canvas.width,
          y:-150 * (Math.random() + 1)
        });
      }

      canos.pares.forEach(function (par){
        par.x = par.x - 2;

        if(canos.fazColisaoComFlappyBird(par)){
          som_HIT.play();
          mudaTela(telas.GAME_OVER)
        };

        if(par.x + canos.largura <= 0){
          canos.pares.shift();
        };
      });
    },
  }
  return canos;
}

function criaPlacar(){
  const placar = {
    pontuacao: 0,
    
    desenha(){
      contexto.font = '35px "VT323"'
      contexto.textAlign = 'right'
      contexto.fillStyle ='white' 
      contexto.fillText(`Pontuação ${placar.pontuacao}`, canvas.width - 5, 35)
    },
    atualiza(){
      const intervaloDeFrames = 100;
      const passouIntervalo = frames % intervaloDeFrames === 0;

      if (passouIntervalo){
        placar.pontuacao += 1;
      }

    }
  }
  return placar;
}


//telas
let globais = {};
let telaAtiva = {};

function mudaTela(novaTela){
  telaAtiva = novaTela;

  if(telaAtiva.inicializa){
    telaAtiva.inicializa();
  }
};

const telas = {
  INICIO: {
    inicializa(){
      globais.flappyBird = criaFlappyBird();
      globais.chao = criaChao();
      globais.canos = criaCanos();
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
    inicializa(){
      globais.placar = criaPlacar();
    },
    desenha(){
      planoDeFundo.desenha();
      globais.canos.desenha();
      globais.chao.desenha();
      globais.flappyBird.desenha()
      globais.placar.desenha();
    },
    click(){
      globais.flappyBird.pula();
    },
    atualiza(){
      globais.flappyBird.atualiza();
      globais.canos.atualiza();
      globais.chao.atualiza();
      globais.placar.atualiza();
    },
  },
  GAME_OVER: {
    desenha(){
      telaGameOver.desenha();
    },
    atualiza(){

    },
    click(){
      mudaTela(telas.INICIO)
    }
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
