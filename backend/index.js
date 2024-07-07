const express = require('express');
const { userRouter } = require('./routes/users');
const app = express();
const cors= require('cors')
app.use(express.json());
const port = 3001;
app.use(cors());

app.use('/users', userRouter);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
