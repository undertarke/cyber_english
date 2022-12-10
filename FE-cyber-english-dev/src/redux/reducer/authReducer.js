import localStorageServ from "../../services/locaStorage.service";

const initialState = {
  // token: "",
  // token: localStorage.getItem("token"),
  token: localStorageServ.accessToken.get(),
  isAuth: false,
  // profile:null
  isShowGmail: false,
};

const initialStateLessons = {
  currentLesson: localStorage.getItem("currentLesson"),
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_TOKEN": {
      // console.log(payload);
      return { ...state, token: payload };
    }
    case "IS_AUTH": {
      return { ...state, isAuth: payload };
    }
    case "IS_SHOW_GMAIL": {
      return { ...state, isShowGmail: payload };
    }
    default:
      return state;
  }
};

export const lessonsReducer = (
  state = initialStateLessons,
  { type, payload }
) => {
  switch (type) {
    case "SET_CURRENT_LESSON": {
      // console.log(payload);
      localStorage.setItem("currentLesson", payload);
      return { ...state, currentLesson: payload };
    }
    default:
      return state;
  }
};

export default authReducer;
