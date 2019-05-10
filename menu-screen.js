// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {
  constructor(containerElement, switchScreen) {
    this.containerElement = containerElement;
    this.switchScreen = switchScreen;
    this.generateMenu();
  }

  generateMenu() {
    const choices = this.containerElement.querySelector('#choices');
    FLASHCARD_DECKS.map(({ title }) => {
      const choice = document.createElement('div');
      choice.textContent = title;
      choice.addEventListener('click', () => this.switchScreen(title))
      choices.append(choice);
    })
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
