import SpeechRecognition from 'react-speech-recognition'
import {PropTypes} from 'react'

// const propTypes = {
//     // Props injected by SpeechRecognition
//     // transcript: PropTypes.string,
//     resetTranscript: PropTypes.func,
//     browserSupportsSpeechRecognition: PropTypes.bool
// }

const options = {
    autoStart: false
  }

class SpeechToText extends React.Component {
    render() {
        const { transcript, resetTranscript, browserSupportsSpeechRecognition, startListening } = this.props

        if (!browserSupportsSpeechRecognition) {
            return null
        }

        return (
            <div>
                <button onClick={startListening}>Record</button>
                <button onClick={resetTranscript}>Reset</button>
                <span>{transcript}</span>
            </div>
        )
    }
}

// Dictaphone.propTypes = propTypes

export default SpeechRecognition(options)(SpeechToText)