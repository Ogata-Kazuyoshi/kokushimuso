// console.log(bacefook.newsfeed);

// console.log(moment().format());

const userManagement = {
  taka: "1234",
  ogata: "5678",
};

const imgPath = {};

const userArray = Object.keys(userManagement);
userArray.forEach((elm) => {
  imgPath[elm] = `./images/user/${elm}.png`;
});

window.addEventListener("load", () => {
  // This is a check to see if there's a username stored
  let username = localStorage.getItem("username");

  const authentification = () => {
    // Prompt for one if a username isn't found
    username = window.prompt("What is your name?");

    if (!userManagement[username]) {
      window.alert("ユーザーが登録されていません！");
      authentification();
    } else {
      userPass = window.prompt("What is your password?");
      if (userPass !== userManagement[username]) {
        window.alert("パスワードが違います！");
        authentification();
      }
    }
    localStorage.setItem("username", username);
  };
  if (!username) {
    authentification();
  }

  // <img class="showArea__nav--img" src="images/user/ogata.png" alt="#" />
  //navタグの描写
  const navElm = document.querySelector("#usernav");
  const userImg = document.createElement("img");
  userImg.src = imgPath[username];
  userImg.alt = "userImage";
  userImg.className = "showArea__nav--img";
  navElm.prepend(userImg);

  const userNameElm = document.querySelector("#user-name");
  userNameElm.innerText = username;
  //asideタグの描写
  const asideElm = document.querySelector("#asideWrap");
  bacefook.friendNames.forEach((elm) => {
    const friendElm = document.createElement("div");
    friendElm.innerText = elm;
    friendElm.className = "showArea__aside--friend";
    asideElm.append(friendElm);
  });

  const getRandomElement = (array) => {
    // Given an array, returns a random element
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };
  const images = [
    "./images/image1.png",
    "./images/image2.png",
    "./images/image3.png",
    "./images/image4.png",
    "./images/image5.png",
  ];

  // This makes things appear
  for (let index = 0; index < bacefook.newsfeed.length; index++) {
    postFeedHtml(bacefook.newsfeed[index]);
  }
  //addEvent for submit form
  const btn = document.querySelector("#btn");
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    const textElm = document.querySelector("#input-text");
    const text = textElm.value;
    const feelingElm = document.querySelector("#input-feeling");
    const feeling = feelingElm.value;
    console.log(text);
    const newUserPost = {
      friend: username,
      text: text,
      feeling: feeling,
      image: getRandomElement(images),
      timestamp: getDateString(new Date()),
    };

    bacefook.friends[username] = [];
    bacefook.friends[username].push(newUserPost);
    bacefook.newsfeed.push(newUserPost);
    // console.log(newUserPost);
    console.log(bacefook.newsfeed);

    // const containerEl = document.querySelector("#newsfeed"); //articleタグそのもの
    // containerEl.innerHTML = "";
    postFeedHtml(newUserPost, true);

    textElm.value = "";
    feelingElm.value = "";
  });
});
