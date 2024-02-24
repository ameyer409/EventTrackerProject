/**
 * 
 */

window.addEventListener('load', function(e) {
	init();
})

function init() {
	console.log('load');
	let details = document.getElementById('gameDetails');
	details.style.display = "none";

	loadAllGames();
	
	let button = document.getElementById('detailsbtn');
	console.log(button);
	button.addEventListener('click', function(e) {
		e.preventDefault();
		console.log('click');
		showTable();
	});

	document.genreForm.genreLookup.addEventListener('click', function(event) {
		event.preventDefault();
		let genre = document.genreForm.genre.value;
		loadGamesByGenre(genre);
	});

	document.ratingForm.ratingLookup.addEventListener('click', function(event) {
		event.preventDefault();
		let rating = document.ratingForm.rating.value;
		loadGamesByRating(rating);
	});

	document.scoreForm.scoreLookup.addEventListener('click', function(event) {
		event.preventDefault();
		let low = document.scoreForm.low.value;
		let high = document.scoreForm.high.value;
		console.log(low);
		console.log(high);
		if (low === '') {
			low = 0;
		}
		if (high === '') {
			high = 5;
		}
		loadGamesByScore(low, high);
	})

	document.keywordForm.keywordLookup.addEventListener('click', function(event) {
		event.preventDefault();
		let keyword = document.keywordForm.keyword.value;
		loadGamesByKeyword(keyword);
	})

	document.addGameForm.addGame.addEventListener('click', function(e) {
		e.preventDefault();
		let hof = document.addGameForm.hallOfFame.value;
		if (hof === 'on') {
			hof = true;
		}
		else {
			hof = false;
		}
		game = {
			name: document.addGameForm.name.value,
			genre: document.addGameForm.genre.value,
			rating: document.addGameForm.rating.value,
			score: document.addGameForm.score.value,
			hallOfFame: hof,
			releaseDate: new Date(document.addGameForm.release.value),
			completedDate: new Date(document.addGameForm.completion.value),
			description: document.addGameForm.description.value,
			review: document.addGameForm.review.value
		};
		if (game.name !== '' && game.genre !== '') {
			createGame(game);
		}


	});

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
	let thead = document.getElementById('gameHeaders')
	thead.textContent = '';
	let game = games[0];
	let tr = document.createElement('tr');
	for (let field in game) {
		if (field !== 'id' && field !== 'hallOfFame' && field !== 'createdAt' && field !== 'updatedAt') {
			let th = document.createElement('th');
			th.textContent = field;
			tr.appendChild(th);
		}
	}
	thead.appendChild(tr);

	let tbody = document.getElementById('gameEntries');
	tbody.textContent = '';

	for (let game of games) {
		let tr = document.createElement('tr');
		tr.gameId = game.id
		for (let field in game) {
			if (field !== 'id' && field !== 'hallOfFame' && field !== 'createdAt' && field !== 'updatedAt') {
				let td = document.createElement('td');
				td.textContent = '';
				if (field !== null) {
					td.textContent = game[field];
				}
				tr.appendChild(td);
			}
		}
		tr.addEventListener('click', function(e) {
			console.log(tr.gameId);
			getGame(tr.gameId);
		});
		tbody.appendChild(tr);
	}

}

function getGame(gameId) {
	// TODO:
	// * Use XMLHttpRequest to perform a GET request to "api/films/"
	//   with the filmId appended.
	// * On success, if a response was received parse the film data
	//   and pass the film object to displayFilm().
	// * On failure, or if no response text was received, put "Film not found" 
	//   in the filmData div.

	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/games/' + gameId);

	xhr.onreadystatechange = function() {
		if (xhr.readyState === xhr.DONE) {
			if (xhr.status === 200) {
				let game = JSON.parse(xhr.responseText)
				showDetails(game);
			}
			else if (xhr.status === 404) {
				let dataDiv = document.getElementById('gameDetails');
				dataDiv.textContent = 'Game not found';
			}
			else {
				console.error('Error getting data: ' + xhr.status);
			}
		}
	};

	xhr.send();
}

function showDetails(game) {
	let table = document.getElementById('gameList');
	let details = document.getElementById('gameDetails');
	table.style.display = "none";
	details.style.display = "block";
	

}

function showTable(){
	let table = document.getElementById('gameList');
	let details = document.getElementById('gameDetails');
	table.style.display = "block";
	details.style.display = "none";
	
}

function createGame(game) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/games', true);
	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.onreadystatechange = function() {
		if (xhr.readyState === xhr.DONE) {
			if (xhr.status === 201) {
				let data = JSON.parse(xhr.responseText);
				console.log(data);
				//displayFilm(data);
				displayGames();
			}
			else {
				console.error("POST request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	}

	let gameJSON = JSON.stringify(game);
	console.log(gameJSON);
	xhr.send(gameJSON);
}

function loadGamesByGenre(genre) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://localhost:8084/api/games/search/genres/' + genre);

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

function loadGamesByRating(rating) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://localhost:8084/api/games/search/ratings/' + rating);

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

function loadGamesByScore(low, high) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://localhost:8084/api/games/search/scores/' + low + '/' + high);

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

function loadGamesByKeyword(keyword) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://localhost:8084/api/games/search/' + keyword);

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