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

let stepsToSuccess;
let newTranscripts;

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

  componentDidUpdate(prevProps) {
    if (stepsToSuccess.length > 1) {
      console.log("stepsToSuccess", stepsToSuccess);
      if (stepsToSuccess[0].props.children[0].props.children) {
        console.log("B");
        if (
          stepsToSuccess[0].props.children[0].props.children === "Listening..."
        ) {
          let newTranscripts = [...this.state.transcripts];
          newTranscripts[0] = this.props.finalTranscript;
          console.log("here in dasfsa");

          // lots of empty elements in array - need to stop setting state unless updated

          this.setState({ transcripts: newTranscripts });
        }
      }
    }

    if (this.props.finalTranscript !== prevProps.finalTranscript) {
      if (this.props.finalTranscript.slice(0, 11) === "change step") {
        console.log("heree");
        this.editStep();
        return;
      }
      this.setState({ show: false });
      this.setState({
        transcripts: [...this.state.transcripts, this.props.finalTranscript]
      });
      this.props.resetTranscript();
      if (!this.props.transcript) {
        this.setState({ show: !this.state.show });
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

    stepsToSuccess = this.state.transcripts.map(step => {
      return (
        <React.Fragment>
          <div>{step}</div>
          <Tick className={step ? "visible" : "hidden"} />
        </React.Fragment>
      );
    });

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
