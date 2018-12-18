import Layout from '../components/Layout.js'
import MobileMenu from '../components/MobileMenu.js'
import Header from '../components/Header.js'
import Link from 'next/link'



class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileMenu: true,
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
                </Layout>
                  <h4>If you can say it, you can write it.</h4>
                <Link href="/step-to-success">
                    <a>Get started!</a>
                </Link>
            </div>
        )
    }

}

export default Index