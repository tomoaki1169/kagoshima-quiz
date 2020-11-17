'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p')

  const quizSet = shuffle([
    {q: '「だれた」この鹿児島弁の意味は?', c: ['疲れた','誰?','どこに行った']},
    {q: '「おやっとさ」この鹿児島弁の意味は?', c: ['お疲れ','おやすみ','おはよう']},
    {q: '「よかにせ」この鹿児島弁の意味は?', c: ['イケメン','良い店','偽物']},
    {q: '「びんた」この鹿児島弁の意味は?', c: ['頭','叩く','体罰']},
  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;



  function shuffle(arr) {
    
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
    [arr[j], arr[i]] = [arr[i], arr[j]]
    }
    return arr;
  }

  function checkAnswer(li){
    // if (isAnswered === true){
    if (isAnswered){
      return;
    }

    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else{
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;

    question.textContent = quizSet[currentNum].q;

    while(choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffleChoices = shuffle([...quizSet[currentNum].c]);
  
    shuffleChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () =>{
        checkAnswer(li);
      })
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1){
      btn.textContent = 'show score';
    }
  }

  setQuiz();

  btn.addEventListener('click', () =>{
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length - 1) {
      // console.log(`Score: ${score} / ${quizSet.length}`);
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
    }else{
      currentNum++;
      setQuiz();
    }

  });
  }