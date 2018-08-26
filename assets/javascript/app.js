//start game -- will also make button disappear upon click.
$("#start").on("click", function () {
	console.log("Start Game"); 
	$("#start").remove();
	game.loadQuestion(); 

});

//listener for answer buttons -- this will also run the event.
$(document).on("click", '.answer-button', function (event) {
	game.clicked(event); 
}); 

//listener for game reset
$(document).on("click", '#reset', function () {
	game.reset();
});

//question arrays
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

//define game, have all functions wrapped up in it.
var game = {
	questions: questions,
	currentQuestion: 0,
	counter: 30,
	correct: 0,
	incorrect: 0,
	unanswered: 0,

	//countdown function -- counter decreases, it's added to html. When the counter goes to 0, it's times up. Run timeUp function.
	countdown: function() {
		game.counter--;
		$("#counter").html(game.counter); 
		if (game.counter <= 0) {
			console.log("Time Up!");
			game.timeUp(); 
		}
	},

	//load question function -- where the timer is created (will countdown every second), Time remaining added to HTML. Load questions to html. For loop is to run through all the answers/to append them to page. 
	loadQuestion: function() {
		console.log("Load Question"); 
		timer = setInterval(game.countdown, 1000);
		$(".container").html("<h2>Time Remaining: <span id='counter'> 30 </span> Seconds </h2"); 
		//add the questions to the page
		$(".container").append("<h2>" + questions[game.currentQuestion].question + "</h2>");

		for (var i = 0; i < questions[game.currentQuestion].answers.length; i++) {
			$(".container").append('<br><button class= "answer-button btn btn-danger" id="button- '+i+'" data-name = "'+questions[game.currentQuestion].answers[i]+'">' + questions[game.currentQuestion].answers[i]+ '</button>'); 
		}
	},

	//next question function -- where the timer is set for each question (30 seconds). next question is loaded. 
	nextQuestion: function() {
		game.counter = 30; 
		$("#counter").html(game.counter); 
		game.currentQuestion++;
		game.loadQuestion();
	},

	//time up function. Clear interval to stop it. If it runs out, add 1 to unanswered result. Add text to inform user that time is up, and tell them what the correct answer was. Include image of correct answer. If you've ran through all the questions, go to game results. Else, move onto next question. This screen will last 7 seconds.
	timeUp: function() {
		clearInterval(timer);
		game.unanswered++;
		$(".container").html("<h2>Too slow.</h2>");
		$(".container").append("<h3>The correct answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
		$(".container").append(questions[game.currentQuestion].image);
		if (game.currentQuestion==questions.length-1){
			setTimeout(game.results, 7*1000); }
		else {
			setTimeout(game.nextQuestion, 7*1000); 
		}
	},

	//results scrren. This will clear the timer, and inform user how many they got correct, wrong, and unanswered. It will also provide a reset button if they'd like to play again (it will not reload the page). 
	results: function() {
		clearInterval(timer);
		$(".container").html("<h2>Congrats! You made it out of the upsidedown!</h2>"); 
		$(".container").append("<h3>Correct: " + game.correct + "</h3>");
		$(".container").append("<h3>Incorrect: " + game.incorrect + "</h3>"); 
		$(".container").append("<h3>Unanswered: " + game.unanswered + "</h3>");
		$(".container").append("<button id='reset' class='btn btn-danger'>Reset</button>"); 
	},

	//clicked function -- clear timer. If user picked correct answer, it will run the answered correctly function. If not, it will run the answered incorrectly function.
	clicked: function() {
		clearInterval(timer);
		if ($(event.target).attr("data-name") == questions[game.currentQuestion].correctAnswer) {
			game.answeredCorrectly(); 
		} 
		else {
			game.answeredIncorrectly(); 
		}
		
	},

	//answered correctly function -- clear timer and console log. Add 1 to correct answeres. Inform user they got it right and append image to the html. If/else statement for running through all the questions and leading to results page or going to the next question
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

	//answered incorrectly, same as above function, but for incorrect selections. Will inform user of correct answer/with corresponding image.
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

	//reset function -- resets game and runs load question function. 
	reset: function() {
		game.currentQuestion= 0;
		game.counter= 30;
		game.correct= 0;
		game.incorrect= 0;
		game.unanswered= 0;
		game.loadQuestion(); 
	} 

}; 
