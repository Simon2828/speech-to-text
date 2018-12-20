import Layout from '../components/Layout.js'
import Link from 'next/link'



class Index extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div>

                <Layout />
                  <h4>If you can say it, you can write it.</h4>
                <Link href="/learning-objective">
                    <a>Choose a Learning Objective to begin</a>
                </Link>
            </div>
        )
    }

}

export default Index