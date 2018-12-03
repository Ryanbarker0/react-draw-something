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

    static get(url) {
        return fetch(url, {
            headers: {
                'Authorization': localStorage.getItem('token')
            },
        }).then(resp => resp.json())
    }
}

export default API