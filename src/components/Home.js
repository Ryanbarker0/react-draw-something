import React from 'react'


export default class Home extends React.Component {
    
    render() {
        const { username, navigateUserDraw } = this.props

        return(
            <div align='center'>
            { username ? 
                <div>
                <img src={this.props.pencilLogo} width='200'/>
                <h2>Sketch</h2>
                        <p>Challenge a friend to a game!</p><p>Craft a masterpiece, send it to a friend, have them guess what the drawing is then have them draw something and send it back to you!</p>
                        <br />
                    <button onClick={navigateUserDraw}>Start New Game</button>
                </div>
                :
            <div>
                <img src={this.props.pencilLogo} width='200'/>
                <h2>Sketch</h2>
                <p>Sign in to challenge a friend to a game!</p><p>Craft a masterpiece for someone else to guess or try your luck at guessing someone else's drawing!</p>
                <br />
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