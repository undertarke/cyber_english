import React, { Component } from "react";
import classes from "./Audio_player.module.css";
export default class AudioPlayer extends Component {
  state = {
    duration: "",
    isPlaying: false,
    playIconClass: "fa fa-play",
    currentTime: 0,
  };
  containerRef = React.createRef();
  time = "";
  sliderRef = React.createRef();
  audioRef = React.createRef();
  audio = new Audio();
  componentDidMount() {
    this.audio.src = this.props.src;
    // console.log("audio.src", this.audio.src);
    // console.log("audio.duration", this.audio.duration);
    let sliderEl = this.sliderRef.current;
    sliderEl.value = 0;
    let audioEl = this.audioRef.current;
    this.currentTimeInterval = 0;
    this.timer = null;
    audioEl.onloadedmetadata = () => {
      // console.log(audioEl);
      // console.log(audioEl.duration);
      this.setState({ duration: audioEl.duration }, () => {});
    };
    audioEl.onplay = () => {
      this.currentTimeInterval = setInterval(() => {
        sliderEl.value = audioEl.currentTime;
      }, 1000);
    };
    audioEl.onpause = () => {
      clearInterval(this.currentTimeInterval);
    };
    sliderEl.onchange = (e) => {
      audioEl.currentTime = e.target.value;
      if (e.target.value === audioEl.duration) {
        this.onpause();
      }
      this.setState({ currentTime: e.target.value }, () => {});

      audioEl.play();
      this.setState({ playIconClass: "fa fa-pause" });
    };
    audioEl.addEventListener("loadedmetadata", (e) => {
      // console.log("e.target.duration", e.target.duration, e.target.src);
    });
  }
  handlePlay = () => {
    this.timer = setInterval(() => {
      let currentTime = this.state.currentTime;
      this.setState({ currentTime: currentTime * 1 + 1 });
    }, 1000);
    this.audioRef.current.play();
    this.setState({
      playIconClass: ` fa fa-pause ${classes.playingColor}`,
      isPlaying: true,
    });
    // console.log(this.audioRef.current.duration);
  };
  handlePause = () => {
    clearInterval(this.timer);
    this.audioRef.current.pause();
    this.setState({ playIconClass: "fa fa-play ", isPlaying: false });
  };

  togglePlayHandler = () => {
    let isPlaying = this.state.isPlaying;
    if (isPlaying) {
      this.handlePause();
    } else {
      this.handlePlay();
    }
  };
  convertTime = (time) => {
    // time line

    time = time * 1;

    let mins = Math.floor(time / 60);
    let seconds = time - mins * 60;
    if (seconds < 10) {
      seconds = 0 + seconds;
    }
    time = mins + ":" + seconds;
    return time;
  };
  componentWillUnmount() {
    this.audioRef.current.src = "";
  }
  componentDidUpdate() {
    // console.log("duration", this.audioRef.current.duration);
  }
  render() {
    // console.log("duration", this.audioRef.current?.duration);

    let cssContainer = this.props.isSidebarOpen
      ? `${classes.container} ${classes.transition}`
      : `${classes.container} ${classes.fixWidthSidebar}`;
    // console.log(this.props.src);

    return (
      <div className={cssContainer} ref={this.containerRef}>
        <div className={classes.wrapper}>
          <audio ref={this.audioRef} src={this.props.src} />
          {/* <audio ref={this.audioRef} src={src} /> */}
          <button
            type="button"
            className={classes.button}
            onClick={this.togglePlayHandler}
          >
            <i className={this.state.playIconClass}></i>
          </button>
          <input
            className={classes.sider}
            type="range"
            min="0"
            max={this.state.duration}
            ref={this.sliderRef}
          />
          <div className={classes.timeline__current}>
            {this.convertTime(this.state.currentTime)}
          </div>
        </div>
      </div>
    );
  }
}
