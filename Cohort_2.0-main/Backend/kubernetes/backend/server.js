import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const PORT = 3000;

app.get('/', (req, res) => {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) {
        sum += i;
    }
    res.send(`Sum of first 1 billion natural numbers is ${sum}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});