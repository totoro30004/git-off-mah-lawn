﻿#pragma strict


//	Raccoon has 3 states: moving, pausing and recovering
//  Raccoon can move in 3 directions: down, down-left, and down-right

	static var maxHealth : float = 30;
	static var currentHealth : float = 30;
	static var speed_x : float = 0.015;
	static var speed_y : float = 0.015;
	var minMove : float = 1.0;
	var maxMove : float = 5.0;
	var minPause : float = 1.0;
	var maxPause : float = 3.0;
	
	var currentAction: String = 'move';
	var currentActionTimer : float = 0.0;
	
	var moveDirection: String = 'down';
	
	private var timer : int = 100;
	var enemy_bullet : GameObject;
	private var attack_speed : float = 300;

function Start () {
	currentHealth = maxHealth; // Set starting health
	ChooseDirection(); 
}

function Update () {
	// Check if Raccoon is moving, pausing or recovering and then calls that action
	switch(currentAction) {
		case 'move': Move(); break;
		case 'pause': Pause(); break;
		case 'recover': Recover(); break;
	}

//	MoveSide(speed_x);
//	Attack();
}

function ChooseDirection() {

	// First, we'll do the actual direction choosing
	var r = Random.Range(0,2.999); // Get a random number within range
	r = Mathf.Floor(r); // Rounds to lowest whole integer
	
	switch(r) { // Checks which one it is and executes outcome
		case 0:
			moveDirection = 'down';
			// NEED TO: Set animation
			break;
		case 1:
			moveDirection = 'downleft';
			// NEED TO: Set animation
			break;
		case 2:
			moveDirection = 'downright';
			// NEED TO: Set animation
			break;
		default:
			moveDirection = 'down';
			// NEED TO: Set animation
			break;
	}
	
	// And lastly, we'll set the state and how long we want to go for
	currentAction = 'move';
	currentActionTimer = Time.time + Random.Range(minMove,maxMove);
}

function Move() {
	// Check and call the relevant movement direction
	switch(moveDirection) {
		case 'down':
			MoveDown();
			break;
		case 'downleft':
			MoveDownLeft();
			break;
		case 'downright':
			MoveDownRight();
			break;
		default:
			MoveDown();
			break;
	}
	// If the timer's up, pause
	if (Time.time > currentActionTimer) {
		currentActionTimer = Time.time + Random.Range(minPause,maxPause);
		currentAction = 'pause';
	}
}

function MoveDown() {
	transform.position.y -= speed_y;
}

function MoveDownLeft() {
	transform.position.x -= 0.66*speed_x;
	transform.position.y -= 0.66*speed_y;
}

function MoveDownRight() {
	transform.position.x += 0.66*speed_x;
	transform.position.y -= 0.66*speed_y;
}

//	var raccoons = GameObject.FindGameObjectsWithTag("Raccoon");
//	for (var entity in raccoons) {
//		entity.transform.position.y -= speed_y;
//	}


function Pause() {
	// NEED TO: Set animation to Pause
	
	if (Time.time > currentActionTimer) {
		ChooseDirection();
	}
}

function Recover() {
	// NEED TO: Set animation to Recovery
	
	if (Time.time > currentActionTimer) {
		ChooseDirection();
	}
}

function takeDamage(damage : int) {
	currentHealth -= damage;
	if (currentHealth <= 0) {
		currentHealth = 0;
	}
}


function OnTriggerEnter(col : Collider) {
	if (col.gameObject.name == "BorderL") {
		moveDirection = 'downright';
		MoveDownRight();
	} else if (col.gameObject.name == "BorderR") {
		moveDirection = 'downleft';
		MoveDownLeft();
	}
	
			
	if (col.gameObject.tag == "Default Bullet") {
		takeDamage(1);
		Destroy(col.gameObject);
		if (currentHealth <= 0) {
			Destroy(gameObject);
		}
	}
}
