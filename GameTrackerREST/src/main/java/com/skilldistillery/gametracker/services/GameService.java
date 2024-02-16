package com.skilldistillery.gametracker.services;

import java.util.List;

import com.skilldistillery.gametracker.entities.Game;

public interface GameService {

	List<Game> findAll();
	
	Game findById(int id);
	
	Game create(Game game);
	
	Game update(int id, Game game);
	
	boolean delete(int id);
	
	List<Game> findByGenre(String genre);
}
