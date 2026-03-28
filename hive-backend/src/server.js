const app = require("./app");
const { port } = require("./config");

app.listen(port, () => {
  console.log(`Hive backend listening on http://localhost:${port}`);
});
