const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const chocolatesData = require('./chocolates.json');

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/chocolates', (req, res) => {
  res.json(chocolatesData);
});

app.post('/api/calculatePrice', (req, res) => {
  const selectedChocolates = req.body.selectedChocolates;
  let totalPrice = 0;

  selectedChocolates.forEach((item) => {
    const chocolate = chocolatesData.find((choco) => choco.id === item.id);
    if (chocolate) {
      totalPrice += chocolate.price * item.quantity;
    }
  });

  res.json({ totalPrice });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
