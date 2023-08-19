require('dotenv').config()
const inquirer = require('inquirer')
const { OpenAI } = require('langchain/llms/openai');

const model = new OpenAI({ 
  openAIApiKey: process.env.OPENAI_API_KEY, 
  temperature: 0,
  model: 'gpt-3.5-turbo'
});
  
const promptFunc = async (input) => {
  try {
    const res = await model.call(input);
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

const init = () => {
  inquirer.prompt([
    {
      type: 'init',
      name: 'name',
      message: 'Ask a question:'
    }
  ]).then((inquirerResponse) => {
    promptFunc(inquirerResponse.name)
  })
}

init()