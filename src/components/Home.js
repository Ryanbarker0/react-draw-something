import React from 'react'


export default class Home extends React.Component {
    
    render() {
        return(
            <div>
                <button onClick={this.props.navigateGuestCreate}>
                    Create Game
                </button>
                <br/>
                <button onClick={this.props.navigateGuestPlay}>
                    Play Game
                </button>
            </div>
        )
    }

}