import AxiosServ from "./axios.service";

/* eslint-disable no-useless-constructor */
class HttpRequestService {
  constructor() {}

  login(data) {
    const uri = "user/login";
    return AxiosServ.postMethod(uri, data);
  }

  getAllUnit = () => {
    const uri = "unit/all";
    return AxiosServ.getMethod(uri);
  };

  getVocabularyByUnit = (unit) => {
    const uri = `vocabulary/unit/${unit}`;
    return AxiosServ.getMethod(uri);
  };

  getReadingByUnit = (unit) => {
    const uri = `reading/unit/${unit}`;
    return AxiosServ.getMethod(uri);
  };

  getVocabularyDetailByText = (unit, data) => {
    const uri = `vocabulary/details/${unit}`;
    return AxiosServ.postMethod(uri, data);
  };

  getMutipleChoiceByUnit = (unit) => {
    const uri = `multiple-choice/unit/${unit}`;
    return AxiosServ.getMethod(uri);
  };

  checkMutipleChoice = (unit, data) => {
    const uri = `multiple-choice/unit/${unit}`;
    return AxiosServ.postMethod(uri, data);
  };

  getListeningQuestionByUnit = (unit) => {
    const uri = `listening/unit/${unit}`;
    return AxiosServ.getMethod(uri);
  };

  checkListeningQuestionByUnit = (unit, data) => {
    const uri = `listening/unit/${unit}`;
    return AxiosServ.postMethod(uri, data);
  };

  patchFlashCardInfor(data) {
    const uri = `flash-card`;
    return AxiosServ.patchMethod(uri, data);
  }

  addWordList(data) {
    const uri = `vocabulary/word-list`;
    return AxiosServ.postMethod(uri, data);
  }

  getWordList(pageSize, pageIndex) {
    const uri = `vocabulary/word-list/${pageSize}/${pageIndex}`;
    return AxiosServ.getMethod(uri);
  }

  deleteWordListByID(id) {
    const uri = `vocabulary/word-list/${id}`;
    return AxiosServ.deleteMothod(uri);
  }

  changeStatusWordListByID(id) {
    const uri = `vocabulary/word-list/${id}`;
    return AxiosServ.patchMethod(uri);
  }
  resetListeningByID(id) {
    const uri = `listening/unit/${id}`;
    return AxiosServ.deleteMothod(uri);
  }
  resetMultipleChoiceByID(id) {
    const uri = `/multiple-choice/unit/${id}`;
    return AxiosServ.deleteMothod(uri);
  }

  getFlashCard = () => {
    const uri = "flash-card";
    return AxiosServ.getMethod(uri);
  };
}

const httpServ = new HttpRequestService();

export default httpServ;
