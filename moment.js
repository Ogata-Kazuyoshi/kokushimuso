function formatTime(i) {
  /* 1桁の場合 */
  if (i < 10) {
    /* 先頭を0埋め */
    i = "0" + i;
  }
  return i;
}

function getDateString(newDate) {
  const h = newDate.getHours();
  const m = formatTime(newDate.getMinutes());
  const s = formatTime(newDate.getSeconds());
  //   return h + ":" + m + ":" + s;

  return `${h}:${m}:${s}`;

  //console.log("h :", h, "m: ", m, "s: ", s);
}
