package com.skilldistillery.gametracker.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.gametracker.entities.Game;
import com.skilldistillery.gametracker.services.GameService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
public class GameController {

	@Autowired
	private GameService gameService;
	
	@GetMapping("games")
	public List<Game> index(){
		return gameService.findAll();
	}
	
	@GetMapping("games/{id}")
	public Game show(@PathVariable("id") int id, HttpServletResponse res) {
		Game game = gameService.findById(id);
		if (game == null) {
			res.setStatus(404);
		}
		return game;
	}
	
	@PostMapping("games")
	public Game addGame(@RequestBody Game game, HttpServletResponse res, HttpServletRequest req) {
		Game newGame;
		try {
			newGame = gameService.create(game);
			res.setStatus(201);
			res.setHeader("Location", req.getRequestURL().append("/").append(newGame.getId()).toString());
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			newGame = null;
		}
		return newGame;
	}
}
