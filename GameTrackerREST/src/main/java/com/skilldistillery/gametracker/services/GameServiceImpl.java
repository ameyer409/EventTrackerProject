package com.skilldistillery.gametracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.gametracker.entities.Game;
import com.skilldistillery.gametracker.repositories.GameRepository;

@Service
public class GameServiceImpl implements GameService{

	@Autowired
	private GameRepository gameRepo;

	@Override
	public List<Game> findAll() {
		return gameRepo.findAll();
	}

	@Override
	public Game findById(int id) {
		Game game = null;
		Optional<Game> library = gameRepo.findById(id);
		if(library.isPresent()) {
			game = library.get();
		}
		return game;
	}

	@Override
	public Game create(Game game) {
		Game newGame = gameRepo.saveAndFlush(game);
		return newGame;
	}

	@Override
	public Game update(int id, Game game) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean delete(int id) {
		// TODO Auto-generated method stub
		return false;
	}
	
	
}
