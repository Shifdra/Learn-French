// JavaScript Document
$(document).ready(function() {
	"use strict";
	
	//an array holding all of our sound clips
	var mySounds = [new Audio("audio/apple.mp3"), new Audio("audio/chicken.mp3"), new Audio("audio/coffee.mp3"),
		new Audio("audio/lemon.mp3"), new Audio("audio/milk.mp3"), new Audio("audio/potato.mp3")];
	
	//a click function for every element with an id that starts with "playClip"
	$("[id^='playClip']").click(function(e) {
		//get the full ID of the element clicked
		var clickID = e.target.id;
		//get the number at the end of the ID
		var clickNUM = clickID.substr(clickID.length - 2);
		//subtract 1 from the ID number to get the proper array index
		var arrayIndex = clickNUM - 1;
		//play the sound from the array using the index
		mySounds[arrayIndex].play();
	});
});