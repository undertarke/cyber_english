export const capitalizeFirstLetter = function (string) {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // // console.log(string);
  // return string;
};
export const shuffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

// Change Position fixed and relative for page when show NavbarToggle
export const changePosition = function (isValue) {
  if (getEleId("vocabulary-page")) {
    handleChangePosition("vocabulary-page", isValue);
  }
  if (getEleId("lesson-page")) {
    handleChangePosition("lesson-page", isValue);
  }
  if (getEleId("reading-page")) {
    handleChangePosition("reading-page", isValue);
  }
};

const handleChangePosition = (id, isValue) => {
  isValue
    ? (getEleId(id).style.position = "fixed")
    : (getEleId(id).style.position = "relative");
};

const getEleId = (id) => {
  return document.getElementById(id);
};
//==============================================
