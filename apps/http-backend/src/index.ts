
import express from "express";
import {port} from "@repo/utils"

const app = express();

app.get("/", (req, res) => {
    res.json({ msg: "hello turborepo" });
})

app.listen(3001, () => {
    console.log("Server is started in 3001 port");
})