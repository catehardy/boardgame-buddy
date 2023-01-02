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

function displayResult() {
  const input = document.getElementById("boardgame-searchfield").value;
  if (input) {
    // Remove previous results from display
    let parent = document.getElementById("api-spot");
    empty(parent);

    lookupUserInput()
      .then((response) => {
        const gameData = response;
        console.log("game data: ", gameData);

        const myDiv = document.querySelector("#api-spot");
        const horizontalRule = document.createElement("hr");
        const inputVal = document.getElementById("boardgame-searchfield").value;
        const header = document.createElement("h2");
        header.innerText = `Results for "${inputVal}":`;

        myDiv.appendChild(horizontalRule);
        myDiv.appendChild(header);

        // Display results of game search
        for (let i = 0; i < gameData.games.length; i++) {
          console.log(gameData.games[i].name);
          const option = gameData.games[i].name;
          const addOption = document.createElement("p");
          addOption.innerText = option;
          myDiv.appendChild(addOption);
        }

        // Clear search form
        document.getElementById("boardgame-search").reset();
      })
      .catch((error) => console.error(error));
  }
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
