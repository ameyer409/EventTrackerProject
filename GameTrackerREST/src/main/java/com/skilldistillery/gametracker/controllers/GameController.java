package com.skilldistillery.gametracker.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.gametracker.entities.Game;
import com.skilldistillery.gametracker.services.GameService;

@RestController
@RequestMapping("api")
public class GameController {

	@Autowired
	private GameService gameService;
	
	@GetMapping("games")
	public List<Game> index(){
		return gameService.findAll();
	}
}
