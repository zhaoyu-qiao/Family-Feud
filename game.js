$(document).ready(function () {
    // Structure 
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


    // Transfer data from database to local format to be used.
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

    // Convert the db format into new format
    console.log(helper(questions))
    const newQuestions = helper(questions);

    // global variables
    let question = $('#question');

    //let answersPlaceHolder = [`$('.answer1')`, `$('.answer2')`, `$('.answer3')`, `$('.answer4')`, `$('.answer5')`, `$('.answer6')`]
    let answer1 = $('.answer1');
    let answer2 = $('.answer2');
    let answer3 = $('.answer3');
    let answer4 = $('.answer4');
    let answer5 = $('.answer5');
    let answer6 = $('.answer6');

    let userGuess = $('#playerAnswer-input');

    let timeCount = 5;

    let currentQuestionIndex = 0;
    let answerValues = Object.values(questions[currentQuestionIndex])
    // console.log(answerValues);
    let scoreOne = 0;
    let scoreTwo = 0;
    let scoreThree = 0;

    // Count down function
    function countDown() {
        timeCount--;
        $('#boardTimer').text(timeCount);
        if (timeCount === 0) {
            alert("You've run out of time!")
            timeCount = 30;
            //timeUp();
        }
    };

    // Timer function
    function timer() {
        timeCount = 30;
        timer = setInterval(countDown, 1000);
        if (timeCount === 0) {
            alert("You've run out of time!")
            clear(timer);
        }
    }



    // Display question, hidden answers and guessed answers
    function displayQA() {
        // Run timer
        timer();

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

        $('#add-playerAnswer').on('click', function (event) {
            event.preventDefault();
            console.log("submit is triggered");

            // Loop through the answers in newQuestions[currentQuestionIndex].answers[i], 
            // Compare the answer to userGuess, then display the correct answer to the correct html element
            // Add the score, and display the score
            // let currentQuestion = newQuestions[currentQuestionIndex];
            console.log(currentQuestion);
            for (let i = 0; i < currentQuestion.answers.length; i++) {
                if ((userGuess.val().trim()) === currentQuestion.answers[i].label) {
                    console.log("You guess right");
                    scoreOne += currentQuestion.answers[i].score;

                    // Display the score
                    // Display the correct Answer
                    console.log('Correct Answer', currentQuestion.answers[i].label);
                    console.log(i);
                    $('.answer' + (i + 1)).text(currentQuestion.answers[i].label);

                }
            }

        })

    }

    displayQA();

    function timeUp() {
        // Next Question or Display Results

        // Next Question

    }


})