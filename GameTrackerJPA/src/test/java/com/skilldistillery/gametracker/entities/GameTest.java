package com.skilldistillery.gametracker.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Locale.Category;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

class GameTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Game game;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("GameTrackerJPA");
	}
	
	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf = null;
	}
	
	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		game = em.find(Game.class, 1);
	}
	
	@AfterEach
	void tearDown() throws Exception {
		game = null;
		em.close();
	}
	
	@Test
	void test_Category_entity_mapping() {
		assertNotNull(game);
		assertEquals("World of Warcraft", game.getName());
		assertEquals("MMORPG", game.getGenre());
		assertEquals("T", game.getRating());
		assertEquals(3, game.getScore());
	}

}
