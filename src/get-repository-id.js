/**
 * Function to get the ID of the specified repo
 */
const core = require('@actions/core')
const { graphql } = require("@octokit/graphql");
const { inputHelper } = require('./input-helper')

async function getRepositoryId() {
  const token = core.getInput('token')
  const variables = inputHelper()
  const query = `query($owner:String!, $name:String!) {
    repository(owner:$owner, name:$name){
      id
    }
  }`
  
  const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token `${token}`,
  },
});
  const result = await graphqlWithAuth(query, variables)
  const repoId = result.repository.id
  return repoId
}

module.exports = {
  getRepositoryId
}
