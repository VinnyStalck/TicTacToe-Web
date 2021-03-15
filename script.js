const selectBox = document.querySelector(".select-box"),
	selectXButton = selectBox.querySelector(".playerX"),
	selectOButton = selectBox.querySelector(".playerO"),
	playboard = document.querySelector(".playboard");

// Quando a tela carrega
window.onload = () => {
	selectXButton.onclick = () => {
		// Fecha a tela de seleção
		selectBox.classList.add("hide");
		// Abre a tela de jogo
		playboard.classList.add("show")
	}
	selectOButton.onclick = () => {
		selectBox.classList.add("hide");
		playboard.classList.add("show")
	}
}