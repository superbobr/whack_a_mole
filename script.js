let fields = document.querySelectorAll('.field'),
    button = document.querySelector('.button'),
    score = document.querySelector('.score'),
    game = document.querySelector('.game'),
    scorePlus = 0,
    enemies = document.querySelectorAll('.enemy');

let shootAudio = new Audio('assets/audio/shot.wav');
let yeah = new Audio('assets/audio/yeah.wav');
let lastField;
let timeUp = false;

    button.addEventListener('click', () => start());
    game.addEventListener('click', () => shootAudio.play());

    function randomTime(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }

    function randomField(fields) {
      const index = Math.floor(Math.random() * fields.length);
      const field = fields[index];
      return field;
    }

    function shoot() {
      const time = randomTime(200, 1000);
      const field = randomField(fields);
      field.classList.add('up');
      setTimeout(() => {
          field.classList.remove('up');
          if(!timeUp) shoot();
      }, time);
    }

    function start() {
        score.textContent = 0;
        timeUp = false;
        scorePlus = 0;
        shoot();
        setTimeout(() => timeUp = true, 20000);
    }

    function target(e) {
        if(!e.isTrusted) return;
        this.parentNode.classList.remove('up');
        scorePlus++;        
        yeah.play();
        score.textContent = scorePlus;
    }

    enemies.forEach(enemy => enemy.addEventListener('click', target));
    
    