package com.skilldistillery.gametracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.gametracker.entities.Game;

public interface GameRepository extends JpaRepository<Game, Integer>{

	List<Game> findByGenre(String genre);
}
