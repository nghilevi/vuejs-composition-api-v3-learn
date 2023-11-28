// cors: able to make cross origin req during dev

import cors from "cors";
import express from "express";
import { Post, thisMonth, thisWeek, today } from "../posts";
import bodyParser from "body-parser";

const app = express()
app.use(cors())
app.use(bodyParser.json())
const allPosts = [today, thisWeek, thisMonth]

app.get('/posts', (_req, res) => {
    res.json(allPosts)
})

app.post<{}, {}, Post>('/posts', (req, res) => {
    const post = {...req.body, id: (Math.random()*100000).toFixed()}
    allPosts.push(post)
    res.json(post)
})

app.listen(8000, () => {
    console.log('listening on port 8000')
})