async function main() {
  console.log("start");
}

async function start() {
  try {
    await main();
  } catch (error) {
    console.error(error);
  }
}

start();
