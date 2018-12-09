// TODO вынести константы в DATA
const BONUS_TIME = 30; //  Время для бонуса
const BONUS_SUCCESS = 2; // Мультипликатор для бонуса
const FAIL_RESULT = -1; // Возвращаемое значение при проигрыше
const SCORE_SUCCESS = 1; // Баллы за успешный ответ
const SCORE_FAIL_FOR_BONUS_SCORE = 0; // Баллы для ошибки в подсчете бонусов
const MIN_LIVES = 0; // Минимум жизней
export const MAX_QUESTIONS = 10; // Вопросов на игру
const REDUCER_INITIAL_VALUE = 0; // Начальное значение для

/**
 * Считает набранные баллы
 * @param {Array} answers Массив с ответами игрока
 * @param {Number} livesLeft Число оставшихся жизней
 * @return {Number} Возвращает количество баллов или -1, если закончились попытки или получены не все ответы
 */
export default (answers = [], livesLeft = MIN_LIVES) => {
  if (answers.length < MAX_QUESTIONS || livesLeft <= MIN_LIVES) {
    return FAIL_RESULT;
  }
  const reducer = (accumulator, currentValue) => {
    const {success, time} = currentValue;
    // Считаем баллы за ответ
    const increment = (success && time <= BONUS_TIME) ? SCORE_SUCCESS * BONUS_SUCCESS : SCORE_FAIL_FOR_BONUS_SCORE;
    return accumulator + increment;
  };
  return answers.reduce(reducer, REDUCER_INITIAL_VALUE);
};