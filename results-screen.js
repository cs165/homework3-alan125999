// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
  constructor(containerElement, switchScreen, appState) {
    this.containerElement = containerElement;
    this.switchScreen = switchScreen;
    this.appState = appState;

    this.btnToMain = this.containerElement.querySelector('.continue');
    this.btnToMenu = this.containerElement.querySelector('.to-menu');
    this.percentStat = this.containerElement.querySelector('.percent');
    this.correctStat = this.containerElement.querySelector('.correct');
    this.wrongStat = this.containerElement.querySelector('.incorrect');

    this.btnToMain.addEventListener('pointerup', () => {
      this.appState.newGame = !this.appState.wrong;
      this.switchScreen('main');
    });

    this.btnToMenu.addEventListener('pointerup', () => {
      this.appState.newGame = true;
      this.switchScreen('menu')
    });
  }

  show() {
    const { correct, wrong } = this.appState;
    this.containerElement.classList.remove('inactive');
    this.btnToMain.textContent = (wrong) ? 'Continue' : 'Start over?';
    this.correctStat.textContent = correct;
    this.wrongStat.textContent = wrong;
    this.percentStat.textContent = Math.round(correct / (correct + wrong) * 100);
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
