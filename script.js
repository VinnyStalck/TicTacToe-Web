const
	selectBox = document.querySelector(".select-box"),
	selectXButton = selectBox.querySelector(".playerX"),
	selectOButton = selectBox.querySelector(".playerO"),
	playboard = document.querySelector(".playboard"),
	allBoxes = document.querySelectorAll("section span"),
	players = document.querySelector(".players"),
	resultBox = document.querySelector(".result-box"),
	winnerText = resultBox.querySelector(".winner-text"),
	replayButton = resultBox.querySelector(".replay-btn button");

// Quando a tela carrega
window.onload = () => {
	// Adiciona o atributo onClick à todos spans das sections
	for (let i = 0; i < allBoxes.length; i++) {
		allBoxes[i].setAttribute("onclick", "clickedBox(this)");
		
	}

	selectXButton.onclick = () => {
		// Fecha a tela de seleção
		selectBox.classList.add("hide");
		// Abre a tela de jogo
		playboard.classList.add("show");
	}
	selectOButton.onclick = () => {
		selectBox.classList.add("hide");
		playboard.classList.add("show");
		players.setAttribute("class", "players active player");
	}
}

// FontAwesome symbols
let xSymbol = "fas fa-times";
let oSymbol = "far fa-circle";
let playerSymbol;
let gameOver = false;

// Quando uma caixa é clickada pelo usuário
function clickedBox(element) {
	if (players.classList.contains("player")) {
		playerSymbol = "O";
		// Addiciona o simbolo
		element.innerHTML = `<i class="${oSymbol}"></i>`;
	} else {
		playerSymbol = "X";
		element.innerHTML = `<i class="${xSymbol}"></i>`;
	}
	// Muda de jogador
	players.classList.add("active");
	// Concede 
	element.setAttribute("id", playerSymbol)
	// Faz a caixa não ser mais clickável
	playboard.style.pointerEvents = "none";
	element.style.pointerEvents = "none";

	checkForWinner();

	if (!gameOver) {
		let randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
		setTimeout(() => {
			bot();
		}, randomDelayTime);
	}
}

function bot(){
	let array = [];
	for (let i = 0; i < allBoxes.length; i++) {
		if (allBoxes[i].childElementCount == 0) {
			array.push(i);
		}
	}
	if (array.length > 0) {
		let randomBox = array[Math.floor(Math.random() * array.length)];
		if (players.classList.contains("player")) {
			playerSymbol = "X";
			allBoxes[randomBox].innerHTML = `<i class="${xSymbol}"></i>`;
		} else {
			playerSymbol = "O";
			allBoxes[randomBox].innerHTML = `<i class="${oSymbol}"></i>`;
		}
		players.classList.remove("active");
		allBoxes[randomBox].setAttribute("id", playerSymbol)
		allBoxes[randomBox].style.pointerEvents = "none";
		playboard.style.pointerEvents = "auto";
	}
	checkForWinner();
}

function getBoxId(idName) {
	return document.querySelector(".box" + idName).id;
}
function checkForWinner() {
	if (isMatch() || isAllBoxesMarked()) {
		gameOver = true;
		// Fecha a caixa de jogo e abre a de vencedor
		setTimeout(() => {
			playboard.classList.remove("show");
			resultBox.classList.add("show");
		}, 700);
		if (!isMatch()) {
			winnerText.innerHTML = `Deu velha!`;
		} else {
			winnerText.innerHTML = `O jogador <p>${playerSymbol}</p> venceu!`;
		}
	}
}

// Verifica se hà uma combinação
function isMatch() {
	if (checkMatch(1,2,3,playerSymbol) || checkMatch(4,5,6, playerSymbol) || checkMatch(7,8,9, playerSymbol) || checkMatch(1,4,7, playerSymbol) || checkMatch(2,5,8, playerSymbol) || checkMatch(3,6,9, playerSymbol) || checkMatch(1,5,9, playerSymbol) || checkMatch(3,5,7, playerSymbol)) {
		return true;
	} else {
		return false;
	}
}
function checkMatch(val1, val2, val3, symbol) {
	if (getBoxId(val1) == symbol && getBoxId(val2) == symbol && getBoxId(val3) == symbol) {
		return true;
	}
}

// Verifica se todas as caixas foram marcadas
function isAllBoxesMarked() {
	let emptyBoxExists = false;
	for (let i = 1; i < 10; i++) {
		if(getBoxId(i) == "") {
			emptyBoxExists = true;
			break;
		}
	}
	if (emptyBoxExists) {
		return false;
	} else {
		return true;
	}
}

replayButton.onclick = () => {
	window.location.reload();
}