import App, { Container } from 'next/app';
import LearningObjectiveProvider from '../components/LearningObjectiveProvider';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
          <LearningObjectiveProvider>
            <Component {...pageProps} />
          </LearningObjectiveProvider>
      </Container>
    );
  }
}

export default MyApp;