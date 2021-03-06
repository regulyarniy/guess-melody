import AbstractEndGameView from './abstract-end-game-view';

export default class FailTimeView extends AbstractEndGameView {
  /**
   * Класс экрана проигрыша по времени
   */
  constructor() {
    super();
  }
  /** Шаблон
   * @return {string} Возвращает разметку
   */
  get template() {
    return `<section class="result">
  <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
  <h2 class="result__title">Увы и ах!</h2>
  <p class="result__total result__total--fail">Время вышло! Вы не успели отгадать все мелодии</p>
  <button class="result__replay" type="button">Попробовать ещё раз</button>
</section>`;
  }
}
