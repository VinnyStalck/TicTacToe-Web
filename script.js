const selectBox = document.querySelector(".select-box"),
	selectXButton = selectBox.querySelector(".playerX"),
	selectOButton = selectBox.querySelector(".playerO"),
	playboard = document.querySelector(".playboard"),
	allBoxes = document.querySelectorAll("section span"),
	players = document.querySelector(".players");

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
let playerXSymbol = "fas fa-times";
let playerOSymbol = "far fa-circle";

// Quando uma caixa é clickada pelo usuário
function clickedBox(element) {
	if (players.classList.contains("player")) {
		// Addiciona o simbolo
		element.innerHTML = `<i class="${playerOSymbol}"></i>`;
	} else {
		element.innerHTML = `<i class="${playerXSymbol}"></i>`;
	}
	// Muda de jogador
	players.classList.add("active");
	// Faz o element não ser mais clickável
	element.style.pointerEvents = "none";


	let randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
	setTimeout(() => {
		bot();
	}, randomDelayTime);
}

function bot(){
	let array = [];
	for (let i = 0; i < allBoxes.length; i++) {
		if (allBoxes[i].childElementCount == 0) {
			array.push(i);
			console.log(i+" has no children");
		}
	}
	let randomBox = array[Math.floor(Math.random() * array.length)];
	if (array.length > 0) {
		if (players.classList.contains("player")) {
			// Addiciona o simbolo
			allBoxes[randomBox].innerHTML = `<i class="${playerXSymbol}"></i>`;
		} else {
			allBoxes[randomBox].innerHTML = `<i class="${playerOSymbol}"></i>`;
		}
		players.classList.remove("active");
	}
	allBoxes[randomBox].style.pointerEvents = "none";
}