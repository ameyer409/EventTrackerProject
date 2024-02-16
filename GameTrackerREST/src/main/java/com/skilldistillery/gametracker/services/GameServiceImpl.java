package com.skilldistillery.gametracker.services;

import java.util.List;

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
	
	
}
