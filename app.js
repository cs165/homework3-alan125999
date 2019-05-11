// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Changing the code in the constructor
// - Adding methods
// - Adding additional fields

class App {
  constructor() {
    this.state = {
      title: '',
      currentScreen: 'menu',
      correct: 0,
      wrong: 0,
      newGame: true,
    }
    this.switchScreen = this.switchScreen.bind(this);

    const menuElement = document.querySelector('#menu');
    this.menu = new MenuScreen(menuElement, this.switchScreen, this.state);

    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement, this.switchScreen, this.state);

    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement, this.switchScreen, this.state);
    
    this.screenMap = {
      menu: this.menu,
      main: this.flashcards,
      result: this.results,
    };
    // Uncomment this pair of lines to see the "flashcard" screen:
    // this.menu.hide();
    // this.flashcards.show();

    // Uncomment this pair of lines to see the "results" screen:
    // this.menu.hide();
    // this.results.show();
  }

  switchScreen(screen) {
    console.log(`${this.state.currentScreen} -> ${screen}`);
    this.screenMap[this.state.currentScreen].hide();
    this.screenMap[screen].show();
    this.state.currentScreen = screen;
  }
}
