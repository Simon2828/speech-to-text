import React, { Component } from "react";
import { LoConsumer } from "./LearningObjectiveProvider";
import Link from "next/link";
import Button from "./Button";

class WriteLo extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    console.log('here')
    localStorage.removeItem("steps");
  }

  render() {
    return (
      <div>
        <LoConsumer>
          {({ state, handleChange }) => (
            <div>
              <form>
                <label>
                  Learning Objective:
                  <input
                    type="text"
                    value={state.value}
                    onChange={handleChange}
                  />
                </label>
                <Link href="/step-to-success">
                  <a>
                    <Button onClick={this.handleSubmit}>Create</Button>
                  </a>
                </Link>
              </form>
            </div>
          )}
        </LoConsumer>
        <style jsx>{`
          input[type="text"] {
            padding: 5px;
            border: 2px solid #ffe564;
            border-radius: 5px;
            width: 90%;
            height: 7vh;
            margin-top: 20px;
            font-size: 22px;
          }

          input[type="text"]:focus {
            border-color: #333;
          }

          input[type="submit"] {
            padding: 5px 15px;
            background: #ffe564;
            border: 2px solid #ffe564;
            cursor: pointer;
            border-radius: 5px;
            margin-left: 20px;
            height: 7vh;
            font-size: 16px;
          }
        `}</style>
      </div>
    );
  }
}
export default WriteLo;
