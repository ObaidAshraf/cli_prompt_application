require('dotenv').config()
const { OpenAI } = require('langchain/llms/openai');

const model = new OpenAI({ 
  openAIApiKey: process.env.OPENAI_API_KEY, 
  temperature: 0,
  model: 'gpt-3.5-turbo'
});

  
const promptFunc = async () => {
  try {
    const res = await model.call("What color is the sky?");
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

promptFunc()