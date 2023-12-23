/**
 * Function to get the ID of the specified repo
 */
const core = require('@actions/core')
const github = require('@actions/github')
const { inputHelper } = require('./input-helper')

async function getRepositoryId() {
  const token = core.getInput('token')
  const octokit = github.getOctokit(token, {
    userAgent: 'getRepositoryIdVersion1'
  })
  const variables = inputHelper()
  const query = `query($owner:String!, $name:String!) {
    repository(owner:$owner, name:$name){
      id
    }
  }`
  const result = await octokit.graphql(query, variables)
  const repoId = result.repository.id
  return repoId
}

module.exports = {
  getRepositoryId
}
