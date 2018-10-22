import SpeechRecognition from 'react-speech-recognition'
import { PropTypes } from 'react'
import RecordButton from './RecordButton'
import StopButton from './StopButton'
import Button from '../components/Button'
import Tick from '../components/Tick'

// const propTypes = {
//     // Props injected by SpeechRecognition
//     // transcript: PropTypes.string,
//     resetTranscript: PropTypes.func,
//     browserSupportsSpeechRecognition: PropTypes.bool
// }

const options = {
    autoStart: true
}

// use stoplistening after time period of quiet?
// or stop listening on click - change record button to stop onclick - or have stop button
// how to access transcript / finished transcript and save into steps to success


class SpeechToText extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            play: true,
            speech: '',
            show: true
        }
        this.speechRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.handleStop = this.handleStop.bind(this);
    }

    componentDidUpdate(prevProps) {
        console.log('here')
        if (this.props.finalTranscript !== prevProps.finalTranscript) {
            console.log('update')
            console.log('this.props.finalTranscript', this.props.finalTranscript);

            this.setState({ show: false })

            if (!this.props.transcript) {
                this.setState({ show: !this.state.show })
            }

        }
    }


    handleClick(e) {
        this.setState({
            play: !this.state.play,
        })
    }

    handleStop() {
        if (this.props.finalTranscript) {
            sessionStorage.setItem('stepToSuccess', this.props.finalTranscript);
        }


    }


    render() {
        const { transcript, resetTranscript, browserSupportsSpeechRecognition, startListening, stopListening } = this.props

        if (!browserSupportsSpeechRecognition) {
            return null
        } let display;


        if (this.state.play) {
            display = <div className={this.state.show ? '' : 'hidden'}>Say your step to success...
            <style jsx>{`
            .hidden {
                display: none;
            }
            `}</style>
            </div>
            // button = <RecordButton onClick={() => { startListening(); this.handleClick(); }}>Record</RecordButton>
        }
        else {
            display = <StopButton onClick={() => { this.handleStop(); stopListening(); resetTranscript(); }}>Stop</StopButton>
        }

        // when finalTranscript is not empty
        // after pause, let tick come in to see if confirm as step to suc -> save to local
        // have tooltip to show tick will save to step to suc


        // Listening text on componentdidmount?



        // stop listening on componentwillunmount

        // confirm step to success - tick box
        // hide while transcript is empty

        return (
            <div>
                <Button className={this.props.finalTranscript ? '' : 'hidden'} onClick={resetTranscript}>Reset</Button>
                <span>{display}</span>
                <Tick className='hidden'>
                    <style jsx>{`
                    .hidden {
                        display: none
                    }

                    `}
                    </style>
                </Tick>
                <div ref={this.speechRef}>{transcript}
                    <style jsx>{`
                        margin-top: 20px;
                    `
                    }</style>
                </div>
            </div >

        )
    }
}

// Dictaphone.propTypes = propTypes

export default SpeechRecognition(options)(SpeechToText)