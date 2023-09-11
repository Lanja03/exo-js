import './style.css'

const fetchPokemon = async () => {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?fbclid=IwAR3UJ1lptFqWZHwQQLVLTiHm-22GHvi9-FDKuFCYLwmUODYunSTzTuf9x_4")
    const userPokemon = await res.json();
    return await userPokemon.results;
  } catch (err) {
    console.error(err);
  }
}
const app = document.querySelector("#app")

const search = document.createElement("div")
search.classList.add("search")
app.appendChild(search)


const inputText = document.createElement("input")
search.appendChild(inputText)

const btn = document.createElement("button")
search.appendChild(btn)
btn.textContent = `Search`
btn.addEventListener('click', async (e) => {
  app.removeChild(cardContenair)
  const val = document.querySelector("input").value;
  console.log(val);
  const infoUser = document.createElement("p")
  infoUser.classList.add("name")
  infoUser.textContent = `${allPookemon[i].name}`
  search.appendChild(infoUser)
})

const cardContenair = document.createElement("div")
cardContenair.classList.add("card-container")
app.appendChild(cardContenair)

const allPookemon = await fetchPokemon();
const createCard = async () => {
  for (let i = 0; i < allPookemon.length; ++i) {
    const card = document.createElement("div")
    card.classList.add("card-user")
    cardContenair.appendChild(card)
    const text = document.createElement("p")
    text.textContent = `name:${allPookemon[i].name}`
    card.appendChild(text)


  }
}

const userDetails = async () => {

}
userDetails();
createCard();
console.log(allPookemon);



