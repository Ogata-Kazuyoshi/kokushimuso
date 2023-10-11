const thumbsUpMove = (elm) => {
  const removeMove = () => {
    elm.classList.remove("fa-bounce");
  };
  setTimeout(removeMove, 2000);
};

const clickHandler = (e) => {
  // console.log(e.target);
  const index = e.target.dataset.btn;
  // console.log(index);
  const thumbsUpElm = document.querySelector(`[data-btn="${index}"]`);
  const totThmsElm = document.querySelector(`[data-article="${index}"]`);
  const totText = totThmsElm.querySelector("label");
  // console.log(totText);
  if (thumbsUpElm.classList.contains("fa-regular")) {
    thumbsUpElm.classList.remove("fa-regular");
    thumbsUpElm.classList.add("fa-solid");
    thumbsUpElm.classList.add("fa-bounce");
    thumbsUpElm.style = "color: #e0d900;";
    const temp = `あなた、他${String(totText.innerText)} 人`;
    totText.innerText = temp;
    thumbsUpMove(thumbsUpElm);
  } else {
    thumbsUpElm.classList.remove("fa-solid");
    thumbsUpElm.classList.add("fa-regular");
    thumbsUpElm.style = "color: #000000;";
    const temp = `${totText.innerText.slice(5, 7)}`;
    totText.innerText = temp;
  }
};

function formatTime(i) {
  /* 1桁の場合 */
  if (i < 10) {
    /* 先頭を0埋め */
    i = "0" + i;
  }
  return i;
}

function getDateString(newDate) {
  //2018-01-01 17:35:22
  const year = newDate.getFullYear();
  const month = formatTime(newDate.getMonth() + 1);
  const day = formatTime(newDate.getDate());
  const hour = formatTime(newDate.getHours());
  const min = formatTime(newDate.getMinutes());
  const sec = formatTime(newDate.getSeconds());
  //   return h + ":" + m + ":" + s;

  return `${year}-${month}-${day} ${hour}:${min}:${sec}`;

  //console.log("h :", h, "m: ", m, "s: ", s);
}

function calcDiffDate(postedDate) {
  const nowTime = new Date();
  const nowDate = getDateString(nowTime);
  const dateTo = moment(postedDate);
  const dateFrom = moment(nowDate);
  const resultMmsec = dateFrom.diff(dateTo);
  let result = resultMmsec / 1000;
  let returnText = `${result} sec ago.`;
  if (result >= 60) {
    result = Math.floor(result / 60);
    returnText = `${result} min ago.`;
    if (result >= 60) {
      result = Math.floor(result / 60);
      returnText = `${result} hour ago.`;
      if (result >= 24) {
        result = Math.floor(result / 24);
        returnText = `${result} day ago.`;
        if (result >= 3) {
          //2018-01-01 17:35:22
          returnText = postedDate.slice(0, 10);
        }
      }
    }
  }

  return returnText;
}

const changeTimestamp = (index, recalcuDate) => {
  const articleElm = document.querySelector(`[data-article="${index}"]`);
  const timestampElm = articleElm.querySelector(".showArea__main--date");
  timestampElm.innerText = `POSTED : ${recalcuDate}`;
};

let postCnt = 0;

function postFeedHtml(newFeed) {
  const reasultDate = newFeed.timestamp;
  const calcDiff = calcDiffDate(reasultDate);
  const resultFeeling = newFeed.feeling;
  const goodNum = newFeed.goodNum;
  const containerEl = document.querySelector("#newsfeed"); //articleタグそのもの

  const stage = document.createElement("article");
  stage.className = "showArea__main--article";
  stage.dataset.article = postCnt;

  //名前ようDivタグを追加。
  const friendEl = document.createElement("div");
  friendEl.className = "showArea__main--frined";
  // friendEl.innerText = `${newFeed.friend}  ${reasultDate}  ${resultFeeling}`;
  friendEl.innerText = `NAME : ${newFeed.friend}`;
  stage.append(friendEl);
  //タイムスタンプ用のタグを追加 最初の１０個の投稿の際には、普通に作る。追加のものが来た際には、タイムスタンプの部分だけHtmlを書き換える
  const timeEl = document.createElement("div");
  timeEl.className = "showArea__main--date";
  timeEl.innerText = `POSTED : ${calcDiff}`;
  stage.append(timeEl);
  //テキスト用のタグを追加
  const txtEl = document.createElement("div");
  txtEl.className = "showArea__main--txt";
  txtEl.innerText = newFeed.text;
  stage.append(txtEl);
  //Feeling用のタグを追加
  const feelEl = document.createElement("div");
  feelEl.className = "showArea__main--feeling";
  feelEl.innerText = resultFeeling;
  stage.append(feelEl);
  //写真用のタグを追加
  const imgWrapEl = document.createElement("div");
  imgWrapEl.className = "showArea__main--image";
  const imageElm = document.createElement("img");
  imageElm.src = newFeed.image;
  imageElm.alt = "麻雀";
  imgWrapEl.append(imageElm);
  stage.append(imgWrapEl);
  //thumsUpの合計値を描写
  const totThums = document.createElement("div");
  totThums.className = "showArea__main--totthums";
  totThums.innerHTML = `<i class="fa-solid fa-thumbs-up fa-2xs" style="color: #00b3ff;" ></i>`;
  const totLabel = document.createElement("label");
  totLabel.className = "showArea__main--totText";
  totLabel.innerText = goodNum;
  totThums.append(totLabel);
  stage.append(totThums);

  //thumsUpタグを追加 `<i class="fa-regular fa-thumbs-up fa-2x" data-btn="${i}"></i>`
  const thmsUpElm = document.createElement("div");
  thmsUpElm.className = "showArea__main--thumsup";
  thmsUpElm.innerHTML = `<i class="fa-regular fa-thumbs-up fa-lg" data-btn="${postCnt}"></i>`;
  postCnt++;
  stage.append(thmsUpElm);
  stage.addEventListener("click", clickHandler);

  containerEl.prepend(stage);
}
