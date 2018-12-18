const layoutStyle = {
  margin: 20,
  padding: 20,
  minHeight: 100
};

const LearningObjective = props => {
  return (
    <div>
      <div style={layoutStyle}>
        {props.children}
        
      </div>
    </div>
  );
};

export default LearningObjective;

// put in animation to change to listening then back to say your learning objective...
