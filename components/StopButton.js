const StopButton = ({ onClick }) => {
    return (
        <button onClick={onClick} className='hidden'>Save to step to success
            <style jsx>{`
          button {
            padding: 20px;
            background: #6842f4;
            color: #FFF;
            font-size: 16px;
          }
          @media (max-width: 768px) {
            button {
                background: green;
            }
          }
          .hidden {
            display: none;
          }
       `}
            </style>
        </button>
    )
}

export default StopButton;