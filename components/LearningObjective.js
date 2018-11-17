const layoutStyle = {
  margin: 20,
  padding: 20,
  border: "1px solid #DDD",
  height: 200
};

const LearningObjective = (props) => {
  return (
    <div>
      <div style={layoutStyle}>{props.children}</div>
    </div>
  );
};

export default LearningObjective;
