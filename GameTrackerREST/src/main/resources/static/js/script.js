/**
 * 
 */

window.addEventListener('load', function(e) {
	init();
})

function init() {
	console.log('load');

	loadAllGames();
}

function loadAllGames() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://localhost:8084/api/games');

	xhr.onreadystatechange = function() {
		console.log('== In onreadystatechange: ' + xhr.readyState);
		if (xhr.readyState === xhr.DONE) {
			if (xhr.status === 200) {
				let games = JSON.parse(xhr.responseText)
				displayGames(games);
			}
			else {
				console.error('Error getting data: ' + xhr.status);
			}
		}
	};
	xhr.send();
}

function displayGames(games) {
	let tbody = document.getElementById('gameEntries');
	console.log(tbody);
	tbody.textContent = '';

	for (let game of games) {
		console.log(game);
		let tr = document.createElement('tr');
		for (let field in game) {
			let td = document.createElement('td');
			td.textContent = '';
			if (field !== null) {
				td.textContent = game[field];
			}
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}



}