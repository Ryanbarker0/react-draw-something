class API {
    static login(user) {
        return fetch('http://localhost:3001/api/v1/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }).then(resp => resp.json())
    }

    static validate() {
        return fetch('http://localhost:3001/api/v1/validate', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('username')
            },
        }).then(resp => resp.json())
    }

    createGuestGame = gameObj => 
        fetch('http://localhost:3001/api/v1/guest_games', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(gameObj)
        }).then(resp => resp.json())

    getGuestGame = () => 
        fetch('http://localhost:3001/api/v1/guest_games')
            .then(resp => resp.json())

}

export default API