const RecordButton = ({onClick}) => {

    // click startListening

    return (
        <button onClick={onClick}>Record
               <style jsx>{`
          button {
            padding: 20px;
            background: #4286f4;
            color: #FFF;
            font-size: 16px;
          }
          @media (max-width: 768px) {
            button {
                background: #4286f4;
            }
          }
          .large {
            padding: 50px
          }
       `}</style>
        </button>
    )
}

export default RecordButton;