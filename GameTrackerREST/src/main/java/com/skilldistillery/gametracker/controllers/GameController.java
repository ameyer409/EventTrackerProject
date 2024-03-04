package com.skilldistillery.gametracker.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.gametracker.entities.Game;
import com.skilldistillery.gametracker.services.GameService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@CrossOrigin({ "*", "http://localhost/" })
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
	
	@PutMapping("games/{id}")
	public Game updateGame(@PathVariable ("id") int id, @RequestBody Game game, HttpServletResponse res) {
		Game updatedGame;
		try {
			updatedGame = gameService.update(id, game);
			res.setStatus(200);
			if (updatedGame == null) {
				res.setStatus(404);
			}
		} catch (Exception e){
			res.setStatus(400);
			updatedGame = null;
			e.printStackTrace();
		}
		return updatedGame;
	}
	
	@DeleteMapping("games/{id}")
	public void deleteGame(@PathVariable ("id") int id, HttpServletResponse res) {
		try {
			boolean deleted = gameService.delete(id);
			res.setStatus(204);
			if(deleted == false) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			res.setStatus(400);
			e.printStackTrace();
		}
	}
	
	@GetMapping("games/search/genres/{genre}")
	public List<Game> gamesByGenre(@PathVariable("genre") String genre, HttpServletResponse res){
		return gameService.findByGenre(genre);
	}
	
	@GetMapping("games/search/ratings/{rating}")
	public List<Game> gamesByRating(@PathVariable("rating") String rating, HttpServletResponse res){
		return gameService.findByRating(rating);
	}
	
	@GetMapping("games/search/scores/{low}/{high}")
	public List<Game> gamesByScore(@PathVariable("low") double low, @PathVariable("high") double high, HttpServletResponse res){
		return gameService.findByScoreBetween(low, high);
	}
	
	@GetMapping("games/search/{keyword}")
	public List<Game> gamesByKeyword(@PathVariable("keyword") String keyword, HttpServletResponse res){
		return gameService.findByNameLike(keyword);
	}
	
	
}
