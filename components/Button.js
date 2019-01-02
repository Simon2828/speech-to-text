const Button = (props) => (
    <button onClick={props.onClick} className={props.className}>
       { props.children }
       <style jsx>{`
          button {
            padding: 20px;
            background: #6842f4;
            color: #FFF;
            font-size: 16px;
            cursor: pointer;
          }
          @media (max-width: 768px) {
            button {
                background: #6842f4;
            }
          }
          .hidden {
            display: none;
          }
       `}</style>
    </button>
  )

  export default Button;