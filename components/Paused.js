// TODO - create another component for when microphone is paused
//          use conditional rendering in SpeechToText.js

const Paused = () => {
    return (
        <div>
<style jsx>{`div:before {
              content: "Recording paused";
              animation-name: listening;
              animation-duration: 2.5s;
              animation-iteration-count: infinite;
            }

            @keyframes listening {
              0% {
                content: "Recording paused";
              }

              25% {
                content: "Recording paused.";
              }

              50% {
                content: "Recording paused..";
              }

              75% {
                content: "Recording paused...";
              }
            }`

}

</style>
        </div>

    );
}

export default Paused;
