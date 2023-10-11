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
  const resultSec = resultMmsec / 1000;

  return resultSec;
}

function postFeedHtml() {
  for (let index = 0; index < bacefook.newsfeed.length; index++) {
    const newFeed = bacefook.newsfeed[index];
    const reasultDate = newFeed.timestamp;
    const calcDiff = calcDiffDate(reasultDate);
    const resultFeeling = newFeed.feeling;
    const containerEl = document.querySelector("#newsfeed"); //articleタグそのもの

    const stage = document.createElement("article");
    stage.className = "showArea__main--article";
    //名前ようDivタグを追加。
    const friendEl = document.createElement("div");
    friendEl.className = "showArea__main--frined";
    // friendEl.innerText = `${newFeed.friend}  ${reasultDate}  ${resultFeeling}`;
    friendEl.innerText = `NAME : ${newFeed.friend}`;
    stage.append(friendEl);
    //タイムスタンプ用のタグを追加
    const timeEl = document.createElement("div");
    timeEl.className = "showArea__main--date";
    timeEl.innerText = `POSTED : ${calcDiff} sec ago.`;
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
    //thumsUpタグを追加 `<i class="fa-regular fa-thumbs-up fa-2x" data-btn="${i}"></i>`
    const thmsUpElm = document.createElement("div");
    thmsUpElm.className = "showArea__main--thumsup";
    thmsUpElm.innerHTML = `<i class="fa-regular fa-thumbs-up fa-2x" "></i>`;
    stage.append(thmsUpElm);

    containerEl.prepend(stage);
  }
}
