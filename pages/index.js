class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = ''
    } 
    onStart() {
        this.setState({
            recording: true
        });
        if(this.props.onStart) {
            this.props.onStart();
        }
        speechToTextUtils.initRecording((data) => {
            // NEED TO PASS IN PROPS.ONUPDATE...//
            // USE REACT NO SSR?? //

            if(this.props.onUpdate) {
                this.props.onUpdate(data);
            }   
        }, (error) => {
            console.error('Error when recording', error);
            this.setState({recording: false});
            // No further action needed, as this already closes itself on error
        });
    }
    
    onStop() {
        this.setState({recording: false});
        speechToTextUtils.stopRecording();
        if(this.props.onStop) {
            // NEED TO PASS IN PROPS.ONSTOP...//
            this.props.onStop();
        }
    }

    render() {
        return (
            <div>hi world</div>
        )
    }
}
  
  export default Index