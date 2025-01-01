const toggle = document.querySelector(".toggle");
const listparagraph = document.querySelectorAll("li p");
const main = document.querySelector("main");
const thumb = document.querySelector(".thumb");
const questionHeader = document.querySelector("h1");
const userSelection = document.querySelectorAll(".userSelection");
const userSelectionImage = document.querySelectorAll(".userSelection img");
const userSelectionChoice = document.querySelectorAll(".userSelection p");
const letter = document.querySelectorAll(".letter");
const choice = document.querySelectorAll(".choice");
const quizHeaderp = document.querySelector(".quiz-header p:last-of-type");
const quizHeader = document.querySelector(".quiz-header");
const selectionImageDiv = document.querySelector(".selectionImage");
const lightDarkDiv = document.querySelector(".light-dark-div");
const btnSubmit = document.querySelector(".submit");
const btnNext = document.querySelector(".nextQuestion");
const questionNumber = document.querySelector(".quiz-header p:first-of-type");
const questionList = document.querySelectorAll("li");
const numberQ = document.querySelector(".numberQ");
const title = document.querySelector(".title");
const numberQuestion = document.querySelector(".number-question");
const resultsDiv = document.querySelector(".resultsDiv");
const btnPlayAgain = document.querySelector(".playAgain");
const resultImage = document.querySelector(".resultImage");
const ulList = document.querySelector("ul");
const errorDiv = document.createElement("div");
const userStatus = document.querySelector(".userStatus");
const statusBar = document.querySelector(".statusBar");
const body = document.querySelector("body");

let numberArray = [];
let counter = 1;
let numberCorrect = 0;
let statusCounter = 10;

let json;

//GET JSON Data
fetch("./starter-code/data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    json = data;
  });

//create error message
errorMessage();

//light Dark Toggle
toggle.addEventListener("click", function () {
  let divResults = document.querySelector(".resultsDiv div");
  let remainder = document.querySelector(".scoreRemainder");
  main.classList.toggle("toggle-light");
  thumb.classList.toggle("shift");
  divResults.classList.toggle("result-toggle");
  resultImage.classList.toggle("result-toggle");
  remainder.classList.toggle("remainder-toggle");
  statusBar.classList.toggle("status-bar-toggle");
  body.classList.toggle("body-toggle");

  if (main.classList.contains("toggle-light")) {
    for (let i = 0; i < questionList.length; i++) {
      questionList[i].classList.add("toggleQuestionLight");
      questionList[i].classList.remove("toggleQuestionDark");
    }
  } else {
    for (let i = 0; i < questionList.length; i++) {
      questionList[i].classList.remove("toggleQuestionLight");
      questionList[i].classList.add("toggleQuestionDark");
    }
  }
});

//toggle event listeners
for (let i = 0; i < questionList.length; i++) {
  questionList[i].addEventListener("mouseenter", function () {
    letter[i].classList.toggle("letterHover");
  });
}
for (let i = 0; i < questionList.length; i++) {
  questionList[i].addEventListener("mouseleave", function () {
    letter[i].classList.toggle("letterHover");
  });
}

questionList.forEach((e) => {
  lightDarkDiv.style.justifyContent = "space-between";

  e.addEventListener("click", function () {
    for (let i = 0; i < questionList.length; i++) {
      questionList[i].classList.remove("activeLetter");
    }

    if (
      e.classList.contains("HTML") ||
      e.classList.contains("CSS") ||
      e.classList.contains("JavaScript") ||
      e.classList.contains("Accessibility")
    ) {
      //remove active letter class
      for (let i = 0; i < questionList.length; i++) {
        questionList[i].classList.remove("active");
        letter[i].classList.remove("activeLetter");
      }
      e.classList.add("active");
      errorDiv.classList.add("errorVisible");

      for (let i = 0; i < questionList.length; i++) {
        if (questionList[i].classList.contains("active")) {
          letter[i].classList.add("activeLetter");
        }

        questionHeader.fontSize =
          "font-size: 1.25rem;" +
          "font-size: clamp(1.25rem, 0.7327586206896552rem + 2.206896551724138vw, 2.25rem)";
      }
    } else {
      findSelection(e.children[0].innerText);
      for (let i = 0; i < questionList.length; i++) {
        questionList[i].classList.add(title.textContent);
      }
    }
  });
});

btnPlayAgain.addEventListener("click", () => {
  location.reload();
});

//findSelection
function findSelection(e) {
  showStatusBar();

  switch (e) {
    case "HTML":
      questions(0);
      showQuestion(e);
      showtitle(e);
      break;

    case "CSS":
      questions(1);
      showQuestion(e);
      showtitle(e);

      break;

    case "JavaScript":
      questions(2);
      showQuestion(e);
      showtitle(e);

      break;

    case "Accessibility":
      questions(3);
      showQuestion(e);
      showtitle(e);

      break;

    default:
      console.log("default");
      break;
  }
}

// show questions
function showQuestion(x) {
  quizHeaderp.style.display = "none";
  userSelectionImage.forEach((e) => {
    e.style.display = "none";
    btnSubmit.style.display = "block";
    questionNumber.style.display = "block";
  });

  letter.forEach((e) => {
    e.style.display = "block";
    e.style.borderRadius = "5px";
  });

  selectionImage(x);
}

//Select Questions
function questions(x) {
  let randomNumber = Math.floor(Math.random() * 10);
  for (let i = 0; i < 4; i++) {
    choice[i].textContent = json.quizzes[x].questions[randomNumber].options[i];
  }
  questionHeader.textContent = json.quizzes[x].questions[randomNumber].question;
  // questionHeader.style.fontSize = "2.25rem";
  questionHeader.classList.add(".resultsH1");
  numberArray.push(randomNumber);
}
//select image above header
function selectionImage(x) {
  let htmlImage = "./starter-code/assets/images/icon-html.svg";
  let cssImage = "./starter-code/assets/images/icon-css.svg";
  let jsImage = "./starter-code/assets/images/icon-js.svg";
  let accImage = "./starter-code/assets/images/icon-accessibility.svg";

  switch (x) {
    case "HTML":
      createElement(x, htmlImage, "htmlIcon");
      break;

    case "CSS":
      createElement(x, cssImage, "cssIcon");

      break;

    case "JavaScript":
      createElement(x, jsImage, "jsIcon");

      break;

    case "Accessibility":
      createElement(x, accImage, "accIcon");

      break;

    default:
      console.log("default");
      break;
  }
}
//Create Element above header
function createElement(x, image, color) {
  let newImage = document.createElement("img");
  newImage.src = image;
  newImage.style.order = "1";
  newImage.classList.add(color);

  selectionImageDiv.appendChild(newImage);
  selectionImageDiv.style.display = "flex";
  selectionImageDiv.style.gap = "1rem";
  selectionImageDiv.style.alignItems = "center";
}
//next question button
btnNext.addEventListener("click", function () {
  let category = title.textContent;
  checkAnswer();
  switch (category) {
    case "HTML":
      nextQuestion(0);
      break;

    case "CSS":
      nextQuestion(1);
      break;

    case "JavaScript":
      nextQuestion(2);
      break;

    case "Accessibility":
      nextQuestion(3);
      break;

    default:
      console.log("default");
      break;
  }
});

function showtitle(x) {
  title.textContent = x;
  title.style.display = "block";
}

function nextQuestion(x) {
  let rndNumber = Math.floor(Math.random() * 10);
  let allNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let availableNumbers = allNumbers.filter(
    (number) => !numberArray.includes(number)
  );

  //remove active items and border
  for (let i = 0; i < questionList.length; i++) {
    questionList[i].classList.remove("active");
    questionList[i].style.border = "";
    questionList[i].classList.remove("correct");
    questionList[i].classList.remove("incorrect");

    letter[i].classList.remove("correctLetter");
    letter[i].classList.remove("incorrectLetter");
    letter[i].classList.remove("activeLetter");
  }

  if (counter < 10) {
    if (numberArray.indexOf(rndNumber) > -1) {
      let arrayLength = availableNumbers.length;
      let newArrayNumber = Math.floor(Math.random() * arrayLength);
      numberArray.push(availableNumbers[newArrayNumber]);

      questionHeader.textContent =
        json.quizzes[x].questions[availableNumbers[newArrayNumber]].question;

      for (let i = 0; i < 4; i++) {
        choice[i].textContent =
          json.quizzes[x].questions[availableNumbers[newArrayNumber]].options[
            i
          ];
      }
      counter++;
    } else {
      numberArray.push(rndNumber);
      questionHeader.textContent =
        json.quizzes[x].questions[rndNumber].question;

      for (let i = 0; i < 4; i++) {
        choice[i].textContent = json.quizzes[x].questions[rndNumber].options[i];
      }
      counter++;
    }
  } else {
    createResultsPage(title.textContent);
    statusBar.style.display = "none";
  }
  //loop through choices to remove image
  for (let i = 0; i < questionList.length; i++) {
    if (questionList[i].children.length > 1) {
      questionList[i].children[1].remove();
    }
  }

  numberQ.textContent = counter;
  btnNext.style.display = "none";
  btnSubmit.style.display = "block";
  statusCounter = statusCounter + 10;
  userStatus.style.width = statusCounter + "%";
}

//Submit button eventlistener
btnSubmit.addEventListener("click", function (e) {
  let userAnswer = "";
  let question = questionHeader.textContent;
  let category = title.textContent;
  let activeCounter = 0;
  for (let i = 0; i < questionList.length; i++) {
    if (questionList[i].classList.contains("active")) {
      userAnswer = questionList[i].children[0].children[2].textContent;
      checkAnswer(category, question, userAnswer);
    } else {
      activeCounter++;
      if (activeCounter === 4) {
        errorDiv.classList.toggle("errorVisible");
      }
    }
  }
  showStatusBar();
});

function checkAnswer(category, question, userAnswer) {
  switch (category) {
    case "HTML":
      verifyAnswer(0, question, userAnswer);
      break;

    case "CSS":
      verifyAnswer(1, question, userAnswer);
      break;

    case "JavaScript":
      verifyAnswer(2, question, userAnswer);
      break;

    case "Accessibility":
      verifyAnswer(3, question, userAnswer);
      break;

    default:
      console.log("default");
      break;
  }
}

function verifyAnswer(category, question, userAnswer) {
  let imageElement = document.createElement("img");
  let correctImg = "./starter-code/assets/images/icon-correct.svg";
  let incorrectImg = "./starter-code/assets/images/icon-incorrect.svg";
  imageElement.style.width = "30px";

  for (let i = 0; i < json.quizzes[category].questions.length; i++) {
    if (question == json.quizzes[category].questions[i].question) {
      if (userAnswer === json.quizzes[category].questions[i].answer) {
        for (let i = 0; i < questionList.length; i++) {
          if (questionList[i].classList.contains("active")) {
            questionList[i].classList.add("correct");
            letter[i].classList.add("correctLetter");
            imageElement.src = correctImg;
            questionList[i].appendChild(imageElement);

            btnSubmit.style.display = "none";
            btnNext.style.display = "block";
            numberCorrect++;
          }
        }
      } else {
        for (let i = 0; i < questionList.length; i++) {
          if (questionList[i].classList.contains("active")) {
            questionList[i].classList.add("incorrect");
            letter[i].classList.add("incorrectLetter");
            imageElement.src = incorrectImg;
            questionList[i].appendChild(imageElement);

            btnSubmit.style.display = "none";
            btnNext.style.display = "block";
            findCorrectAnswer(category, question, correctImg);
          }
        }
        statusBar.style.display = "none";
      }
    }
  }
}

//create results page
function createResultsPage(x) {
  let score = document.querySelector(".score");
  let ulList = document.querySelector("ul");
  let newParagraph = document.createElement("p");
  let htmlImage = "./starter-code/assets/images/icon-html.svg";
  let cssImage = "./starter-code/assets/images/icon-css.svg";
  let jsImage = "./starter-code/assets/images/icon-js.svg";
  let accImage = "./starter-code/assets/images/icon-accessibility.svg";
  let findImage = document.createElement("img");
  let findImageDescription = document.createElement("p");

  findImageDescription.style.fontSize = "1.75rem";
  findImageDescription.style.fontWeight = "400";

  switch (x) {
    case "HTML":
      findImage.src = htmlImage;
      findImageDescription.textContent = x;
      findImage.style.backgroundColor = "rgba(255, 126, 53, .1)";
      break;

    case "CSS":
      findImage.src = cssImage;
      findImageDescription.textContent = x;
      findImage.style.backgroundColor = "rgba(47, 216, 135, .1)";
      break;

    case "JavaScript":
      findImage.src = jsImage;
      findImageDescription.textContent = x;
      findImage.style.backgroundColor = "rgba(48, 106, 255, .1)";
      break;

    case "Accessibility":
      findImage.src = accImage;
      findImageDescription.textContent = x;
      findImage.style.backgroundColor = "rgba(167, 41, 245, .1)";

      break;

    default:
      console.log("default");
      break;
  }

  // new Paragraph
  newParagraph.textContent = "You scored...";

  newParagraph.classList.add("results-styles");

  score.textContent = numberCorrect;
  ulList.style.display = "none";
  questionHeader.textContent = "Quiz Completed";
  questionHeader.style.fontWeight = "100";
  resultsDiv.style.display = "flex";
  btnPlayAgain.style.display = "block";
  numberQuestion.style.display = "none";

  resultImage.appendChild(findImage);
  resultImage.appendChild(findImageDescription);
  quizHeader.appendChild(newParagraph);
}
//error message
function errorMessage() {
  let error = document.createElement("p");
  let errorImage = document.createElement("img");
  errorImage.src = "./starter-code/assets/images/icon-error.svg";
  error.textContent = "Please select an answer";
  errorDiv.appendChild(errorImage);
  errorDiv.appendChild(error);
  errorDiv.classList.add("errorDiv");
  errorDiv.classList.add("errorVisible");
  ulList.appendChild(errorDiv);
}

//show statusBar
function showStatusBar() {
  if ((statusBar.style.display = "none")) {
    statusBar.style.display = "flex";
  } else {
    statusBar.style.display = "none";
  }
}

//Mark correct answer if user answer is wrong
function findCorrectAnswer(category, question, correctImg) {
  let answer = "";
  let imageElement = document.createElement("img");
  imageElement.src = correctImg;
  imageElement.style.width = "30px";

  //loop through questions to find a match
  for (let i = 0; i < 10; i++) {
    if (json.quizzes[category].questions[i].question === question) {
      answer = json.quizzes[category].questions[i].answer;
    }
  }
  for (let i = 0; i < questionList.length; i++) {
    if (choice[i].textContent === answer) {
      questionList[i].appendChild(imageElement);
      questionList[i].classList.add("correctImage");
    }
  }
}
