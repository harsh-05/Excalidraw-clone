import express from "express"

const app = express();

app.get('/', (req, res) => {
    res.json({ msg: "http-backend" });
})


app.listen(3002)