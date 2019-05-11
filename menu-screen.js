// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {
  constructor(containerElement, switchScreen, appState) {
    this.containerElement = containerElement;
    this.switchScreen = switchScreen;
    this.appState = appState;

    const choices = this.containerElement.querySelector('#choices');
    FLASHCARD_DECKS.map(({ title }) => {
      const choice = document.createElement('div');
      choice.textContent = title;
      choice.addEventListener('click', () => {
        this.appState.title = title;
        this.switchScreen('main');
      })
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
