const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./connect');
const { Configuration, OpenAIApi } = require('openai');
const Post = require('./models/post');

dotenv.config();
connectDB(process.env.MONGODB_URL);


const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
});
  
const openai = new OpenAIApi(configuration);
  

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));


app.get('/api',function(req,res) {
    Post.find({},(err,allPosts) => {
        res.status(200).json({posts:allPosts});
    });
})

app.post('/api/create',async (req,res) => {
    try {
        const { prompt } = req.body;
    
        const aiResponse = await openai.createImage({
          prompt,
          n: 1,
          size: '1024x1024',
          response_format: 'b64_json',
        });
    
        const image = aiResponse.data.data[0].b64_json;
        res.status(200).json({ photo: image });
    } catch (error) {
        console.error(error);
    }
})
 
app.post('/api/upload',async (req,res) => {
    try {
        const { name, prompt, photo } = req.body;
        const newPost = await Post.create({
          name,
          prompt,
          photo,
        });
        res.status(200).json({ success: true, data: newPost });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
    }
})
 

app.listen(5000,function() {
    console.log('server listening on port' , 5000)
})