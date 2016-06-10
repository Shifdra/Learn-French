// JavaScript Document
$(document).ready(function() {
	"use strict";
	
	//declare score variable and hide the element that displays it
	var score = 0;
	$("#showScore").hide();
	
	//if the clicked element contains the class "c" move to next question with +1 score
	$(".c").click(function() {
		score++;
	});
	
	//when the last question is answered show the score on the home screen
	$(".last").click(function() {
		$("#showScore").show();
		$("#score").html(score + "/6");
	});
	
	//when the quiz starts
	$("#reset").click(function() {
		//score is hidden and reset to 0
		score = 0;
		$("#showScore").hide();
		
		//call function that will randomize the order of our answers
		$.each(allAnswers, function(index, elem) {
			randomize(index, elem);
		});
	});
	
	
	//an array for holding all of our images and sounds clips
	var sounds = [new Audio("audio/apple.mp3"), new Audio("audio/chicken.mp3"), new Audio("audio/coffee.mp3"), new Audio("audio/lemon.mp3"),
		new Audio("audio/milk.mp3"), new Audio("audio/potato.mp3")];
	//I seperated them into two arrays so that the sound and image would have the same index
	var images = ["images/apple.png", "images/chicken.png", "images/coffee.png", "images/lemon.png", "images/milk.png", "images/potato.png"];
	
	//will be used to create DOM elements of our sounds and images
	var btns = [$("<a>"), $("<a>"), $("<a>"), $("<a>"), $("<a>"), $("<a>")];
	var imgs = [$("<img>"), $("<img>"), $("<img>"), $("<img>"), $("<img>"), $("<img>")];
		
	//for each question there is an array of answers including 1 correct answer
	var cAnswer1 = "la pomme";
	var randAnswers1 = ["le pomme", "le citron", "les pommes", cAnswer1];
	
	var cAnswer2 = "le poulet";
	var randAnswers2 = ["la poulet", "les poulets", "la pomme", cAnswer2];
	
	var cAnswer3 = "le café";
	var randAnswers3 = ["la café", "les cafés", "le jus", cAnswer3];
	
	var cAnswer4 = "le citron";
	var randAnswers4 = ["les citrons", "le café", "la pomme", cAnswer4];
	
	var cAnswer5 = "le lait";
	var randAnswers5 = ["la lait", "les laits", "le café", cAnswer5];
	
	var cAnswer6 = "la patate douce";
	var randAnswers6 = ["le patate douce", "la pomme douce", "les patates douces", cAnswer6];
	
	
	//an array that contains all of our arrays of answers
	var allAnswers = [randAnswers1, randAnswers2, randAnswers3, randAnswers4, randAnswers5, randAnswers6];
	//an array holding all of our correct answers
	var allCorrect = [cAnswer1, cAnswer2, cAnswer3, cAnswer4, cAnswer5, cAnswer6];
	
	//array shuffling function
	function shuffle(array) {
		//the current index is equal to the last index of the array
		var currentIndex = array.length;
		
		//loop until the index is less than 0
		while (currentIndex !== 0) {
			//get a random index between 0 and the current index
			var randIndex = Math.floor(Math.random() * currentIndex);
			//subtract 1 from the current index
			currentIndex -=1;
			
			//swap the value at the current index with one at the random index
			var temp = array[currentIndex];
			array[currentIndex] = array[randIndex];
			array[randIndex] = temp;
		}
		
		//return the sorted array
		return array;
	}
	
	
	//randomize the order of answers and whether an image or sound is displayed
	function randomize(index, elem) {
		//we will use this var in some cases since the numbering in our html starts at one
		var myIndex = index + 1;
		//call the shuffle func on array of answers
		var shuffledAnswers = shuffle(elem);
		//get array of answer buttons from the html
		var ansBtnsArr = $(".answer" + myIndex);
		
		$.each(ansBtnsArr, function(i, el) {
			//for each button in the array set the html value to the one in our array of answers
			$(el).html(shuffledAnswers[i]);
			//if the answer is correct then the correct popup should be opened when clicked
			if (shuffledAnswers[i] === allCorrect[index]) {
				$(el).attr("href", "#correct" + myIndex);
			}
			else {
				$(el).attr("href", "#incorrect" + myIndex);
			}
		});
		
		//remove previous buttons or images
		btns[index].remove();
		imgs[index].remove();
		
		//put either an image or sound for each question
		if (Math.round(Math.random()) === 0) {
			imgs[index].attr({
				"src": images[index],
				"alt": "LearnIMG"
			});
			$("#question" + myIndex).append(imgs[index]);
		}
		else {
			btns[index].attr({
				"data-role": "button",
				"data-icon": "audio-icon"
			});
			btns[index].html("Play Sound");
			btns[index].click(function() {
				sounds[index].play();
			});
			$("#question" + myIndex).append(btns[index]).trigger("create");
		}
	}
});




