// cors: able to make cross origin req during dev

import cors from "cors";
import express from "express";
import { thisMonth, thisWeek, today } from "../posts";

const app = express()
app.use(cors())

app.get('/posts', (_req, res) => {
    res.json([
        today, thisWeek, thisMonth
    ])
})

app.listen(8000, () => {
    console.log('listening on port 8000')
})