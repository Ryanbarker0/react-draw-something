import React from 'react'


export default class Home extends React.Component {
    
    render() {
        const { username, navigateUserDraw } = this.props

        return(
            <div align='center'>
            { username ? 
                <div>
                    <div className="logo">
                        <img src={this.props.pencilLogo} width='200'/>
                    </div>
                    <div className="app-name-font">
                        <h2>Sketch</h2>
                    </div>
                    <div className="sub-heading-font">
                        <p>Challenge a friend to a game!</p><p>Craft a masterpiece, send it to a friend, have them guess what the drawing is then have them draw something and send it back to you!</p>
                    </div>
                    <button onClick={navigateUserDraw}>Start New Game</button>
                </div>
                :
                <div>
                    <div className="logo">
                        <img src={this.props.pencilLogo} width='200'/>
                    </div>
                    <div className="app-name-font">
                        <h2>Sketch</h2>
                    </div>
                    <div className="sub-heading-font">
                        <p>Sign in to challenge a friend to a game!</p><p>Craft a masterpiece for someone else to guess or try your luck at guessing someone else's drawing!</p>
                    </div>
                    <div className='buttons-container'>
                        <button className="btn-main" onClick={this.props.navigateGuestCreate}>
                            Create Game
                        </button>
                        <button className="btn-main" onClick={this.props.navigateGuestPlay}>
                            Play Game
                        </button>
                    </div>
                </div>
            
            }
            </div>
        )
    }

}