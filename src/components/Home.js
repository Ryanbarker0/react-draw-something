import React from 'react'


export default class Home extends React.Component {
    
    render() {
        const { username } = this.props

        return(
            <div>
            { username ? 
                <div>
                    <button onClick={this.props.navigateGuestCreate}>Start New Game</button>
                </div>
                :
            <div>
                <button onClick={this.props.navigateGuestCreate}>
                    Create Game
                </button>
                <br/>
                <button onClick={this.props.navigateGuestPlay}>
                    Play Game
                </button>
            </div>
            
            }
        </div>
        )
    }

}