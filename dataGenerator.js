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
    "😃happy",
    "😎smug",
    "😍lovestruck",
    "🤮gross",
    "😱scared",
    "😮‍💨tired",
    "😤angry",
    "😑frustrated",
    "😆excited",
    "",
  ];
  const images = [
    "./images/image1.png",
    "./images/image2.png",
    "./images/image3.png",
    "./images/image4.png",
    "./images/image5.png",
  ];

  const generateRandomText = () => {
    return [
      getRandomElement(starters),
      getRandomElement(verbs),
      getRandomElement(fillers),
      getRandomElement(nouns),
      getRandomElement(hashtags),
    ].join(" ");
  };

  const getRandomNum = () => {
    const maxvalue = 100;
    return Math.floor(Math.random() * maxvalue);
  };

  // day = new Date(2018, 8, 10, 03, 30, 20)
  const dateTemp = [
    [2023, 2, 2, 2, 2, 2],
    [2023, 9, 8, 8, 8, 8],
    [2023, 9, 9, 9, 9, 9],
    [2023, 9, 10, 10, 10, 10],
  ];
  // console.log([...dateTemp[0]]);
  // console.log(new Date(...dateTemp[0]));

  for (let i = 0; i < 4; i++) {
    bacefook.newsfeed.push({
      friend: getRandomElement(bacefook.friendNames),
      text: generateRandomText(),
      feeling: getRandomElement(feelings),
      image: getRandomElement(images),
      timestamp: getDateString(new Date(...dateTemp[i])),
      goodNum: getRandomNum(),
    });
  }

  const generatePostObj = (timeOffset) => {
    // if an offset is provided, make the timestamp that much older, otherwise just use the current time
    // console.log(timeOffset);
    const timestamp = timeOffset
      ? new Date(new Date().getTime() - timeOffset)
      : new Date();
    const momentDate = getDateString(timestamp);
    // console.log(timestamp);
    return {
      friend: getRandomElement(bacefook.friendNames),
      text: generateRandomText(),
      feeling: getRandomElement(feelings),
      image: getRandomElement(images),
      timestamp: momentDate,
      goodNum: getRandomNum(),
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

  let initFlg = true;

  const scheduler = () => {
    createPost(null);
    if (!initFlg) {
      // const containerEl = document.querySelector("#newsfeed"); //articleタグそのもの
      // containerEl.innerHTML = "";
      postFeedHtml(bacefook.newsfeed[bacefook.newsfeed.length - 1]);
      //タイムスタンプだけ再度変更しに行く
      for (let i = 1; i < bacefook.newsfeed.length; i++) {
        const postedDate = bacefook.newsfeed[i].timestamp;
        const recalcuDate = calcDiffDate(postedDate);
        changeTimestamp(i, recalcuDate);
      }
    }
    initFlg = false;
    setTimeout(scheduler, (3 + Math.random() * 5) * 1000); // generate a new post every 3 to 8 seconds
  };
  scheduler();
})();
