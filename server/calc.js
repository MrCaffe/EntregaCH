process.on("message", (quantity) => {
  console.log(quantity);
  const quantityTimes = {};
  for (let i = 0; i < quantity; i++) {
    const number = Math.floor(Math.random() * 1000 + 1);
    if (!quantityTimes[number]) quantityTimes[number] = 0;
    quantityTimes[number]++;
  }
  console.log(quantityTimes);
  process.send(quantityTimes);
  process.exit();
});

process.send("ready");
