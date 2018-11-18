import SpeechRecognition from "react-speech-recognition";
import { PropTypes } from "react";
import RecordButton from "./RecordButton";
import StopButton from "./StopButton";
import Button from "../components/Button";
import Tick from "../components/Tick";

// const propTypes = {
//     // Props injected by SpeechRecognition
//     // transcript: PropTypes.string,
//     resetTranscript: PropTypes.func,
//     browserSupportsSpeechRecognition: PropTypes.bool
// }

const options = {
  autoStart: true
};

// use stoplistening after time period of quiet?
// or stop listening on click - change record button to stop onclick - or have stop button
// how to access transcript / finished transcript and save into steps to success

class SpeechToText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: true,
      speech: "",
      show: true,
      transcripts: []
    };
    this.speechRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.finalTranscript !== prevProps.finalTranscript) {
      if (this.props.finalTranscript.slice(0,11) === 'change step') {
        console.log('heree')
        this.reRecordStep();
        return;
      }
      this.setState({ show: false });
      this.setState({transcripts: [...this.state.transcripts, this.props.finalTranscript]})
      this.props.resetTranscript();
      if (!this.props.transcript) {
        this.setState({ show: !this.state.show });
      }
    }
  }

  componentWillUnmount() {
    this.props.stopListening();
  }

  handleClick(e) {
    this.setState({
      play: !this.state.play
    });
  }

  handleStop() {
    if (this.props.finalTranscript) {
      sessionStorage.setItem("stepToSuccess", this.props.finalTranscript);
    }
  }

  // change step ${num}
  // 

  // 

  reRecordStep() {
    console.log('in rerecord')
    console.log('finaltrans', this.props.finalTranscript)
    switch(this.props.finalTranscript) {
      case 'change step 1':
        console.log('1');
        // update state of transcripts
        const newTranscripts = [...this.state.transcripts];
        newTranscripts[0] = 'Listening'
        this.setState({transcripts: newTranscripts})
        break;
      case 'change step 2':
        console.log('2');
        break;
      case 'change step 3':
        console.log('3');
        break;
    }
    this.props.resetTranscript()
  }

  render() {
    const {
      transcript,
      resetTranscript,
      browserSupportsSpeechRecognition,
      startListening,
      stopListening
    } = this.props;

    if (!browserSupportsSpeechRecognition) {
      return null;
    }
    let display;

    if (this.state.play) {
      display = (
        <div className={this.state.show ? "" : "hidden"}>
          Say your step to success...
          <style jsx>{`
            .hidden {
              display: none;
            }
          `}</style>
        </div>
      );
      // button = <RecordButton onClick={() => { startListening(); this.handleClick(); }}>Record</RecordButton>
    } else {
      display = (
        <StopButton
          onClick={() => {
            this.handleStop();
            stopListening();
            resetTranscript();
          }}
        >
          Stop
        </StopButton>
      );
    }

    let stepsToSuccess = this.state.transcripts.map((step)=>{
      return (
        <React.Fragment>
          <div>{step}</div>
          <Tick className={step ? "visible" : "hidden"} />
        </React.Fragment>
      )
    })


    // stop listening on componentwillunmount


    return (
      <div>
        <Button
          className={this.props.finalTranscript ? "" : "hidden"}
          onClick={resetTranscript}
        >
          Reset
        </Button>
        <h4>Steps to Success</h4>
        <span>{stepsToSuccess}</span>
 
          <style jsx>{`
            margin-top: 20px;
          `}</style>

      </div>
    );
  }
}

// Dictaphone.propTypes = propTypes

export default SpeechRecognition(options)(SpeechToText);
