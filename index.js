function displayResult() {
    const input = document.getElementById("boardgame-searchfield").value;
    if (input) {
        hideSearchDropdown();
        // Remove previous results from display
        let parent = document.getElementById("api-spot");
        empty(parent);
        
        lookupUserInput()
        .then((response) => {
            const gameData = response;
            console.log("game data: ", gameData); // TODO: remove this log before deploying
            
            const apiDiv = document.querySelector("#api-spot");
            const inputVal = document.getElementById("boardgame-searchfield").value;
            const header = document.createElement("h2");
            header.innerText = `Results for "${inputVal}":`;
            
            apiDiv.appendChild(header);
            
            // Display results of game search in dropdown menu
            for (let i = 0; i < gameData.games.length; i++) {
                console.log(gameData.games[i].name); // TODO: remove this log before deploying
                const option = gameData.games[i].name;
                const addOption = document.createElement("p");
                addOption.innerText = option;
                apiDiv.appendChild(link(option, gameData.games[i].url));
            }
            
            // Clear search form
            document.getElementById("boardgame-search").reset();
            
            showSearchDropdown();
        })
        .catch((error) => console.error(error));
    }
}

function lookupUserInput() {
  const game = document.getElementById("boardgame-searchfield").value;
  return fetch(
    `https://api.boardgameatlas.com/api/search?name=${game}&client_id=83BzRHUpD7`
  )
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => console.error(error));
}

function empty(element) {
    element.replaceChildren();
}

// manage search dropdown visibility
showSearchDropdown = () =>
document.getElementById("search-dropdown").classList.add("show");
hideSearchDropdown = () =>
document.getElementById("search-dropdown").classList.remove("show");
// hide search dropdown if user clicks away
window.onclick = function(e) {
    if (!e.target.matches(".dropdown-content")) {
        hideSearchDropdown();
    }
}

// create text links - used for search dropdown
function link(text, href) {
  let a = document.createElement("a");
  a.textContent = text;
  a.href = href;
  return a;
}

function main() {
  const userClick = document.getElementById("user-submission");
  const userEnter = document.getElementById("boardgame-searchfield");

  userClick.addEventListener("click", displayResult);

  userEnter.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      displayResult();
    }
  });
}

main();
