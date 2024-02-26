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
	button.addEventListener('click', function(e) {
		e.preventDefault();
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
		console.log("clicks received");
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
		if (field !== 'id' && field !== 'hallOfFame' && field !== 'createdAt' && field !== 'updatedAt'
			&& field !== 'description' && field !== 'review') {
			let th = document.createElement('th');
			th.scope = 'col';
			th.textContent = field;
			tr.appendChild(th);
		}
	}
	thead.appendChild(tr);

	let tbody = document.getElementById('gameEntries');
	tbody.textContent = '';
	tbody.className = 'table-group-divider';

	for (let game of games) {
		let tr = document.createElement('tr');
		tr.gameId = game.id
		tr.className = "";
		for (let field in game) {
			if (field !== 'id' && field !== 'hallOfFame' && field !== 'createdAt' && field !== 'updatedAt'
				&& field !== 'description' && field !== 'review') {
				let td = document.createElement('td');
				td.textContent = '';
				if (field !== null) {
					td.textContent = game[field];
					td.className = "";
				}
				tr.appendChild(td);
			}
		}
		tr.addEventListener('click', function(e) {
			getGame(tr.gameId);
		});
		tbody.appendChild(tr);
	}
	showTable();
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

function updateDetails(game) {
	let table = document.getElementById('gameList');
	let details = document.getElementById('gameDetails');
	table.style.display = "none";
	details.style.display = "block";
	details = document.getElementById('gameDetailsBody');
	details.textContent = '';
	let button = document.getElementById('updatebtn');
	button.style.display = "none";
//console.log(game.id);
//console.log(game.name);
	let form = document.createElement('form')
	form.name = "updateForm";
	
	let input = document.createElement('input');
	input.type = 'hidden';
	input.id = 'id';
	input.value = game.id;
	form.appendChild(input);
	
	//Name Field
	let label = document.createElement('label');
	label.htmlFor = "name";
	label.textContent = 'Name:';
	input = document.createElement('input');
	input.type = 'text';
	input.id = 'name';
	input.value = game.name
	form.appendChild(label);
	form.appendChild(input);
	let br = document.createElement('br');
	form.appendChild(br);
	//Genre Field
	label = document.createElement('label');
	label.htmlFor = "genre";
	label.textContent = 'Genre:';
	input = document.createElement('input');
	input.type = 'text';
	input.id = 'genre';
	input.value = game.genre
	form.appendChild(label);
	form.appendChild(input);
	br = document.createElement('br');
	form.appendChild(br);
	//Rating Field
	label = document.createElement('label');
	label.htmlFor = "rating";
	label.textContent = 'Rating:';
	let select = document.createElement('select');
	select.id = 'rating';
	let option = document.createElement('option');
	option.textContent = 'E';
	option.value = "E";
	select.appendChild(option);

	option = document.createElement('option');
	option.textContent = 'T';
	option.value = "T";
	select.appendChild(option);

	option = document.createElement('option');
	option.textContent = 'M';
	option.value = "M";
	select.appendChild(option);

	option = document.createElement('option');
	option.textContent = 'A';
	option.value = "A";
	select.appendChild(option);

	option = document.createElement('option');
	option.textContent = 'RP';
	option.value = "RP";
	select.appendChild(option);
	form.append(label);
	form.appendChild(select);
	br = document.createElement('br');
	form.appendChild(br);
	//Score Field
	label = document.createElement('label');
	label.htmlFor = "score";
	label.textContent = 'Score:';
	input = document.createElement('input');
	input.type = 'number';
	input.id = 'score';
	input.value = game.score;
	form.appendChild(label);
	form.appendChild(input);
	br = document.createElement('br');
	form.appendChild(br);
	//Hall Of Fame Field
	label = document.createElement('label');
	label.htmlFor = "hallOfFame";
	label.textContent = 'Hall Of Fame?:';
	input = document.createElement('input');
	input.type = 'checkbox';
	input.id = 'hallOfFame';
	input.checked = game.hallOfFame;
	form.appendChild(label);
	form.appendChild(input);
	br = document.createElement('br');
	form.appendChild(br);
	//Release Date Field
	label = document.createElement('label');
	label.htmlFor = "release";
	label.textContent = 'Release Date:';
	input = document.createElement('input');
	input.type = 'date';
	input.id = 'release';
	if (game.releaseDate !== null) {
		let date = game.releaseDate.split("T");
		input.defaultValue = date[0];
	}
	form.appendChild(label);
	form.appendChild(input);
	br = document.createElement('br');
	form.appendChild(br);
	//completed Date Field
	label = document.createElement('label');
	label.htmlFor = "completion";
	label.textContent = 'Date Finished:';
	input = document.createElement('input');
	input.type = 'date';
	input.id = 'completion';
	if (game.completedDate !== null) {
		date = game.completedDate.split("T");
		input.defaultValue = date[0];
	}
	form.appendChild(label);
	form.appendChild(input);
	br = document.createElement('br');
	form.appendChild(br);
	//Description Field
	label = document.createElement('label');
	label.htmlFor = "description";
	label.textContent = 'Description:';
	input = document.createElement('input');
	input.type = 'text';
	input.id = 'description';
	input.name = 'description'
	input.value = game.description
	form.appendChild(label);
	form.appendChild(input);
	br = document.createElement('br');
	form.appendChild(br);
	//Review Field
	label = document.createElement('label');
	label.htmlFor = "review";
	label.textContent = 'Review:';
	input = document.createElement('input');
	input.type = 'text';
	input.id = 'review';	
	input.name = 'review'
	input.value = game.review
	form.appendChild(label);
	form.appendChild(input);
	br = document.createElement('br');
	form.appendChild(br);
	button = document.createElement("button");
	button.className = "btn btn-primary";
	button.id = 'updateSubmit';
	button.name = 'updateSubmit';
	button.textContent = 'Submit Update';
	
	button.addEventListener('click', function(e) {
		e.preventDefault();
		let hof = document.updateForm.hallOfFame.value;
		if (hof === 'on') {
			hof = true;
		}
		else {
			hof = false;
		}
		game = {
			id: document.updateForm.id.value,
			name: document.updateForm.name.value,
			genre: document.updateForm.genre.value,
			rating: document.updateForm.rating.value,
			score: document.updateForm.score.value,
			hallOfFame: hof,
			releaseDate: new Date(document.updateForm.release.value),
			completedDate: new Date(document.updateForm.completion.value),
			description: document.updateForm.description.value,
			review: document.updateForm.review.value
		};
		if (game.name !== '' && game.genre !== '') {
			updateGame(game);
		}
	});
	form.appendChild(button);
	details.appendChild(form);
	
}

function showDetails(game) {
	let table = document.getElementById('gameList');
	let details = document.getElementById('gameDetails');
	table.style.display = "none";
	details.style.display = "block";
	details = document.getElementById('gameDetailsBody');
	details.textContent = '';
	let button = document.getElementById('updatebtn');
	button.style.display = "inline";


	let header = document.createElement('h4');
	header.textContent = game.name;
	details.appendChild(header);
	header = document.createElement('h5');
	header.textContent = game.genre;
	details.appendChild(header);
	header = document.createElement('div');
	header.textContent = "ESRB rating: " + game.rating;
	details.appendChild(header);
	header = document.createElement('div');
	header.textContent = "Score: " + game.score;
	details.appendChild(header);
	header = document.createElement('div');
	header.textContent = "description: ";
	header.style.fontWeight = "bold";
	let textBlock = document.createElement('p');
	textBlock.textContent = game.description;
	textBlock.style.fontWeight = "normal";
	header.appendChild(textBlock);
	details.appendChild(header);
	header = document.createElement('div');
	header.textContent = "review: ";
	header.style.fontWeight = "bold";
	textBlock = document.createElement('p');
	textBlock.textContent = game.review;
	textBlock.style.fontWeight = "normal";
	header.appendChild(textBlock);
	details.appendChild(header);

	let updateButton = document.getElementById('updatebtn');
	updateButton.addEventListener('click', function(e) {
		e.preventDefault();
		updateDetails(game);
	});

}

function showTable() {
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
				loadAllGames();
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

function updateGame(game) {
	let xhr = new XMLHttpRequest();
	console.log(game);
	xhr.open('PUT', 'api/games/'+game.id, true);
	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.onreadystatechange = function() {
		if (xhr.readyState === xhr.DONE) {
			if (xhr.status === 200) {
				let data = JSON.parse(xhr.responseText);
				console.log(data);
				//displayFilm(data);
				loadAllGames();
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
			else if (xhr.status === 404) {
				loadAllGames();
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
			else if (xhr.status === 404) {
				loadAllGames();
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
			else if (xhr.status === 404) {
				loadAllGames();
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
			} else if (xhr.status === 404) {
				loadAllGames();
			}
			else {
				console.error('Error getting data: ' + xhr.status);
			}
		}
	};
	xhr.send();
}