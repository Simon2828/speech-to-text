import React, { Component } from "react";
import { LoConsumer } from "./LearningObjectiveProvider";
import Link from 'next/link';

class Lo extends Component {



  handleSubmit(event) {
    event.preventDefault();
  }


  render() {
    return (
      <div>
        <LoConsumer>
          {({ state, handleChange }) => (
            <div>
              <p>hi I'm {state.lO}</p>
              <form onSubmit={this.handleSubmit}>
                <label>
                  Learning Objective:
                  <input
                    type="text"
                    // value={this.state.value}
                    onChange={handleChange}
                  />
                </label>
                <Link href="/step-to-success">
                    
                <input type="submit" value="Submit" />
                </Link>
              </form>
            </div>
          )}
        </LoConsumer>
      </div>
    );
  }
}
export default Lo;
