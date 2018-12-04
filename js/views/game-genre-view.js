import AbstractGameView from './abstract-game-view';
import TrackView from './track-view';

export default class GameGenreView extends AbstractGameView {
  /**
   * Класс представления игры на жанр
   * @param {Object} data Обьект c данными для представления
   */
  constructor(data) {
    super(data);
    this.answers = [];
    this.initializeTracks();
    this.buttonAnswer.toggleAttribute(`disabled`, true);
  }

  /** Шаблон
   * @return {string} Возвращает разметку
   */
  get template() {
    return `<section class="game game--genre">

  <section class="game__screen">
    <h2 class="game__title">Выберите ${this.genre} треки</h2>
    <form class="game__tracks">
      <button class="game__submit button" type="submit">Ответить</button>
    </form>
  </section>
</section>`;
  }

  /**
   * Возвращает элемент кнопки ответа
   * @return {HTMLElement}
   */
  get buttonAnswer() {
    if (!this._buttonAnswer) {
      this._buttonAnswer = this.element.querySelector(`.game__submit`);
    }
    return this._buttonAnswer;
  }

  /**
   * Генерирует треки
   */
  initializeTracks() {
    this._trackInstances = [];
    this.tracks.forEach((data) => {
      const trackInstance = new TrackView(data);
      this._trackInstances.push(trackInstance);
      const answerIndexOfInstance = this.answers.length;
      this.answers.push(false); // Создаем ответ в массиве ответов TODO move to constants
      // Подписываемся на слушатель отметки трека
      trackInstance.onChangeAnswer = () => {
        this.answers[answerIndexOfInstance] = !this.answers[answerIndexOfInstance]; // Меняем ответ
        // Кнопка неактивна если не выбран ответ
        const answered = this.answers.some((item) => {
          return item === true;
        });
        this.buttonAnswer.toggleAttribute(`disabled`, !answered);
      };
    });
  }

  /**
   * Создает DOM-элемент из разметки
   * @return {HTMLElement}
   */
  render() {
    // Добавляем треки в разметку
    const resultTemplate = super.render();
    const form = resultTemplate.querySelector(`.game__tracks`);
    this._trackInstances.reverse().forEach((instance) => {
      const firstChildInForm = form.firstChild;
      form.insertBefore(instance.element, firstChildInForm);
    });
    return resultTemplate;
  }

  /**
   * Добавляет обработчики
   */
  bind() {
    super.bind();

    this.buttonAnswer.addEventListener(`click`, (e) => {
      e.preventDefault();
      this.onAnswer(this.answers);
    });
  }

  /** Слушатель на событие сброса игры
   */
  onResetGame() {

  }

  /** Слушатель на событие ответа
   */
  onAnswer() {

  }
}
