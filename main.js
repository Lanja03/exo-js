import './style.css'
import { createBtn } from './utlis/createBtn';
import { createInput } from './utlis/createInput';
import { postUser } from './utlis/postUsers';
import { put } from './utlis/updateUser';
import { deleteUser } from './utlis/delete';
//https://reqres.in/api/users?page=1
//recuperation de donne
//1fetch api
//2end-point
//3initialisation/affectation variable
//affichage partie front
//1dom,data feched
let allUsers = null;
let name = "";
let email = "";
let avatar = "";
const fetchUsers = async () => {
    try {
        const res = await fetch("http://localhost:4400/users")
        //const userdata = await res.json();
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}


function createForm(user) {
    const form = document.createElement("form")
    const app = document.querySelector('#app')
    const inputImage = createInput('file', 'file', 'input-img');
    const inputName = createInput('Name', 'text', 'input-name');
    const inputAvatar = createInput('avatar', 'text', 'input-avatar');
    const inputEmail = createInput('Email', 'email', 'input-email');
    const profilContainer = document.createElement('div')
    profilContainer.classList.add("profil")
    const infoContainer = document.createElement('div')
    infoContainer.classList.add("info")

    profilContainer.appendChild(inputImage)

    infoContainer.appendChild(inputName)
    infoContainer.appendChild(inputEmail)
    infoContainer.appendChild(inputAvatar)

    form.appendChild(profilContainer)
    form.appendChild(infoContainer)
    app.appendChild(form)
    const submit = document.createElement("div")
    submit.classList.add("submit")
    app.appendChild(submit)
    const save = createBtn(user ? "save" : "creat", "submit")
    save.classList.add('save')
    submit.appendChild(save)
    save.addEventListener('click', async (e) => {
        e.preventDefault();
        if (user) {
            await put(user.id, { name, email, avatar })
        } else {
            await postUser({
                name, email, avatar
            })
        }
        app.removeChild(form);
        name = "";
        email = "";
        avatar = "";
        await createCard();
    })
    const cancel = createBtn("cancel", "button")
    cancel.classList.add('cancel')
    submit.appendChild(cancel)
    cancel.addEventListener('click', () => {
        app.removeChild(form);
        createCard();
    })
    inputName.addEventListener('input', (e) => {
        name = e.target.value;
    })
    inputEmail.addEventListener('input', (e) => {
        email = e.target.value;
    })
    inputAvatar.addEventListener('input', (e) => {
        avatar = e.target.value
    })
    if (user) {
        inputName.value = user.name
        name = user.name
        inputEmail.value = user.email
        email = user.email
        inputAvatar.value = user.avatar
        avatar = user.avatar
    }
}


const createCard = async () => {
    // if (!allUsers) {
    //     await fetchUsers();
    // }
    allUsers = await fetchUsers();

    const app = document.querySelector("#app")
    const cardContenair = document.createElement("div")
    cardContenair.classList.add("card-container")
    for (let i = 0; i < allUsers.length; ++i) {
        const card = document.createElement('div')
        card.classList.add("card")

        const editIconContainer = document.createElement('div')
        editIconContainer.id = allUsers[i].id;

        editIconContainer.classList.add('edit-icon-container')
        editIconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
            <path d="M16 5l3 3"></path>
        </svg>`;

        const suprime = document.createElement("div")
        suprime.id = allUsers[i].id;
        suprime.classList.add('trash')
        suprime.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M4 7l16 0"></path>
        <path d="M10 11l0 6"></path>
        <path d="M14 11l0 6"></path>
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
     </svg>`



        const avatar = document.createElement('img')
        avatar.setAttribute("src", allUsers[i].avatar)
        const fullName = document.createElement("p")
        fullName.textContent = `${allUsers[i].name}`
        const email = document.createElement("p")
        email.textContent = allUsers[i].email
        card.id = allUsers[i].id;
        card.appendChild(avatar)
        card.appendChild(fullName)
        card.appendChild(email)
        card.appendChild(editIconContainer)
        card.appendChild(suprime)

        cardContenair.appendChild(card)

        card.addEventListener('click', async (e) => {
            app.removeChild(cardContenair);
            const user = await fetchUser(e.target.id);
            showUserDetails(user)
        });

        card.addEventListener('mouseover', () => {
            editIconContainer.classList.add('hover');
        })

        card.addEventListener('mouseleave', () => {
            editIconContainer.classList.remove('hover')
        })
        card.addEventListener('mouseover', () => {
            suprime.classList.add('hover');
        })

        card.addEventListener('mouseleave', () => {
            suprime.classList.remove('hover')
        })

        editIconContainer.addEventListener('click', async (e) => {
            e.stopPropagation();
            console.log(e.target.id);
            const user = await fetchUser(e.target.id);
            console.log(user);
            app.removeChild(cardContenair);
            createForm(user);
        })
        suprime.addEventListener('click', async (e) => {
            e.stopPropagation();
            const deletedUser = await deleteUser(e.target.id);
            app.removeChild(cardContenair);
            await createCard();
        })
    }

    app.appendChild(cardContenair)
    const btn = createBtn("create", 'button');
    //console.log(btn);
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
    const appContainer = document.createElement("div")
    app.appendChild(appContainer)
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


