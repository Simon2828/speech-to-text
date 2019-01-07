// TODO - create another component for when microphone is paused
//          use conditional rendering in SpeechToText.js

const RecordingText = () => {
    return (
        <div>
<style jsx>{`div:before {
              content: "Say your Steps to Success";
              animation-name: listening;
              animation-duration: 2.5s;
              animation-iteration-count: infinite;
            }

            @keyframes listening {
              0% {
                content: "Say your Steps to Success";
              }

              25% {
                content: "Say your Steps to Success.";
              }

              50% {
                content: "Say your Steps to Success..";
              }

              75% {
                content: "Say your Steps to Success...";
              }
            }`

}

</style>
        </div>

    );
}

export default RecordingText;
