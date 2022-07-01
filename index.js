const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
    const url = req.url;
    const file = url === "/" ? "index.html" : `${url.split("/")[1]}.html`;
    const page404 = fs.readFileSync("404.html", "utf-8", (err, data) => {
        if (err) throw err;
        return data;
      });

    fs.readFile(file, "utf-8", (err, data) => {
        if(err) {
            res.statusCode = 404;
            res.write(page404);
        }else{
            res.writeHead(200, {
                "Content-Type": "text/html",
            });
            res.write(data);
        }
        res.end();
    })
}).listen(8080);