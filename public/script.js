fetch("/getGame").then(async res => {
  console.log(await res.text());
});