$(document).ready(function () {

    // Below is the Formatted Data Structure, 
    // Converting the Questions from database to an array of objects, 
    // With each object as the following format
    // let q = {
    //     question: 'domdsfksdflksf',
    //     answers: [{
    //         label: 'Snow White',
    //         value: 20
    //     }, {
    //         label: 'Ariel',
    //         value: 20
    //     }]
    // }


    // Function to transfer data from database to local format to be used.
    function helper(dbResponse) {
        const questionFormatted = [];
        dbResponse.forEach(function (res, index) {
            const question = Object.keys(res).filter((f) => f.includes('question'));
            const answerIds = Array.from(new Set(
                Object.keys(res)
                .filter((f) => !f.includes('question'))
                .map((m) => m.substring(m.length, m.length - 1))))
            const obj = {
                question: res[question[0]],
                answers: []
            };

            answerIds.forEach((id) => {
                const answerObj = {
                    label: res['answer_' + id],
                    score: res['answer_score_' + id]

                };

                obj.answers.push(answerObj)
            })

            questionFormatted.push(obj)

        })
        return questionFormatted;
    }

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

    // Convert the db format into new format using helper function
    console.log(helper(questions))
    const newQuestions = helper(questions);

    // global variables
    let question = $('#question');

    // Link the answer html elements to js
    let answer1 = $('.answer1');
    let answer2 = $('.answer2');
    let answer3 = $('.answer3');
    let answer4 = $('.answer4');
    let answer5 = $('.answer5');
    let answer6 = $('.answer6');

    // Link user guess input field with js
    let userGuess = $('#playerAnswer-input');

    // Timer variables
    let timeCount = 30;
    let timer;

    // question index starts from 0
    let currentQuestionIndex = 0;

    // Define score Array for three rounds.
    let scoreArray = [0, 0, 0];


    // Count down function
    function countDown() {
        timeCount--;
        $('#boardTimer').text(timeCount);
        if (timeCount === 0) {
            //alert("You've run out of time!")
            timesUp();
            //timeCount = 30;
        }
    };

    // Timer function
    // function timer() {
    //     timeCount = 30;
    //     timer = setInterval(countDown, 1000);
    //     if (timeCount === 0) {
    //         alert("You've run out of time!")
    //         clear(timer);
    //     }
    // }



    // Display question, hidden answers and guessed answers
    function displayQA() {
        // Define variable timer using setInterval, to count down every second.
        // !!! this doesn't work!!!
        timer = setInterval(countDown(), 1000);

        // Display question and hidden answers
        question.text(questions[currentQuestionIndex].question);
        console.log("current question: ", questions[currentQuestionIndex]);
        answer1.html('<button>&nbsp&nbsp&nbsp1&nbsp&nbsp&nbsp</button>');
        answer2.html('<button>&nbsp&nbsp&nbsp2&nbsp&nbsp&nbsp</button>');
        answer3.html('<button>&nbsp&nbsp&nbsp3&nbsp&nbsp&nbsp</button>');
        answer4.html('<button>&nbsp&nbsp&nbsp4&nbsp&nbsp&nbsp</button>');
        answer5.html('<button>&nbsp&nbsp&nbsp5&nbsp&nbsp&nbsp</button>');
        answer6.html('<button>&nbsp&nbsp&nbsp6&nbsp&nbsp&nbsp</button>');

        // Display the guessed anwser if a user guess the correct answer
        // Use Object.values()
        // questions[currentQuestionIndex].values
        // if the answers array includes the user Guess. 
        // Make sure the () are correct
        // This should be on submit form 
        // Make sure on submit won't refresh the page too.

        // console.log('answers Array:', Object.values(questions[currentQuestionIndex]));


        let currentQuestion = newQuestions[currentQuestionIndex];
        console.log("current QQ: ", currentQuestion);

        $('#add-playerAnswer').on('click', function (event) {
            event.preventDefault();
            console.log("submit is triggered");


            // let currentQuestion = newQuestions[currentQuestionIndex];

            // Deep clone answers array then change the score of the guessed answer to 0
            // cited https://dev.to/samanthaming/how-to-deep-clone-an-array-in-javascript-3cig
            let tempAnswers = [...currentQuestion.answers]
            console.log("Temporary Answers", tempAnswers);


            // Loop through the answers in newQuestions[currentQuestionIndex].answers[i], 
            // Compare the answer to userGuess, then display the correct answer to the correct html element
            // Add the score when each answer is put in.
            for (let i = 0; i < tempAnswers.length; i++) {
                if ((userGuess.val().trim()) === tempAnswers[i].label) {
                    console.log("You guess right");
                    console.log("Hi :", tempAnswers[i].score);
                    scoreArray[currentQuestionIndex] += tempAnswers[i].score;
                    console.log("Score current Round: ", scoreArray[currentQuestionIndex]);

                    // Display the score beside the answer
                    // Display the correct Answer
                    console.log('Correct Answer', tempAnswers[i].label);
                    console.log(i);
                    $('.answer' + (i + 1)).text(tempAnswers[i].label);
                    $('.answer_score_' + (i + 1)).text(tempAnswers[i].score);
                    tempAnswers[i].score = 0;
                }
            }
            // Write scoreRound_1 to HTML
            console.log("Current Question Number: ", currentQuestionIndex + 1);
            $(".scoreRound_" + (currentQuestionIndex + 1)).text(scoreArray[currentQuestionIndex]);

            // !!!Also needs to write into API!!!!

        })
        timeUp();
    }

    displayQA();

    function timeUp() {
        clearInterval(timer);
        $('#boardTimer').text(timeCount);

        // Next Question or Display Results for a certain time
        if (currentQuestionIndex === (newQuestions.length - 1)) {
            // show whole result page
            console.log("Here's your total score!")

            // write into html the total score 
            // write into API too?
        } else {
            // !!!show all answers and current score for a certain time!!!

            // function roundResult

            // display next qusetion
            displayNextQA();
        }

    }

    function displayNextQA() {
        timeCount = 30;
        $('#boardTimer').text(timeCount);
        currentQuestionIndex++;
        displayQA();
    }
})