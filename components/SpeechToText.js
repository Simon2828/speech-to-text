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
let circleColor;
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
      editing: false,
      tickClicked: [],
      transcripts: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.clickTick = this.clickTick.bind(this);
  }

  componentDidMount() {
// TODO on create localstorage rerender steps...not working - have just
// started trying props... maybe try derivedpropsfromstate??

    // if (localStorage.getItem('steps')) {
    //   console.log('in if in componentDidMount')
    //   this.setState({transcripts: localStorage.getItem('steps')}) 
    // } 
    if (this.props.stepsStorage) {
      console.log('in if in componentDidMount')
      this.setState({transcripts: this.props.stepsStorage}) 
    } 
    // else {
    //   this.setState({transcripts: []})
    // }
  }

  // when clicking create, localStorage is cleared
  // steps to success still shown

  componentWillUnmount() {
    // TODO how avoid this warning in devtools :
    // Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    // console.log('here in unmount')
    // // this.props.abortListening();
    // console.log('this.props.listening', this.props.listening)
  }

  

  editStepToListening(stepIndex) {
    // map over stepsToSuccess to avoid altering state directly
    let n = stepIndex; // n is argument - change

    console.log("n", n);

    // state to be updated as steps

    steps = this.state.transcripts.map((step, i) => {
      if (i + 1 === Number(n)) {
        step = "Listening...";
      }
      return (
        <React.Fragment key={i}>
          <li key={i}>
            {step}
            <style jsx>{`
              li {
                background-color: rgb(255, 229, 100, 0.3);
                margin-bottom: 10px;
                display: flex;
              }
            `}</style>
            <Tick
              className={step ? "visible" : "hidden"}
              onClick={this.setState({ tickClicked: !this.state.tickClicked })}
            />
          </li>
        </React.Fragment>
      );
    });

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
    steps = this.state.transcripts.map((step, i) => {
      return (
        <React.Fragment key={i}>
          <li key={i}>
            {step}
            <style jsx>{`
              li {
                background-color: rgb(255, 229, 100, 0.3);
                margin-bottom: 10px;
                border-bottom: rgb(255, 229, 100, 1) solid 1px;
                display: flex;
                align-items: center;
              }
              li::before {
                counter-increment: steps;
                content: counter(steps) ".";
                margin-right: 20px;
                padding-left: 5px;
              }
            `}</style>
            <Tick
              key={i}
              tickClicked={circleColor}
              className={step ? "visible" : "hidden"}
              onClick={() => this.clickTick(i)}
            />
          </li>
        </React.Fragment>
      );
    });
    return steps;
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
          this.addStep()
        }
        else if (
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
        <ol className="flex">{steps}</ol>
        <Button>Done</Button>
        <style jsx>
          {`
            ol {
              counter-reset: steps;
            }

            div:before {
              content: "Say your Steps to Success";
              animation-name: listening;
              animation-duration: 2.5s;
              animation-iteration-count: infinite;
            }

            @keyframes listening {
              0% {
                content: "Say your Steps to Success";
              }

              25% {
                content: "Say your Steps to Success.";
              }

              50% {
                content: "Say your Steps to Success..";
              }

              75% {
                content: "Say your Steps to Success...";
              }
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
