package com.skilldistillery.gametracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.gametracker.entities.Game;

public interface GameRepository extends JpaRepository<Game, Integer>{

}
