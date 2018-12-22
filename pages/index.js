import Layout from "../components/Layout.js";
import Link from "next/link";

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Layout />
        <div className="flex-container">
        <h4 className='slogan'>
          If you can say it, you can write it.
        </h4>
        <Link href="/learning-objective">
          <a>Create a new Learning Objective</a>
        </Link>
        <p>or</p>
        <Link href="/search">
        <a>Search for a Learning Objective</a>
        </Link>
        <style jsx>{`
            .flex-container {
                flex-direction: column;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .slogan {
              margin-bottom: 40px;
            }
            `
        }</style>
        </div>
      </div>
    );
  }
}

export default Index;
