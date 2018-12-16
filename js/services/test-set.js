import jsdom from 'jsdom';

/**
 * Пресет для тестирования DOM в node.js
 * @example Вызвать testSet() после импорта до выполнения теста
 */
export default () => {
  const {JSDOM} = jsdom;
  const {document} = new JSDOM(`<!doctype html><html><body></body></html>`).window;
  global.document = document;
  global.window = document.defaultView;
};
