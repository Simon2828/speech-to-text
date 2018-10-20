import SpeechRecognition from 'react-speech-recognition'
import { PropTypes } from 'react'
import RecordButton from './RecordButton'
import StopButton from './StopButton'

// const propTypes = {
//     // Props injected by SpeechRecognition
//     // transcript: PropTypes.string,
//     resetTranscript: PropTypes.func,
//     browserSupportsSpeechRecognition: PropTypes.bool
// }

const options = {
    autoStart: false
}

// use stoplistening after time period of quiet?
// or stop listening on click - change record button to stop onclick - or have stop button
// how to access transcript / finished transcript and save into steps to success



class SpeechToText extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            play: true,
            speech: ''
        }
        this.speechRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        console.log('this.speechRef', this.speechRef)
        this.setState({
             play: !this.state.play, 
            })

    }

    render() {
        const { transcript, resetTranscript, browserSupportsSpeechRecognition, startListening, stopListening } = this.props

        if (!browserSupportsSpeechRecognition) {
            return null
        }
        let button;


        if (this.state.play) {
            button = <RecordButton onClick={()=>{startListening();this.handleClick();}}>Record</RecordButton>
        }
        else {
            button = <StopButton onClick={(e)=>{stopListening();this.handleClick(e);}}>Stop</StopButton>
        }


        return (
            <div>
                {button}
                <button onClick={resetTranscript}>Reset</button>
                <div ref={this.speechRef}>{transcript}</div>
            </div >

        )
    }
}

// Dictaphone.propTypes = propTypes

export default SpeechRecognition(options)(SpeechToText)