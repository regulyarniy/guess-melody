// Экран выигрыша
import {changeScreen} from '../services/utils';
import gameplay from '../gameplay/gameplay';
import SuccessView from "../views/success-view";
import templates from "../templates";

const result = function (context) {
  const {game: gameStatus} = context;
  // Вычисляем результат
  const score = gameplay.countScore(gameStatus.answers, gameStatus.livesLeft);
  const bonusScore = gameplay.countBonusScore(gameStatus.answers, gameStatus.livesLeft);
  const mistakes = context.NEW_GAME.livesLeft - gameStatus.livesLeft;
  const fakeStatistics = [4, 6, 8, 1, 12, 10, 6, 8, 2]; // TODO real statistics
  const rating = gameplay.getResult(fakeStatistics, {score, livesLeft: gameStatus.livesLeft, timeLeft: gameStatus.timeLeft});
  const data = {
    time: gameStatus.timeLeft,
    score,
    bonusScore,
    mistakes,
    rating
  };

  // Инициализируем представление
  const view = new SuccessView(data);

  // Возврат к экрану начала игры
  view.onResetGame = () => {
    templates.welcome(context);
  };

  // Отрисовка в DOM
  changeScreen(view.element);


//   const {render} = context;
//   // Генерируем шаблон
//   context.game.timeLeft = 153; // FAKE TODO real time count
//   const sessionTime = context.NEW_GAME.timeLeft - context.game.timeLeft;
//   const sessionTimeText = utils.convertSecondsToHumanReadableString(sessionTime);
//   context.game.score = gameplay.countScore(context.game.answers, context.game.livesLeft);
//   const sessionBonusScore = gameplay.countBonusScore(context.game.answers, context.game.livesLeft);
//   const sessionMistakes = context.NEW_GAME.livesLeft - context.game.livesLeft;
//   const fakeStatistics = [4, 6, 8, 1, 12, 10, 6, 8, 2]; // TODO real statistics
//   const sessionRating = gameplay.getResult(fakeStatistics, context.game);
//   const template = `
// <section class="result">
//   <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
//   <h2 class="result__title">Вы настоящий меломан!</h2>
//   <p class="result__total">За ${sessionTimeText} вы набрали ${context.game.score} баллов (${sessionBonusScore} быстрых), совершив ${sessionMistakes} ошибки</p>
//   <p class="result__text">${sessionRating}</p>
//   <button class="result__replay" type="button">Сыграть ещё раз</button>
// </section>
// `;
//   // TODO функция для склонения числительного со словом ошибка
//   const fragment = utils.generateFragment(template);
//   const buttonReplay = fragment.querySelector(`.result__replay`);
//
//   // Переход на экран приветствия
//   buttonReplay.addEventListener(`click`, function (e) {
//     e.preventDefault();
//     render(`Welcome`, context);
//   });
//
//   this.generate = function () {
//     return fragment;
//   };
};


export default result;
