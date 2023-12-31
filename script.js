require('dotenv').config()
const inquirer = require("inquirer")
const { OpenAI } = require("langchain/llms/openai");
const { PromptTemplate } = require("langchain/prompts")
const { StructuredOutputParser } = require("langchain/output_parsers");

const model = new OpenAI({ 
  openAIApiKey: process.env.OPENAI_API_KEY, 
  temperature: 0,
  model: 'gpt-3.5-turbo'
});

const parser = StructuredOutputParser.fromNamesAndDescriptions({
  code: "Javascript code that answers the user's question",
  explanation: "explanation upto 10 words only",
});

const formatInstructions = parser.getFormatInstructions();

const promptFunc = async (input) => {
  try {
    const prompt = new PromptTemplate({
      template: "You are a helpful coder. Do not provide examples. Provide only one-line answer containing 10 words covering required function.\n{question}",
      inputVariables: ["question"],
      partialVariables: { format_instructions: formatInstructions },
    })
    
    const promptInput = await prompt.format({
      question: input,
    })

    const res = await model.call(promptInput);
    console.log(await parser.parse(res));
    
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