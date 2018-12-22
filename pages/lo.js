import {withRouter} from 'next/router'
import Layout from '../components/Layout.js'

const Lo = withRouter((props) => (
    <Layout>
       <h1>{props.router.query.learningObjective}</h1>
       <p>This is the blog post content.</p>
    </Layout>
))

export default Lo