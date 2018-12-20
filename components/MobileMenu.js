import {LoConsumer} from './LearningObjectiveProvider';

const MobileMenu = () => (
    
    // if hidden 
    // display: none;

<LoConsumer>
    {({state})=> (


    <div className={state.mobileMenu ? `mobile-menu-hidden` : `mobile-menu`}>
        hey
        <style jsx>{`
        .mobile-menu {
            background-color: #fff;
            box-shadow: 0 2px 0 0 rgba(0,161,218,0.004), 0 4px 3px 0 rgba(0,0,0,0.1);
            color: #a9afbd;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -webkit-flex-direction: column;
            -ms-flex-direction: column;
            flex-direction: column;
            height: calc(100vh - 50px);
            width: 320px;
            overflow-y: auto;
            position: fixed;
            right: 0;
            top: 50px;
            z-index: 1000;
        }
        
        .mobile-menu-hidden {
            display: none;
        }
        `}</style>
    </div>
    )}
    </LoConsumer>
)

export default MobileMenu