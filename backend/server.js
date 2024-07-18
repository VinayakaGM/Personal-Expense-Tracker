import http from "http";
import app from "./app.js";
const PORT = process.env.PORT;

const server = http.createServer(app);

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server is running on port ${PORT}`);
});


