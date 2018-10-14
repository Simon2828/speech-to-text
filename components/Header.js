import Link from 'next/link'
import {mainColor} from '../styles.js'

const linkStyle = {
    marginLeft : 'auto'
}

const Header = ({toggleMenu}) => (
    <div className="flex">
        <Link href="/">
            <a>Steps To Success</a>
        </Link>
            <div onClick={toggleMenu} style={linkStyle}>
                <svg viewBox="0 0 50 50" version="1.1" width="25px" height="25px" fill='green'>
                    <g id="surface1">
                        <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z " />
                    </g>
                </svg>
            </div>
        <style jsx>{`
            .flex {
                display: flex;
                color: red;
                background-color: yellow;
            }
       `}</style>
    </div >
)

export default Header