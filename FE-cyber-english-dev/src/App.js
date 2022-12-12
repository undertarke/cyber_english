import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Lessons from "./components/Lessons/Lessons";
import Flashcard from "./components/Flashcard/Flashcard";
import LessonOption from "./components/LessonOption/LessoOption";
import VocabularyPage from "./components/LessonsPage/VocabularyPage/VocabularyPage";
import ReadingPage from "./components/LessonsPage/ReadingPage/ReadingPage";
import ListeningPage from "./components/LessonsPage/ListeningPage/ListeningPage";
import MultipleChoicePage from "./components/LessonsPage/MultipleChoicePage/MultipleChoicePage";
import Login from "./components/Login/Login";
import Wordlist from "./components/Wordlist/Wordlist";
import { Component } from "react";
import Nav from "./components/Nav/Nav";
import UserProfile from "./components/UserProfile/UserProfile";
import SpinnerComponent from "./components/Spinner/index";

class App extends Component {
  state = {
    isAuthed: false,
  };
  setIsAuthed = () => {
    this.setState({ isAuthed: true });
  };
  logoutHandle = () => {
    this.setState({ isAuthed: false });
  };

  render() {
    return (
      <Router>
        <SpinnerComponent />
        <div className="background">
          <Nav></Nav>
          <Switch>
            <Route exact path="/">
              <HomePage></HomePage>
            </Route>
            <Route path="/lesson/unit/:id" exact component={LessonOption}></Route>
            <Route exact path="/flashcard">
              <Flashcard></Flashcard>
            </Route>
            <Route exact path="/lessons">
              <Lessons isAuthed={this.state.isAuthed}></Lessons>
            </Route>
            <Route path="/vocabularyPage/:id" component={VocabularyPage}></Route>
            <Route path="/readingPage/:id" component={ReadingPage}></Route>
            <Route path="/listeningPage/:id" component={ListeningPage}></Route>
            <Route
              path="/multipleChoicePage/:id"
              render={(props) => {
                return <MultipleChoicePage {...props} isAuthed={this.state.isAuthed}></MultipleChoicePage>;
              }}
            ></Route>
            <Route path="/login">
              <Login isAuthed={this.setIsAuthed}></Login>
            </Route>
            <Route path="/wordlist">
              <Wordlist isAuthed={this.state.isAuthed}></Wordlist>
            </Route>
            <Route path="/profile">
              <UserProfile isAuthed={this.state.isAuthed}></UserProfile>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
