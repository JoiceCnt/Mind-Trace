require("dotenv").config();
const jsonServer = require("json-server");
const morgan = require("morgan");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const PORT = process.env.PORT || 5005;

server.use(middlewares);
server.use(morgan("dev"));

// ✅ Habilita CORS
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

server.delete("/appointments/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const db = router.db;

  const found = db.get("appointments").find({ id }).value();

  if (!found) {
    return res.status(404).json({ error: "Appointment not found" });
  }

  db.get("appointments").remove({ id }).write();
  res.status(200).json({ success: true });
});

server.use(router);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
