import SpeechRecognition from "react-speech-recognition";
import { PropTypes } from "react";
import RecordButton from "./RecordButton";
import RecordingText from "./RecordingText";
import StopRecordingButton from "./StopRecordingButton";
import StopButton from "./StopButton";
import Button from "../components/Button";
import { runInThisContext } from "vm";
import Steps from "../components/Steps";
import Paused from "../components/Paused";

// const propTypes = {
//     // Props injected by SpeechRecognition
//     // transcript: PropTypes.string,
//     resetTranscript: PropTypes.func,
//     browserSupportsSpeechRecognition: PropTypes.bool
// }

const options = {
  autoStart: true
};

let stepsToSuccess;
let newTranscripts;

let steps;
let circleColor;

class SpeechToText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: true,
      speech: "",
      show: true,
      editing: false,
      tickClicked: [],
      transcripts: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.clickTick = this.clickTick.bind(this);
    this.clearAllSteps = this.clearAllSteps.bind(this);
  }

  componentDidMount() {
    // TODO - use default props to pass down to steps - bug when back click then
    // forward click browser...

    if (localStorage.getItem("steps")) {
      console.log("in if in componentDidMount");
      this.setState({ transcripts: localStorage.getItem("steps").split(",") });
    }

    // if (this.props.stepsStorage) {
    //   console.log('in if in componentDidMount')
    //   this.setState({transcripts: this.props.stepsStorage})
    // }
    // else {
    //   this.setState({transcripts: []})
    // }
  }

  componentWillUnmount() {
    // TODO how avoid this warning in devtools :
    // Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    // console.log('here in unmount')
    // // this.props.abortListening();
    // console.log('this.props.listening', this.props.listening)
  }

  // TODO refactor into Steps.js?? how to deal with stepIndex??
  editStepToListening(stepIndex) {
    // map over stepsToSuccess to avoid altering state directly
    let n = stepIndex; // n is argument - change

    // state to be updated as steps

    // make copy of array so not mutating directly
    // need to change a particular element in the state array

    let listWithOneElementListening = [...this.state.transcripts];
    listWithOneElementListening[stepIndex - 1] = "Listening...";

    this.setState({
      transcripts: listWithOneElementListening,
      editing: true
    });
    this.props.resetTranscript();
  }

  addStep() {
    // DUMMY SO NO NEED TO SPEAK:
    // this.getSteps();
    if (this.props.finalTranscript.length > 1) {
      this.setState(
        {
          transcripts: [...this.state.transcripts, this.props.finalTranscript]
        },
        () => {
          this.getSteps();
        }
      );
      this.props.resetTranscript();
    }
  }

  // Delete clickTick?? Tick.js has local state
  clickTick(i) {
    console.log("i", i);
    let updatedState = [...this.state.tickClicked];
    if (updatedState[i] === undefined || updatedState[i] === "false") {
      updatedState[i] = "true";
    } else {
      updatedState[i] = "false";
    }
    this.setState({ tickClicked: updatedState });
    circleColor = this.state.tickClicked[i] ? "circleTicked" : "circle";
  }

  setLocalStorage() {
    localStorage.setItem(`steps`, this.state.transcripts);
  }

  // set local storage with state.transcripts
  // but not onmount because state.transcripts is empty

  getSteps() {
    this.setLocalStorage();
  }

  changeStep(stepIndex) {
    let newTranscripts = [...this.state.transcripts];
    newTranscripts[stepIndex + 1] = this.props.finalTranscript;
    // this.setState({ transcripts: newTranscripts }, () => this.change());
    this.setState({ transcripts: newTranscripts }, () => this.getSteps());
    this.setState({ editing: false });
    this.props.resetTranscript();
  }

  componentDidUpdate(prevProps) {
    if (this.props.finalTranscript !== prevProps.finalTranscript) {
      if (this.props.finalTranscript.slice(0, 11) === "change step") {
        // could use speech api Grammar object instead?
        let transcriptIndex = this.getEndWord(this.props.finalTranscript);
        this.editStepToListening(transcriptIndex);
      } else {
        // check whether an element in transcripts state array is 'Listening...'
        // if it is, don't want to call addStep but change the particular element which is 'Listening...'
        let index;

        if (this.state.transcripts === undefined) {
          this.addStep();
        } else if (
          this.state.transcripts.find((element, i) => {
            index = i;
            return element === "Listening...";
          }) &&
          this.props.finalTranscript !== ""
        ) {
          this.changeStep(index - 1);
        } else {
          this.addStep();
        }
      }
    }
  }

  getEndWord(transcript) {
    let n = transcript.split(" ");
    let index = n[n.length - 1];

    if (index === "to") {
      index = 2;
    }
    return index;
  }

  // put in number argument to editStepToListening() ... how to get that to changeStep()??
  // get substring of end of props.finalTranscript - put that into variable to pass into
  // changeStep() and editStepToListening()...

  // need to get index of array state.transcripts - map
  // could use switch statement...
  // compare to voice...

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

  clearAllSteps() {
    this.setState({transcripts: []})
  }

  render() {
    // DUMMY SO NO NEED TO SPEAK:
    // this.addStep();
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

    //change below...

    if (this.state.play) {
      display = (
        <div className={this.state.show ? "" : "hidden"}>
          Say your steps to success
        </div>
      );
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

    let steps;

    // if (this.state.trancripts === undefined) {
    //   steps = null;
    // } else {
    steps = (
      <Steps
        transcripts={this.state.transcripts}
        onClick={i => this.clickTick(i)}
      />
    );
    // }

    return (
      <div>
        <Button
          className={this.props.finalTranscript ? "" : "hidden"}
          onClick={resetTranscript}
        />
        {this.props.listening ? <RecordingText /> : <Paused />}
        <ol className="flex">{steps} </ol>

        <Button onClick={this.clearAllSteps}>Clear All</Button>
        <Button>Done</Button>
        {this.props.listening ? (
          <StopRecordingButton onClick={stopListening} />
        ) : (
          <RecordButton onClick={startListening} />
        )}

        <style jsx>
          {`
            ol {
              counter-reset: steps;
            }

            .hidden {
              display: none;
            }
            .flex {
              flex-direction: column;
              display: flex;
              list-style-type: decimal;
            }
          `}
        </style>
        <style jsx>{`
          margin-top: 20px;
        `}</style>
      </div>
    );
  }
}

// Dictaphone.propTypes = propTypes

export default SpeechRecognition(options)(SpeechToText);
