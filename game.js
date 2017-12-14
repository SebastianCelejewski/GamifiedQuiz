var shuffledQuestions = undefined;

var validAnswers = 0;
var invalidAnswers = 0;
var currentQuestion = undefined;
var currentQuestionIdx = 0;
var monsterDistance = 0;

function initialize() {
	validAnswers = 0;
	invalidAnswers = 0;
	monsterDistance = 1000;

	shuffledQuestions = shuffleArray(questions);
	
	displayQuestion();
	updateStatus();
}

function displayQuestion() {
	var questionDiv = document.getElementById("question");
	var answersForm = document.getElementById("answers");

	currentQuestion = shuffledQuestions[currentQuestionIdx];
	questionDiv.innerHTML = currentQuestion.question;

	var answersToBeDisplayed = []

	for (var i = 0; i < currentQuestion.answers.length; i++) {
		answersToBeDisplayed.push("<input type='radio' name='answer' value='"+i+"'>"+currentQuestion.answers[i]+"</input><br/>");
	}

	answersForm.innerHTML = shuffleArray(answersToBeDisplayed).join("\n");
	answersForm.innerHTML += "<button type='submit' onclick='submitAnswer(); return false;'>Submit</button>";
}

function submitAnswer() {
	var progressDiv = document.getElementById("progress");
	progressDiv.innerHTML += "<br/><p><b>"+currentQuestion.question+"</b></p>";

	var selectedValue = getSelectedAnswer();
	if (selectedValue == 0) {
		validAnswers += 1;
		progressDiv.innerHTML += "<p class='validAnswer'>Valid answer: "+currentQuestion.answers[selectedValue]+"</p>";
		if (monsterDistance < 500 && monsterDistance > 0) {
			monsterDistance += 100;
		}
	} else {
		invalidAnswers += 1;
		progressDiv.innerHTML += "<p class='invalidAnswer'>Invalid answer: "+currentQuestion.answers[selectedValue]+"</p>";
		progressDiv.innerHTML += "<p>Valid answer is: "+currentQuestion.answers[0]+"</p>";
		if (monsterDistance >= 0) {
			monsterDistance -= 100;
		}
	}

	progressDiv.scrollTop = progressDiv.scrollHeight;

	if (currentQuestionIdx < questions.length - 1) {
		currentQuestionIdx += 1;
		updateStatus();
		displayQuestion();
	} else {
		updateStatus();
		clearQuestionAndAnswers();
	}

	return false;
}

function updateStatus() {
	var monsterImg = document.getElementById("monster");
	var statusDiv = document.getElementById("status");
	var monsterDistanceLegend = document.getElementById("monsterDistance");

	var status = "Questions answered: " + (validAnswers + invalidAnswers) + " of " + questions.length + ". Valid answers: " + validAnswers + ", invalid answers: " + invalidAnswers;

	statusDiv.innerHTML = status;
	monsterImg.style = 'margin-left: ' + monsterDistance + 'px';
	if (monsterDistance >= 0) {
		monsterDistanceLegend.innerHTML = "Monster distance: " + monsterDistance + " m";
	} else {
		monsterDistanceLegend.innerHTML = "Monster is happy to have such a tasty meal!";
	}
}

function getSelectedAnswer() {
	var answers = document.getElementsByName('answer');
	var answerValue = -1;
	for (var i = 0; i < answers.length; i++) {
	    if (answers[i].checked) {
        	answerValue = answers[i].value;
    	}
	}
	return answerValue;
}

function clearQuestionAndAnswers() {
	document.getElementById("question").innerHTML = "";
	document.getElementById("answers").innerHTML = "";
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}