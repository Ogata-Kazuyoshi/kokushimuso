// console.log(bacefook.newsfeed);

window.addEventListener("load", () => {
  // This is a check to see if there's a username stored
  let username = localStorage.getItem("username");
  if (!username) {
    // Prompt for one if a username isn't found
    username = window.prompt("What is your name?");
    localStorage.setItem("username", username);
  }

  const containerEl = document.querySelector("#newsfeed");

  // This makes things appear
  for (let index = bacefook.newsfeed.length - 1; index >= 0; index--) {
    const post = bacefook.newsfeed[index];

    const resultDate = getDateString(post.timestamp);
    const resultFeeling = post.feeling;
    console.log(resultDate);
    const friendEl = document.createElement("div");
    friendEl.className = "friend";
    friendEl.innerText = `${post.friend}  ${resultDate} ${resultFeeling}`;

    const postEl = document.createElement("div");
    postEl.innerText = post.text;
    postEl.append(friendEl);

    containerEl.append(postEl);
  }
});
