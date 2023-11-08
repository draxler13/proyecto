const express = require('express');
const app = express();
const port = 4000;

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});



app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});
