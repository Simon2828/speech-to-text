import SpeechRecognition from "react-speech-recognition";
import { PropTypes } from "react";
import RecordButton from "./RecordButton";
import StopButton from "./StopButton";
import Button from "../components/Button";
import Tick from "../components/Tick";
import { runInThisContext } from "vm";

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
      transcripts: [],
      editing: false
    };
    this.speechRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  componentWillUnmount() {
    this.props.stopListening();
  }

  // problem how to edit step from previous part in array
  // issue with props of undefined - setState and check with that...

  // make more modular - functions for updating stepstosuccess
  // addStep()   editStepToListening()  need something for when listening for edit...
  // if clause in component didupdate if editSteptolistening called - set state editing - boolean
  // changeStep() - called if editStepToListening has been called above state is set

  // if editing state true
  //  changeStep()
  // if editing state false
  //  check if finaltranscript is 'change step x'
  //    editStepToListening()
  //  else addStep()

  //when to reset finaltranscript - do it at end of each function...
  // but don't call componentdidupdate
  // check for whether finaltranscript is empty but had problems with this before...

  editStepToListening() {
    // map over stepsToSuccess to avoid altering state directly
    let n = 0; // n is argument - change

    steps = this.state.transcripts.map((step, i) => {
      if (i === n) {
        step = "Listening...";
      }
      return (
        <React.Fragment key={i}>
          <li key={i}>{step}</li>
          <Tick className={step ? "visible" : "hidden"} />
        </React.Fragment>
      );
    });

    this.state.transcripts[0] = "Listening..."; // change to number variable...
    this.setState({
      transcripts: [...this.state.transcripts],
      editing: true
    });
    this.props.resetTranscript();
  }

  addStep() {
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

  getSteps() {
    steps = this.state.transcripts.map((step, i) => {
      return (
        <React.Fragment key={i}>
          <li key={i}>{step}</li>
          <Tick className={step ? "visible" : "hidden"} />
        </React.Fragment>
      );
    });
    return steps;
  }

  change() {
    steps = this.state.transcripts.map((step, i) => {
      if (step === "Listening...") {
        step = this.props.finalTranscript;
      }
      return (
        <React.Fragment key={i}>
          <li key={i}>{step}</li>
          <Tick className={step ? "visible" : "hidden"} />
        </React.Fragment>
      );
    });
  }

  changeStep() {
    let newTranscripts = [...this.state.transcripts];
    newTranscripts[0] = this.props.finalTranscript; // change to number argument
    this.setState({ transcripts: newTranscripts }, () => this.change());

    this.setState({ editing: false });
    this.props.resetTranscript();
    return steps;
  }

  componentDidUpdate(prevProps) {
    if (this.props.finalTranscript !== prevProps.finalTranscript) {
      if (this.state.editing && this.props.finalTranscript !== "") {
        this.changeStep(); // put in number for argument for el in array
      } else {
        if (this.props.finalTranscript.slice(0, 11) === "change step") {
          this.editStepToListening();
        } else {
          this.addStep();
        }
      }
    }
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

  editStep() {
    console.log("finaltrans", this.props.finalTranscript);
    switch (this.props.finalTranscript) {
      case "change step 1":
        console.log("1");
        // update state of transcripts
        newTranscripts = [...this.state.transcripts];
        newTranscripts[0] = "Listening...";
        this.setState({ transcripts: newTranscripts });
        this.props.resetTranscript();
        break;
      case "change step 2":
        console.log("2");
        break;
      case "change step 3":
        console.log("3");
        break;
    }
    this.props.resetTranscript();
  }

  // when to rerecord
  // in componentdidupdate
  // if stepstosuccess[0] is 'Listening...
  // set state of transcripts to 0 using same technique as in editstep - spread operator

  reRecordStep() {
    console.log("in rerecord");
    if (this.props.finalTranscript) {
      // update state
      console.log("in rerecord true");
      const updatedTranscripts = [...this.state.transcripts];
      updatedTranscripts[0] = this.props.finalTranscript;
      console.log("updatedTranscrips[0]", updatedTranscripts[0]);
    } else {
      console.log("in else");
      this.reRecordStep();
    }
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

    return (
      <div>
        <Button
          className={this.props.finalTranscript ? "" : "hidden"}
          onClick={resetTranscript}
        >
          Reset
        </Button>
        <h4>Steps to Success</h4>
        <span>{steps}</span>

        <style jsx>{`
          margin-top: 20px;
        `}</style>
      </div>
    );
  }
}

// Dictaphone.propTypes = propTypes

export default SpeechRecognition(options)(SpeechToText);
