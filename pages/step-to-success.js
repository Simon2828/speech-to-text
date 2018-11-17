import Head from 'next/head'
import Layout from '../components/Layout.js'
import MobileMenu from '../components/MobileMenu.js'
import Header from '../components/Header.js'
import NoSSR from 'react-no-ssr';
import LoadingIndicator from '../components/LoadingIndicator.js'
import SpeechToText from '../components/SpeechToText'
import LearningObjective from '../components/LearningObjective.js'



class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            mobileMenu: true, 
            recording: false
        }
        this.toggleMenu = this.toggleMenu.bind(this);
    }


    toggleMenu() {
        this.setState({ mobileMenu: !this.state.mobileMenu })
    }

    render() {
        let mobileMenu = this.state.mobileMenu ? '-hidden' : ''
        return (
            <div>
                <Header toggleMenu={this.toggleMenu} />
                <Layout>
                    <MobileMenu hidden={mobileMenu} toggleMenu={this.toggleMenu} />
                    <NoSSR onSSR={<LoadingIndicator />}>  
                        <SpeechToText />                   
                    </NoSSR>
                </Layout>
                <LearningObjective>
                    Learning Objective
                </LearningObjective> 
            </div>
        )
    }
}

export default Index