const PATH = 'https://nomoreparties.co/v1/wff-cohort-26';
const token = '43f87862-49cb-4a2c-9026-6c20ca8b3795';
const handleResponse = (res) => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

//получаем информацию о профиле
export const getUserInfo = () => { 
    return fetch(`${PATH}/users/me`, {
        headers: {
            authorization: token
        }
    })
    .then(handleResponse)
}

//получаем карточки на стр
export const getAllCards = () => {
    return fetch(`${PATH}/cards`, {
        headers: {
            authorization: token
        }
    })
    .then(handleResponse)
} 

//меняем информацию профиля
export const editUserInfo = (name, job) => {
    return fetch(`${PATH}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: job
        })
    })
    .then(handleResponse)
}

//добавляем новую карточку на сервер
export const createNewCard = (object) => {
    return fetch(`${PATH}/cards`, {
        method: 'POST',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: object.name,
            link: object.link
        })
    })
    .then(handleResponse)
}


//удаляем карточки
export const removeCard = (idCard) => {
    return fetch(`${PATH}/cards/${idCard}`, {
        method: 'DELETE',
        headers: {
            authorization: token,
        },
    })
    .then(handleResponse)
}

//ставим лайк карточке
export const likeCardDev = (idCard) => {
    return fetch(`${PATH}/cards/likes/${idCard}`, {
        method: 'PUT',
        headers: {
            authorization: token,
        },
    })
    .then(handleResponse)
}

//убираем лайк с карточки
export const likeCardDevDel = (idCard) => {
    return fetch(`${PATH}/cards/likes/${idCard}`, {
        method: 'DELETE',
        headers: {
            authorization: token,
        },
    })
    .then(handleResponse)
}

//Обновляем аватарку
export const changeAvatar = (linkAvatar) => {
    return fetch(`${PATH}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: linkAvatar
        })
    })
    .then(handleResponse)
}