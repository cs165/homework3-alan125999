// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement, switchScreen) {
    this.containerElement = containerElement;
    this.flashcardContainer = document.querySelector('#flashcard-container');
    this.switchScreen = switchScreen;

    function isCorrect(x) {
      return x > 150;
    }

    function isWrong(x) {
      return x < -150;
    }

    const getDelta = (event) => {
      return {
        x: event.clientX - this.origin.x,
        y: event.clientY - this.origin.y,
      };
    }

    const correctStat = this.containerElement.querySelector('.correct');
    const wrongStat = this.containerElement.querySelector('.incorrect');

    this.flashcardContainer.addEventListener('pointerdown', event => {
      this.drag = true;
      this.origin = {
        x: event.clientX,
        y: event.clientY,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.style.transitionDuration = 'initial';
    });

    this.flashcardContainer.addEventListener('pointermove', event => {
      if (this.drag) {
        const delta = getDelta(event);
        event.currentTarget.style.transform = `translate(${delta.x}px, ${delta.y}px) rotate(${0.2 * delta.x}deg)`;

        if (isCorrect(delta.x) || isWrong(delta.x)) {
          document.body.style.backgroundColor = '#97b7b7';
          if (isCorrect(delta.x)) correctStat.textContent = this.record.correct + 1;
          else wrongStat.textContent = this.record.wrong + 1;
        }
        else {
          document.body.style.backgroundColor = '#d0e6df';
          correctStat.textContent = this.record.correct;
          wrongStat.textContent = this.record.wrong;
        }
      }
    })

    this.flashcardContainer.addEventListener('pointerup', event => {
      this.drag = false;
      event.currentTarget.releasePointerCapture(event.pointerId)
      const delta = getDelta(event);
      document.body.style.backgroundColor = '#d0e6df';
      if (isCorrect(delta.x) || isWrong(delta.x)) {
        if (isCorrect(delta.x)) this.record.correct += 1;
        else this.record.wrong += 1;
        this.reNewCard();
      }
      else {
        correctStat.textContent = this.record.correct;
        wrongStat.textContent = this.record.wrong;
        event.currentTarget.style.transitionDuration = '0.6s';
      }
      event.currentTarget.style.transform = `translate(0px, 0px) rotate(0deg)`;
    });
  }

  show(title) {
    this.containerElement.classList.remove('inactive');
    this.initCardSet(title);
    this.reNewCard();
    this.record = {
      correct: 0,
      wrong: 0,
    }
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  initCardSet(title) {
    this.words = FLASHCARD_DECKS.find(value => value.title === title).words;
    this.keys = Object.keys(this.words);
    this.keyIndex = 0;
  }

  reNewCard() {
    if(this.keyIndex >= this.keys.length) return this.switchScreen();
    if (this.card) this.card.remove();
    const key = this.keys[this.keyIndex++];
    this.card = new Flashcard(this.flashcardContainer, key, this.words[key]);
  }
}
