export const DateToday = () => {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let today  = new Date();
    return (
        <React.Fragment>
            {today.toLocaleDateString('en-GB', options)}
        </React.Fragment>
    );
}

