# Get Repository Global Node ID action

This action gets the
[global node ID](https://docs.github.com/en/graphql/guides/using-global-node-ids)
of the specified GitHub repository.

It can be used in other actions, to make calls to the
[GitHub GraphQL API](https://docs.github.com/en/graphql/overview/public-schema).

Note that the global node ID of a repository is not the same as its repository
ID (i.e.,
[`GITHUB_REPOSITORY_ID`](https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables)).

## Inputs

### `repository`

A repository to get its ID. Default `${{ github.repository }}`.

### `token`

GitHub token. Defaults `${{ github.token }}`.

## Outputs

### `repo-id`

The global node ID of the specified repository.

## Example usage

```yaml
- name: Get global node ID
  id: get-repo-id
  uses: nvdaes/get-repository-id@v1
  with:
    repository: owner/repo

- name: Print Output
  id: output
  run: echo "${{ steps.get-repo-id.outputs.repo-id }}"
```
