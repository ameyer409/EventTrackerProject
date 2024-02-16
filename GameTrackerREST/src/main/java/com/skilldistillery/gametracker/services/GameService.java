package com.skilldistillery.gametracker.services;

import java.util.List;

import com.skilldistillery.gametracker.entities.Game;

public interface GameService {

	List<Game> findAll();
}
