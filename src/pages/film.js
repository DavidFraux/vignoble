import React from "react"
import { graphql } from 'gatsby'
import Header from '../components/header.js';
import Container from "../components/container";
import styles from "./film.module.css";
import ReactPlayer from 'react-player'
import posterImg from "../images/presentation.png"

class Film extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: true,
    };
    this.videoRef = React.createRef();
    this.baseURL = 'https://uncloud.univ-nantes.fr/index.php/s/eL8zoRTzJMB9L53/download?path=/&files=';
  }

  handlePause() {

  }

  handleVideoClick() {
    this.setState(prevState => ({
      playing: !prevState.playing
    }));
    //show header over
  }

  render() {
    const title = 'Le film';
    return (
    <div>
      <Header headerText = {title}/>
        <div className={styles.videoContainer}>
          <ReactPlayer
            muted
            url={this.baseURL+"foot.mp4"}
            playing={this.state.playing}
            preload={'auto'}
            type={'video/mp4'}
            //controls={['PlayPause', 'Seek', 'Time']}
            poster={posterImg}
            className={styles.video}
            width={null}
            height={null}
            //ref={this.videoRef}
            //isPlaying={this.state.playing}
            //onPlay={() => this.setState({playing: true})}
            //onPause={() => this.handlePause() }
            onClick={() => this.handleVideoClick()}
            onEnded={() => this.setState({endedVideo : this.state.endedVideo + 1})}
            />
        </div>
    </div>
    )
  };
};

export default Film