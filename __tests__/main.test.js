/**
 * Unit tests for the action's main functionality, src/main.js
 */
const core = require('@actions/core')
const github = require('@actions/github')
const main = require('../src/main')
const { getRepositoryId } = require('../src/get-repository-id')

// Mock the GitHub Actions core library
const infoMock = jest.spyOn(core, 'info').mockImplementation()
const getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
const setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation()
const setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation()
jest.mock('../src/get-repository-id', () => ({
  getRepositoryId: jest.fn().mockResolvedValue('some-id')
}))

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('calls getRepositoryId', async () => {
    await main.run()
    expect(getRepositoryId).toHaveBeenCalled()
  })

  it('calls setOutput', async () => {
    getRepositoryId.mockResolvedValue('some-id')
    await main.run()
    expect(setOutputMock).toHaveBeenCalledWith('repo-id', 'some-id')
  })

  it('calls setFailed', async () => {
    getRepositoryId.mockResolvedValue(undefined)
    await main.run()
    expect(setFailedMock).toHaveBeenCalled()
  })
})
