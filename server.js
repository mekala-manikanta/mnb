const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Your user details
const USER_ID = 'your_full_name_ddmmyyyy';
const EMAIL = 'your_email@example.com';
const ROLL_NUMBER = 'your_roll_number';

app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    
    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: 'Invalid input' });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highestLowercase = alphabets
        .filter(char => char.length === 1 && char.toLowerCase() === char)
        .sort((a, b) => b.localeCompare(a))[0] || [];

    res.json({
        is_success: true,
        user_id: USER_ID,
        email: EMAIL,
        roll_number: ROLL_NUMBER,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : []
    });
});

app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});