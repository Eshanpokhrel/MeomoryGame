const button = document.querySelector("#btn");
const welcome = document.querySelector("#welcome");
const counter = document.querySelector("#clock");
const best = document.querySelector("#score")

const cardArray = [
    {
        name: 'kiwi',
        img: 'images/kiwi.png'
    },
    {
        name: 'avocado',
        img: 'images/avocado.png'
    },
    {
        name: 'Pears',
        img: 'images/Pears.png'
    },
    {
        name: 'mango',
        img: 'images/mango.png'
    },
    {
        name: 'apple',
        img: 'images/apple.png'
    },
    {
        name: 'green-apple',
        img: 'images/green-apple.png'
    },
    {
        name: 'banana',
        img: 'images/banana.png'
    },
    {
        name: 'peach',
        img: 'images/peach.png'
    },
    {
        name: 'strawberry',
        img: 'images/strawberry.png'
    },
    {
        name: 'orange',
        img: 'images/orange.png'
    },
    {
        name: 'kiwi',
        img: 'images/kiwi.png'
    },
    {
        name: 'Pears',
        img: 'images/Pears.png'
    },
    {
        name: 'avocado',
        img: 'images/avocado.png'
    },
    {
        name: 'mango',
        img: 'images/mango.png'
    },
    {
        name: 'apple',
        img: 'images/apple.png'
    },
    {
        name: 'green-apple',
        img: 'images/green-apple.png'
    },
    {
        name: 'banana',
        img: 'images/banana.png'
    },
    {
        name: 'peach',
        img: 'images/peach.png'
    },
    {
        name: 'strawberry',
        img: 'images/strawberry.png'
    },
    {
        name: 'orange',
        img: 'images/orange.png'
    }
]
cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.getElementById('result')

let totalSeconds = 0;
let cardChosen = []
let cardChosenId = []
const cardsWon = []

best.textContent = localStorage.getItem('highscore') + ' sec';
function createBoard(){
    for(let i = 0; i < cardArray.length; i++){
        const card = document.createElement('img')
        card.setAttribute('src','images/cover.png')
        card.setAttribute('data-id',i)
        card.addEventListener('click',flipCard)
        gridDisplay.appendChild(card)
    }
}
createBoard();

function checkMatch(){
    const cards = document.querySelectorAll('img')
    const opt1Id = cardChosenId[0]
    const opt2Id = cardChosenId[1]

    if (opt1Id == opt2Id) {
        cards[opt1Id].setAttribute('src','images/cover.png')
        cards[opt2Id].setAttribute('src','images/cover.png')
        alert('You have clicked same image')
    }

    if (cardChosen[0] == cardChosen[1]) {
        // alert('Its a match')
        // audio.play()
        playAudio()
        cards[opt1Id].setAttribute('class','matched')
        cards[opt2Id].setAttribute('class','matched')
        cards[opt1Id].removeEventListener('click',flipCard)
        cards[opt2Id].removeEventListener('click',flipCard)
        cardsWon.push(cardChosen)
    }else{
        cards[opt1Id].setAttribute('src','images/cover.png')
        cards[opt2Id].setAttribute('src','images/cover.png')
    }
    cardChosen = []
    cardChosenId = []

    if (cardsWon.length == cardArray.length/2) {
        // console.log(totalSeconds)
        // resultDisplay.textContent = "Congrulations, you've won!"
        // alert('You Won')
        let score = localStorage.getItem('highscore')
        if(score == null){
            localStorage.setItem('highscore',totalSeconds);
        }
        else if (totalSeconds < score) {
            localStorage.setItem('highscore',totalSeconds);
        }
        finalAudio()
        alert(`You completed the game in ${totalSeconds} sec`);
        setInterval(() => {
            location.reload()
        }, 1500);
    }
}

function flipCard(){
    const cardId = this.getAttribute('data-id')
    //console.log('clicked',cardId)
    cardChosen.push(cardArray[cardId].name)
    cardChosenId.push(cardId)
    this.setAttribute('src',cardArray[cardId].img)
    if (cardChosen.length === 2) {
        setTimeout(checkMatch,500)
    }
}

function finalAudio(){
    const winAudio = document.getElementById('finalAudio')
    winAudio.play()
}

function playAudio(){
    const audio = document.getElementById('audio')
    audio.play()
}

function totalTime(){
    setInterval(() => {
        totalSeconds++;
        counter.textContent = totalSeconds + " sec";
    }, 1000);
}

button.addEventListener('click',() =>{
    const audio = document.getElementById('audio')
    audio.play();
    welcome.style.display = "none";
    totalTime();
})