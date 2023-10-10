/*
  This generates our fake newsfeed information.

  There is no need to touch the code in here until you get to basic requirement #4,
  but please check it out to familiarize yourself beforehand.
*/
(() => {
  window.bacefook = {};
  bacefook.newsfeed = [];
  bacefook.friends = {};
  bacefook.friendNames = ["tamaroh", "kani", "eriko", "tsubasa", "masataka"];
  bacefook.friendNames.forEach((name) => {
    bacefook.friends[name] = [];
  });
  // friends = {
  //   tamaroh: [],
  //   kani: [],
  //   eriko: [],
  // };

  const getRandomElement = (array) => {
    // Given an array, returns a random element
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  const starters = [
    "totally just",
    "just",
    "completely",
    "waaaaah! i",
    "i just",
    "a salaryman",
    "a salaryman",
    "yesterday I",
    "a ninja",
    "my boss",
  ];
  const verbs = [
    "ate",
    "drank",
    "threw up in",
    "refactored",
    "iterated on",
    "thought about",
    "threw up on",
    "saw",
    "walked to",
    "got lost in",
    "walked into",
    "googled",
    "drove",
    "ran to",
    "worked on",
    "slept on",
    "slept in",
  ];
  const fillers = [
    "my",
    "your",
    "his",
    "her",
    "my favorite",
    "a beautiful",
    "a delicious",
    "that",
    "this",
    "an interesting",
    "",
    "the best",
    "the greatest",
    "a delightful",
  ];
  const nouns = [
    "DIG",
    "restaurant",
    "omakase",
    "hitomedia",
    "family mart",
    "private jet",
    "mama",
    "lawsons",
    "conbini",
    "whisky",
    "onigiri",
    "car",
    "food",
    "house",
    "toilet",
    "tokyo",
    "city",
    "iphone",
    "google",
    "unicorn",
    "mess",
    "pirate ship",
    "ninja",
  ];
  const hashtags = [
    "#DIG",
    "#techlife",
    "#toyota",
    "#tokyo",
    "#japan",
    "#interesting",
    "#til",
    "#lol",
    "#tgifriday",
    "#hashtags",
    "#japanlife",
    "#oops",
    "",
  ];
  const feelings = [
    "happy",
    "smug",
    "lovestruck",
    "gross",
    "scared",
    "tired",
    "angry",
    "frustrated",
    "excited",
    "",
  ];
  const images = [];

  const generateRandomText = () => {
    return [
      getRandomElement(starters),
      getRandomElement(verbs),
      getRandomElement(fillers),
      getRandomElement(nouns),
      getRandomElement(hashtags),
    ].join(" ");
  };

  const generatePostObj = (timeOffset) => {
    // if an offset is provided, make the timestamp that much older, otherwise just use the current time
    // console.log(timeOffset);
    const timestamp = timeOffset
      ? new Date(new Date().getTime() - timeOffset)
      : new Date();
    // console.log(timestamp);
    return {
      friend: getRandomElement(bacefook.friendNames),
      text: generateRandomText(),
      feeling: getRandomElement(feelings),
      image: getRandomElement(images),
      timestamp,
    };
  };

  const addPost = (obj) => {
    const friend = obj.friend;
    bacefook.friends[friend].push(obj);
    bacefook.newsfeed.push(obj);
  };

  const createPost = (timeOffset) => {
    const newPost = generatePostObj(timeOffset);
    addPost(newPost);
  };

  for (let i = 0; i < 10; i++) {
    // make the starting posts look like they were posted over the course of the past day
    const timeOffset = (2 * (10 - i) + Math.random()) * 60 * 60 * 1000;
    createPost(timeOffset);
  }

  const scheduler = () => {
    createPost(null);
    const newFeed = bacefook.newsfeed[bacefook.newsfeed.length - 1];
    const newDate = newFeed.timestamp;
    const reasultDate = getDateString(newDate);
    const resultFeeling = newFeed.feeling;
    const containerEl = document.querySelector("#newsfeed");
    const friendEl = document.createElement("div");
    const imageElm = document.createElement("img");
    imageElm.src = "./images/image4.jpeg";
    imageElm.alt = "麻雀";
    friendEl.className = "friend";
    friendEl.innerText = `${newFeed.friend}  ${reasultDate}  ${resultFeeling}`;

    const postEl = document.createElement("div");
    postEl.innerText = newFeed.text;
    postEl.append(friendEl);

    containerEl.prepend(postEl);
    setTimeout(scheduler, (3 + Math.random() * 5) * 1000); // generate a new post every 3 to 8 seconds
  };

  scheduler();
})();
