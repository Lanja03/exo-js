import './style.css'
import { createBtn } from './utlis/createBtn';
import { createInput } from './utlis/createInput';
//https://reqres.in/api/users?page=1
//recuperation de donne
//1fetch api
//2end-point
//3initialisation/affectation variable
//affichage partie front
//1dom,data feched
let allUsers = null;

const fetchUsers = async () => {
    try {
        const res = await fetch("http://localhost:4400/users")
        const userdata = await res.json();
        allUsers = await userdata;
    } catch (err) {
        console.error(err);
    }
}


function createForm() {
    const form = document.createElement("form")
    const app = document.querySelector('#app')
    const inputImage = createInput('file', 'file', 'input-img');
    const inputName = createInput('Name', 'text', 'input-name');
    const inputEmail = createInput('Email', 'email', 'input-email');
    const profilContainer = document.createElement('div')
    profilContainer.classList.add("profil")
    const infoContainer = document.createElement('div')
    infoContainer.classList.add("info")

    profilContainer.appendChild(inputImage)

    infoContainer.appendChild(inputName)
    infoContainer.appendChild(inputEmail)

    form.appendChild(profilContainer)
    form.appendChild(infoContainer)
    app.appendChild(form)
    const save = createBtn("save", "submit")
    save.classList.add('save')
    app.appendChild(save)
    const cancel = createBtn("cancel", "button")
    cancel.classList.add('cancel')
    app.appendChild(cancel)
    inputName.addEventListener('input', (e) => {
        console.log(e);
    })
}


const createCard = async () => {
    if (!allUsers) {
        await fetchUsers();
    }

    const app = document.querySelector("#app")
    const cardContenair = document.createElement("div")
    cardContenair.classList.add("card-container")
    for (let i = 0; i < allUsers.length; ++i) {
        const card = document.createElement('div')
        card.classList.add("card")
        const avatar = document.createElement('img')
        avatar.setAttribute("src", allUsers[i].avatar)
        const fullName = document.createElement("p")
        fullName.textContent = `${allUsers[i].username}`
        const email = document.createElement("p")
        email.textContent = allUsers[i].email
        card.id = allUsers[i].id;
        card.appendChild(avatar)
        card.appendChild(fullName)
        card.appendChild(email)
        cardContenair.appendChild(card)
        card.addEventListener('click', async (e) => {
            app.removeChild(cardContenair);
            const user = await fetchUser(e.target.id);
            showUserDetails(user)
        });
    }

    app.appendChild(cardContenair)
    const btn = createBtn("create", 'submit');
    console.log(btn);
    app.prepend(btn)
    btn.addEventListener('click', async (e) => {
        app.removeChild(cardContenair);
        createForm()
    })

}
createCard();
const fetchUser = async (idTofetch) => {
    try {
        const res = await fetch(`http://localhost:4400/users/${idTofetch}`)
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}

const showUserDetails = async (user) => {
    const infoUser = document.createElement("div")
    infoUser.classList.add("infoUser")
    const infoContainer = document.createElement("div")
    infoContainer.classList.add("info-container")
    const img = document.createElement("div")
    img.classList.add("image-contenair")
    const imageUser = document.createElement("img")
    imageUser.setAttribute("src", user.avatar)
    img.appendChild(imageUser)

    const userCivil = document.createElement("div")
    userCivil.classList.add("user-civil")

    const name = document.createElement("p")
    name.textContent = `name:${user.name}`
    userCivil.appendChild(name)

    const userename = document.createElement("p")
    userename.textContent = `username:${user.userename}`
    userCivil.appendChild(userename)

    const userEmail = document.createElement("p")
    userEmail.textContent = user.email
    userCivil.appendChild(userEmail)

    const btn = document.createElement("button")
    btn.textContent = "Home"
    userCivil.appendChild(btn)

    infoUser.appendChild(infoContainer)
    infoContainer.appendChild(img)
    appContainer.appendChild(infoUser)
    appContainer.appendChild(userCivil)
    console.log(infoUser);
    btn.addEventListener('click', () => {
        appContainer.removeChild(infoUser);
        appContainer.removeChild(userCivil);
        createCard();
    })

}


