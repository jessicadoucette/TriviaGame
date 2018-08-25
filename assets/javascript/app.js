

//start game

$("#start").on("click", function () {
	$("#start").remove();

});


//questions
var questions = [{
	question: "In what state does the show take place?",
	answers: ["Iowa", "Illinois", "Indiana", "Hawkins"],
	correctAnswer: "Indiana",
	image: "./assets/images/question1.png"
} , {
	question: "How many days was Will in the upside down?",
	answers: ["10", "7", "15", "30"],
	correctAnswer: "7",
	image: "./assets/images/quesion2.gif"
}, {
	question: "How does Steve Harrington style his hair?",
	answers: ["Farah Fawcett hairspray", "Aqua Net", "He doesn't", "Coconut Oil"],
	correctAnswer: "Farah Fawcett hairspray",
	image: "./assets/images/question3.gif" 
}, {
	question: "What is 11's favorite breakfast food?",
	answers: ["Black coffee", "Eggo Waffles", "Eggs", "Lucky Charms"], 
	correctAnswer: "Eggo Waffles",
	image: "./assets/images/question4.gif"
}, {
	question: "Joyce suprised Will by buying tickets to which 1982 horror film?",
	answers: ["A Nightmare on Elm Street", "The Shining", "The Thing", "Poltergeist"],
	correctAnswer: ["Poltergeist"],
	image: "./assets/images/question5.gif"
}





]; 