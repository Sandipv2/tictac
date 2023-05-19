const cells = document.querySelectorAll('.cell');
let player = 'X';
let score = {x: 0, o: 0, d: 0};
let scoreBoard = document.getElementById('scoreBoard');
let scoreX = document.getElementById('scoreX');
let scoreO = document.getElementById('scoreO');
let scoreD = document.getElementById('scoreD');
let xTurn = document.getElementById('xTurn');
let oTurn = document.getElementById('oTurn');

xTurn.classList.add('brightTurn')
cells.forEach((cell)=>{
	cell.addEventListener('click', handleClick);
	popUp();
	popUpScore();
})

function popUpScore(){
	setTimeout(()=>{
		scoreBoard.style.transform = 'scale(1)';
	},200)
}

function popUp(){
	cells.forEach((cell)=>{
		cell.style.transform = 'scale(0)'
		setTimeout(()=>{
				cell.style.transform = 'scale(1)';
		},200)
	})
}

function handleClick(e){
	if(e.target.innerText==''){
		e.target.innerText = player;
		checkWinner();
		switchPlayer();
	}
}

function switchPlayer(){
	if(player == 'X'){
		player = 'O'
		oTurn.classList.add('brightTurn');
		xTurn.classList.remove('brightTurn');
	}
	else{
		player = 'X';
		xTurn.classList.add('brightTurn');
		oTurn.classList.remove('brightTurn');
	}
}

function checkWinner(){
	const winCom = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,4,8],
		[2,4,6],
		[0,3,6],
		[2,5,8],
		[1,4,7]
	]
	
	const match = winCom.some((comb)=>{
		return comb.every((i)=>{
			return cells[i].innerText == player;
		})
	})
	
	if(match){
		if(player == 'X'){
			scoreX.innerHTML = `Player X: ${score.x += 1}`
			msgPopUp('X')
		}
		else if(player == 'O'){
			scoreO.innerHTML = `Player O: ${score.o += 1}`
			msgPopUp('O')
		}
		restartGame();
		popUp();
	}
	else{
		if(isDraw()){
			scoreD.innerHTML = `Draw Match: ${score.d += 1}`
			msgPopUp('Match Draw')
			restartGame();
			popUp();
		}
	}
}

function isDraw(){
	const cellArray = Array.from(cells);
	return cellArray.every((cell)=>{
		return cell.innerText != '';
	})
}

function restartGame(){
	for(let i=0; i<cells.length; i++){
		cells[i].innerText = ''
	}
}

function msgPopUp(stat){
	let msgBox = document.getElementById('msgBox');
	if(stat == 'X'){
		msgBox.innerHTML = `<h1>Player ${stat} Won</h1>`
		msgBox.style.transform = 'scale(1)'
		setTimeout(()=>{
			msgBox.style.transform = 'scale(0)'
		},1000)
	}
	else if(stat == 'O'){
		msgBox.innerHTML = `<h1>Player ${stat} Won</h1>`
		msgBox.style.transform = 'scale(1)'
		setTimeout(()=>{
			msgBox.style.transform = 'scale(0)'
		},1000)
	}
	else if(stat == 'Match Draw'){
		msgBox.innerHTML = `<h1>${stat}</h1>`
		msgBox.style.transform = 'scale(1)'
		setTimeout(()=>{
			msgBox.style.transform = 'scale(0)'
		},1000)
	}
}