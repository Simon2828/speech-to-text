import Tick from "./Tick";

const Steps = (props) => {
    console.log('props', props)
    return props.transcripts.map((step, i) => {
        console.log('step',step)
        return (
            <li key={i}>
              {step}
              <style jsx>{`
                li {
                  background-color: rgb(255, 229, 100, 0.3);
                  margin-bottom: 10px;
                  border-bottom: rgb(255, 229, 100, 1) solid 1px;
                  display: flex;
                  align-items: center;
                }
                li::before {
                  counter-increment: steps;
                  content: counter(steps) ".";
                  margin-right: 20px;
                  padding-left: 5px;
                }
              `}</style>
              <Tick
                key={i}
                className={step ? "visible" : "hidden"}
                onClick={props.onClick}
              />
            </li>
        );
      });
    }

export default Steps;