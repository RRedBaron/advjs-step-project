class Card {
    constructor(url, token) {
        this.url = url;
        this.token = token;
    }

    async getCardsData() {
        return await fetch(this.url, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            },
        }).then(res => res.json())
    }

    async deleteCardById(cardId) {
        return await fetch(`${this.url}${cardId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${this.token}`
            },
        })
    }

    async createCard(data) {
        return await fetch(this.url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(data)
        })
    }

    async updateCardById(cardId, data) {
        return await fetch(`${this.url}${cardId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(data)
        })
    }
}

