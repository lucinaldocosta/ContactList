const { v4: uuidv4 } = require("uuid");
const http = require("http");
const PORT = 5000;

const contatos = [
  { id: 1, nome: "Juan", telefone: "555-123-459" },
  { id: 2, nome: "Pedro", telefone: "555-123-789" },
  { id: 3, nome: "Maria", telefone: "000-324-459" },
  { id: 4, nome: "John", telefone: "555-000-459" },
];
const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }
  if (req.url === "/api/contatos" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(contatos));
  } else if (req.url === "/api/contatos" && req.method === "POST") {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      const contato = JSON.parse(data);
      contato.id = uuidv4();
      contatos.push(contato);
      console.log(contatos);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(contato));
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});
server.listen(PORT, () => {
  console.log(`Servidor escutando no porto ${PORT}`);
});
