const dino = document.querySelector('.dino');   // Seleciona o elemento para manipular
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyup(event){
    if (event.keyCode === 32){      // Identifica quando a tecla Espaço é pressionada.
        if (!isJumping){
            jump();  
        }   
    }
}

function jump() {       // Função jump -- Responsável pelo pulo do Dino.
    isJumping = true;

    let upInterval = setInterval(() => {    // Repetição de intervalos. -- //setInterval: Define intervalos
        if (position >= 150) {
            // Descendo
            clearInterval(upInterval);
            
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else { 
            // Subindo
            position += 20;       // Tudo que estiver dentro será executado sem parar dentro do intervalo que será defindo. (20s)
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 2500;
    let randomTime = Math.random() * 5000;
  
    if (isGameOver) return;
  
    cactus.classList.add('cactus');
    background.appendChild(cactus);
    cactus.style.left = cactusPosition + 'px';
  
    let leftTimer = setInterval(() => {
      if (cactusPosition < -60) {
        // Saiu da tela
        clearInterval(leftTimer);
        background.removeChild(cactus);
      } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
        // Game over
        clearInterval(leftTimer);
        isGameOver = true;
        document.body.innerHTML = '<h1 class="game-over">Game Over</h1>';
      } else {
        cactusPosition -= 10;
        cactus.style.left = cactusPosition + 'px';
      }
    }, 20);
  
    setTimeout(createCactus, randomTime);
  }

createCactus();
document.addEventListener('keyup', handleKeyup ); 

