$(document).ready(function () {

    let questions = [{
            question: "Who was the first Disney princess?",
            answer_1: "Snow White",
            answer_score_1: 20,
            answer_2: "Ariel",
            answer_score_2: 30,
            answer_3: "Cinderella",
            answer_score_3: 20,
            answer_4: "Belle",
            answewr_score_4: 10
        },
        {
            question: "Who was the second Disney princess?",
            answer_1: "Snow-White",
            answer_score_1: 20,
            answer_2: "Ar-iel",
            answer_score_2: 30,
            answer_3: "Cinde-rella",
            answer_score_3: 20,
            answer_4: "Be-lle",
            answer_score_4: 10
        },
        {
            question: "Who was the first Disney princess?",
            answer_1: "Snow White",
            answer_score_1: 20,
            answer_2: "Ariel",
            answer_score_2: 30,
            answer_3: "Cinderella",
            answer_score_3: 20,
            answer_4: "Belle",
            answer_score_4: 10
        },
    ]

    // global variables
    let question = $('#question');
    let timeCount = 5;

    let currentQuestionIndex = 0;

    let scoreOne = 0;
    let scoreTwo = 0;
    let scoreThree = 0;
    // Count down function
    function countDown() {
        timeCount--;
        $('#boardTimer').text(timeCount);
        if (timeCount === 0) {
            alert("You've run out of time!")
            timeCount = 5;
            //timeUp();
        }
    };

    // Timer function
    function timer() {
        timeCount = 5;
        timer = setInterval(countDown, 1000);
        if (timeCount === 0) {
            alert("You've run out of time!")
            clear(timer);
        }
    }

    //timer();


    // Display question 
    function displayQA() {
        timer();
        question.text(questions[currentQuestionIndex].question);
        console.log("current question: ", questions[currentQuestionIndex]);

    }

    displayQA();




})