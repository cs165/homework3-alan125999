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
    const menuElement = document.querySelector('#menu');
    this.menu = new MenuScreen(menuElement, title => {
      this.menu.hide();
      this.flashcards.show(title);
    });

    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement, () => {
      this.flashcards.hide();
      this.results.show();
    });

    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement, title => {
      this.results.hide();
      if(title) this.flashcards.show(title);
      else this.menu.show();
    });

    // Uncomment this pair of lines to see the "flashcard" screen:
    // this.menu.hide();
    // this.flashcards.show();

    // Uncomment this pair of lines to see the "results" screen:
    // this.menu.hide();
    // this.results.show();
  }
}
