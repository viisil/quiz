let currentQuestion = 0;
let corretAnswers = 0;

showQuestion();

// events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);


// function
function showQuestion(){
    if(questions[currentQuestion]){
        let q = questions[currentQuestion];

        let percentual = Math.floor((currentQuestion / questions.length) * 100);

        document.querySelector('.progress--bar').style.width = `${percentual}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;
        let optionsHtml = '';
        for(let i in q.options){
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });

    }else{
        finishQuiz();
    }
}

function optionClickEvent(e){
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickedOption){
        corretAnswers++;
    }
    currentQuestion++;
    showQuestion();
}

function finishQuiz(){
    let points = Math.floor((corretAnswers/questions.length) * 100);

    if(points <30){
        document.querySelector('.scoreText1').innerHTML = 'Tá ruim hein?';
        document.querySelector('.scorePct').style.color = '#FF0000';
    } else if (points >=30 && points < 70){
        document.querySelector('.scoreText1').innerHTML = 'É até que não foi tão ruim...';
        document.querySelector('.scorePct').style.color = '#FFFF00';
    } else if (points > 70){
        document.querySelector('.scoreText1').innerHTML = 'Parabéns!';
        document.querySelector('.scorePct').style.color = '#0D630D';
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${corretAnswers}.`;

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';
}
function resetEvent(){
    corretAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}