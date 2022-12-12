export class MultipleChoiceQuestion {
  id;
  vocabulary;
  answerList;
  processing;
  constructor(data) {
    if (data) {
      this.id = data.id;
      this.vocabulary = data.vocabulary;
      this.answerList = data.answerList;
      this.processing = data.processing;
    }
  }
}
