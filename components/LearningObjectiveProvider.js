import React, { Component } from 'react';

// first we will make a new context
const LoContext = React.createContext();

// Then create a provider Component
class LearningObjectiveProvider extends Component {

  state = {
      lO: 'write sentences',
      value: '',
      mobileMenu: true
    };



  render() {
    return (
      <LoContext.Provider
        value={{
          state: this.state,
          handleChange: (event) => {
            console.log('event.target.value', event.target.value)
            this.setState({value: event.target.value})
          
          },
          toggleMenu: () => {
            console.log('here')
            this.setState({mobileMenu : !this.state.mobileMenu})
          }
        }}
      >
        {this.props.children}
      </LoContext.Provider>
    );
  }
}

// then make a consumer which will surface it
const LoConsumer = LoContext.Consumer;

export default LearningObjectiveProvider;
export { LoConsumer };