import Layout from '../components/Layout.js'
import NoSSR from 'react-no-ssr';
import LoadingIndicator from '../components/LoadingIndicator.js'
import SpeechToText from '../components/SpeechToText'
import { DateToday } from '../components/DateToday.js';
import { LoConsumer } from "../components/LearningObjectiveProvider";



class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            recording: false,
            learningObjective: ''
        }
    }


    render() {
        return (
            <div>
                <Layout>
                    <DateToday />
                    <LoConsumer>
                        {({state})=><h4>L.O. {state.value}</h4>}
                    </LoConsumer>
                    <NoSSR onSSR={<LoadingIndicator />}>  
                <SpeechToText />                 
                    </NoSSR>
                </Layout>
            </div>
        )
    }
}

export default Index