import {LoLink} from '../components/LearningObjectiveLink';
import Layout from '../components/Layout';

// change this to dynamic fetch of data

export default () => (
    <Layout>
        <ul>
        <LoLink id='write-a-poem' learningObjective="Write a poem" />
        </ul>
    </Layout>
)
