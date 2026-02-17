let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector('#new-btn');
let msg = document.querySelector('#win-msg');
let msgContainer = document.querySelector('.msg-container')
let turnO = true; // playerx, playerO

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]


boxes.forEach((box1)=>{
    box1.addEventListener('click',()=>{
        console.log(box1)
        if(turnO){
            box1.innerText = 'O';
            box1.style.color = 'red';
            turnO = false;
        } else {
            box1.innerText = 'X';
            box1.style.color = 'black';
            turnO = true;
        }
        box1.disabled = true;
        checkWinner();
    })
});

const checkWinner = () =>{
    for(let pattern of winPatterns){
        console.log(pattern)
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos2Val);
            }

        }
    }
};

const showWinner = (winner) =>{
    msg.innerText = `Congratulation, Winner is ${winner}`;
    msgContainer.classList.remove('hide');
    disableBoxes();
}

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const resetGame = () =>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add('hide');
}
const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showDraw = () => {
    msg.innerText = "No more moves, Game Draw !";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
