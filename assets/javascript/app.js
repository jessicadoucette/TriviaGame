//audio


//start game

$("#start").on("click", function () {
	console.log("Start Game"); 
	$("#start").remove();
	game.loadQuestion(); 

});

$(document).on("click", '.answer-button', function (event) {
	game.clicked(event); 
}); 

$(document).on("click", '#reset', function () {
	game.reset();
});

//questions
var questions = [{
	question: "In what state does the show take place?",
	answers: ["Iowa", "Illinois", "Indiana", "Hawkins"],
	correctAnswer: "Indiana",
	image: '<img src="./assets/images/question1.png"</img>'
} , {
	question: "How many days was Will in the upside down?",
	answers: ["10", "7", "15", "30"],
	correctAnswer: "7",
	image: '<img src="./assets/images/question2.gif"</img>'
}, {
	question: "How does Steve Harrington style his hair?",
	answers: ["Farah Fawcett Hairspray", "Aqua Net", "He doesn't", "Coconut Oil"],
	correctAnswer: "Farah Fawcett Hairspray",
	image: '<img src="./assets/images/question3.gif"</img>'
}, {
	question: "What is Eleven's favorite breakfast food?",
	answers: ["Black coffee", "Eggo Waffles", "Eggs", "Lucky Charms"], 
	correctAnswer: "Eggo Waffles",
	image: '<img src="./assets/images/question4.gif"</img>'
}, {
	question: "Joyce suprised Will by buying tickets to which 1982 horror film?",
	answers: ["A Nightmare on Elm Street", "The Shining", "The Thing", "Poltergeist"],
	correctAnswer: ["Poltergeist"],
	image: '<img src="./assets/images/question5.gif"</img>'
}];

//make game
var game = {
	questions: questions,
	currentQuestion: 0,
	counter: 30,
	correct: 0,
	incorrect: 0,
	unanswered: 0,

	countdown: function() {
		game.counter--;
		$("#counter").html(game.counter); 
		if (game.counter <= 0) {
			console.log("Time Up!");
			game.timeUp(); 
		}
	},

	loadQuestion: function() {
		console.log("Load Question"); 
		timer = setInterval(game.countdown, 1000);
		$(".container").html("<h2>Time Remaining: <span id='counter'> 30 </span> Seconds </h2"); 
		$(".container").append("<h2>" + questions[game.currentQuestion].question + "</h2>");

		for (var i = 0; i < questions[game.currentQuestion].answers.length; i++) {
			$(".container").append('<br><button class= "answer-button btn btn-danger" id="button- '+i+'" data-name = "'+questions[game.currentQuestion].answers[i]+'">' + questions[game.currentQuestion].answers[i]+ '</button>'); 
		}
	},

	nextQuestion: function() {
		game.counter = 30; 
		$("#counter").html(game.counter); 
		game.currentQuestion++;
		game.loadQuestion();
	},

	timeUp: function() {
		clearInterval(timer);
		game.unanswered++;
		$(".container").html("<h2>Too slow.</h2>");
		$(".container").append("<h3>The correct answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
		$(".container").append(questions[game.currentQuestion].image);
		if (game.currentQuestion==questions.length-1){
			setTimeout(game.results, 3*1000); }
		else {
			setTimeout(game.nextQuestion, 3*1000); 
		}
	},

	results: function() {
		clearInterval(timer);
		$(".container").html("<h2>Congrats! You made it out of the upsidedown!</h2>"); 
		$(".container").append("<h3>Correct: " + game.correct + "</h3>");
		$(".container").append("<h3>Incorrect: " + game.incorrect + "</h3>"); 
		$(".container").append("<h3>Unanswered: " + game.unanswered + "</h3>");
		$(".container").append("<button id='reset' class='btn btn-danger'>Reset</button>"); 
	},

	clicked: function() {
		clearInterval(timer);
		if ($(event.target).attr("data-name") == questions[game.currentQuestion].correctAnswer) {
			game.answeredCorrectly(); 
		} 
		else {
			game.answeredIncorrectly(); 
		}
		
	 
	},

	answeredCorrectly: function() {
		console.log("Correct!"); 
		clearInterval(timer);
		game.correct++;
		$(".container").html("<h2>You got it! Nice work.</h2>")
		$(".container").append(questions[game.currentQuestion].image);
		if (game.currentQuestion==questions.length-1){
			setTimeout(game.results, 7*1000); }
		else {
			setTimeout(game.nextQuestion, 7*1000); 
		}
	},

	answeredIncorrectly: function() {
		console.log("Nice try, Mouth Breather.");
		clearInterval(timer);
		game.incorrect++;
		$(".container").html("<h2>Nice try, Mouth Breather.</h2>")
		$(".container").append("<h3>The correct answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
		$(".container").append(questions[game.currentQuestion].image);
		if (game.currentQuestion==questions.length-1){
			setTimeout(game.results, 7*1000); }
		else {
			setTimeout(game.nextQuestion, 7*1000); 
		}
		
	},

	reset: function() {
		game.currentQuestion= 0;
		game.counter= 30;
		game.correct= 0;
		game.incorrect= 0;
		game.unanswered= 0;
		game.loadQuestion(); 
	} 

}; 
