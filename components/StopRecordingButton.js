const StopRecordingButton = ({ onClick }) => {
    // click startListening
  
    return (
      <button onClick={onClick}>
        <i className="icon-record">
          <svg
            width="42"
            height="42"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="42" height="42" fill="white" />
            <circle cx="21" cy="21" r="21" fill="#F44040" />
            <rect x="12" y="14" width="16" height="13" rx="3" fill="white" />
          </svg>
        </i>
        <style jsx>{`
          button {
            background-color: transparent;
            border: 0;
          }
  
          .icon-record {
              position: absolute;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0;
            padding: 0;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background-color: #f44040;
            box-sizing: border-box;
            transition: background-color 0.2s, opacity 0.2s, transform 0.2s;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
            transition: all 0.2s ease-in-out;
            position: absolute;
            top: 170px;
            left: 385px;
          }
  
          .icon-record:hover {
            transform: scale(1.1);
          }
        `}</style>
      </button>
    );
  };
  
  export default StopRecordingButton;
  