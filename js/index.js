var timerBlock = document.getElementById('timer');
var startBtn = document.getElementById('start');
var stopBtn = document.getElementById('stop');
var lap = document.getElementById('lap');
var img = document.getElementById('img');
var description = document.getElementById('description');
var exBlock = document.getElementById('exBlock');
var lapNum = 5;
var mainTime = 45;
var chillTime = 15;
var isStarted = false;

var excersize = {
    0: {
        name: 'Прыжки со скакалкой',
        file: 'jump',
        description: 'Если нет скакалки - можно делать вид, что прыгаете на ней, эффект точно такой же'
    },
    1: {
        name: 'Бег с подъемом колен',
        file: 'run',
        description: ''
    },
    2: {
        name: 'Бег с захлестыванием ног назад',
        file: 'back',
        description: ''
    },
    3: {
        name: 'Прижки руки в сторону ноги в сторону',
        file: 'jump-out',
        description: ''
    },
    4: {
        name: 'Быстрый бег на месте',
        file: 'run-up',
        description: ''
    },
    5: {
        name: 'Шаги альпиниста',
        file: 'alp',
        description: ''
    },
    6: {
        name: 'Велосипед',
        file: 'velo',
        description: ''
    }
}

for (let key in excersize) {
    var exElem = document.createElement('li');
    exElem.innerHTML = `<p class="excersize">${excersize[key].name}</p>`;
    exBlock.appendChild(exElem);
}

startBtn.onclick = (e) => {

    var music = new Audio();
    music.src = './files/music4.mp3';
    music.play();


    if (isStarted === true) {
        return;
    }
    isStarted = true;
    e.preventDefault();

    var iterator = 0;
    var isActive = true;
    var isPaused = false;
    var onStart = true;

    var exNum = 0;

    var audio = new Audio();

    var timer = setInterval(() => {
        lap.innerHTML = 'Круг: '+lapNum;

        if (onStart && iterator === 0 && !isPaused) {
            isPaused = true;
            img.src = './img/'+excersize[exNum].file+'.jpg';
            img.onerror = () => {
                img.style.display = 'none';
            }
            img.onload = () => {
                img.style.display = 'block';
            }
            audio.src = './files/'+excersize[exNum].file+'.mp3';
            music.volume = 0.01;
            audio.play();
            audio.onended = () => {
                isPaused = false;
                onStart = false;
                music.volume = 1;
            }
        }

        !isPaused ? iterator++ : iterator;

        if (iterator === 0) {
            if (isActive) {
                timerBlock.innerHTML = excersize[exNum].name;
                description.innerHTML = excersize[exNum].description;
                exBlock.children[exNum].innerHTML = `<p class="excersize">${excersize[exNum].name}<span></span></p>`;
            } else {
                timerBlock.innerHTML = 'Переход';
            }
        } else {
            if (!isActive) {
                timerBlock.innerHTML = `Отдых: ${(chillTime+1 - iterator)}`;
            } else {
                timerBlock.innerHTML = `Упражненение: ${(mainTime+1-iterator)}`;
            }
        }

        if (isActive && iterator === mainTime) {
            iterator = 0;
            isActive = false;
            isPaused = true;
            exBlock.children[exNum].innerHTML = `<p class="excersize">${excersize[exNum].name}</p>`;
            exNum++;
            if (exNum >= Object.keys(excersize).length) {
                music.pause();
                audio.src = 'files/lap.mp3';
            } else {
                audio.src = 'files/end.mp3';
            }
            music.volume = 0.01;
            audio.play();
            audio.onended = () => {
                isPaused = false;
                music.volume = 1;
            }
        }
        if (!isActive && iterator === chillTime) {
            iterator = 0;
            isActive = true;
            onStart = true;
        }
        if (exNum >= Object.keys(excersize).length) {
            clearInterval(timer);
            setTimeout(() => {
                timerBlock.innerHTML = 'Круг закончен, нажмите "Запуск" для следующего круга';
                lapNum++;
                isStarted = false;
            }, 1000);
        }
    }, 1000);

    stopBtn.onclick = () => {
        if (!audio.paused) {
            isPaused = isPaused;
            audio.pause();
            if (music.paused) {
                music.play();
            } else {
                music.pause();
            }
        } else {
            isPaused = !isPaused;
            if (music.paused) {
                music.play();
            } else {
                music.pause();
            }
        }
    }
};
