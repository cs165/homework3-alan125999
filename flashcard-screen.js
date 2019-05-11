// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement, switchScreen, appState) {
    this.containerElement = containerElement;
    this.switchScreen = switchScreen;
    this.appState = appState;

    const flashcardContainer = document.querySelector('#flashcard-container');
    this.card = new Flashcard(flashcardContainer, 'word', 'definition');

    this.state = {
      isClick: false,
      dragging: false,
      origin: {
        x: 0,
        y: 0,
      },
      score: {
        correct: 0,
        wrong: 0,
      },
      words: {
        set: [],
        index: 0,
        wrongSet: [],
      }
    }

    this._getDelta = this._getDelta.bind(this);
    this.correctStat = this.containerElement.querySelector('.correct');
    this.wrongStat = this.containerElement.querySelector('.incorrect');
  }

  _getDelta = (event) => {
    return {
      x: event.clientX - this.state.origin.x,
      y: event.clientY - this.state.origin.y,
    };
  }

  _isCorrect(x) {
    return x > 150;
  }

  _isWrong(x) {
    return x < -150;
  }

  _onPointerDown(event) {
    this.state.isClick = true;
    this.state.dragging = true;
    this.state.origin = {
      x: event.clientX,
      y: event.clientY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.style.transitionDuration = 'initial';
  }

  _onPointerMove(event) {
    this.state.isClick = false;
    if (this.state.dragging) {
      const delta = this._getDelta(event);
      event.currentTarget.style.transform = `translate(${delta.x}px, ${delta.y}px) rotate(${0.2 * delta.x}deg)`;

      if (this._isCorrect(delta.x) || this._isWrong(delta.x)) {
        document.body.style.backgroundColor = '#97b7b7';
        if (this._isCorrect(delta.x)) this.correctStat.textContent = this.state.score.correct + 1;
        else this.wrongStat.textContent = this.state.score.wrong + 1;
      }
      else {
        document.body.style.backgroundColor = '#d0e6df';
        this.correctStat.textContent = this.state.score.correct;
        this.wrongStat.textContent = this.state.score.wrong;
      }
    }
  }

  _onPointerUp(event) {
    if (this.state.isClick) this.card.flipCard();
    this.state.dragging = false;
    event.currentTarget.releasePointerCapture(event.pointerId)
    document.body.style.backgroundColor = '#d0e6df';

    const { score, words } = this.state;
    const delta = this._getDelta(event);
    if (this._isCorrect(delta.x) || this._isWrong(delta.x)) {
      if (this._isCorrect(delta.x)) score.correct += 1;
      else {
        score.wrong += 1;
        words.wrongSet.push(words.set[words.index]);
      }
      words.index += 1;
      this._renewCard();
    }
    else {
      this.correctStat.textContent = score.correct;
      this.wrongStat.textContent = score.wrong;
      event.currentTarget.style.transitionDuration = '0.6s';
    }
    event.currentTarget.style.transform = `translate(0px, 0px) rotate(0deg)`;
  }

  _renewCard() {
    const { words, score } = this.state;
    if (words.index >= words.set.length) {
      this.appState.correct = score.correct;
      this.appState.wrong = score.wrong;
      this.switchScreen('result');
    }
    else {
      const { word, definition } = words.set[words.index];
      this.card.renew(word, definition);
      this.card.flashcardElement.addEventListener('pointerdown', this._onPointerDown.bind(this));
      this.card.flashcardElement.addEventListener('pointermove', this._onPointerMove.bind(this));
      this.card.flashcardElement.addEventListener('pointerup', this._onPointerUp.bind(this));
      this.correctStat.textContent = this.state.score.correct;
      this.wrongStat.textContent = this.state.score.wrong;
    }
  }

  show() {
    this.containerElement.classList.remove('inactive');
    if (this.appState.newGame) {
      this.appState.newGame = false;
      const words = FLASHCARD_DECKS.find(value => value.title === this.appState.title).words
      const wordSet = Object.keys(words).map(value => ({
        word: value,
        definition: words[value],
      }));
      this.state.words = {
        set: wordSet,
        index: 0,
        wrongSet: [],
      }
      this.state.score.correct = 0;
    }
    else {
      const { words } = this.state;
      this.state.words = {
        set: words.wrongSet,
        index: 0,
        wrongSet: [],
      }
    }
    this.state.score.wrong = 0;
    this._renewCard();
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
