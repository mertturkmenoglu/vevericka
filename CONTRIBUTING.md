# Contributing to Vevericka

We would love for you to contribute Vevericka and help make it even better than it is today. As a contributor, here are the guidelines we would like you to follow:

## Got a Question?

Feel free to open an issue and tag it with a "question" label. Also, you can use Vevericka Contact page.

## Found a Bug?

If you find a bug in the source code, you can help us by submitting an issue to our GitHub Repository. Even better, you can submit a Pull Request with a fix.

## Missing a Feature?

You can request a new feature by submitting an issue to our GitHub Repository. If you would like to implement a new feature, please submit an issue with a proposal for your work first, to be sure that we can use it. Please consider what kind of change it is:

- For a **Major Feature**, first open an issue and outline your proposal so that it can be discussed. This will also allow us to better coordinate our efforts, prevent duplication of work, and help you to craft the change so that it is successfully accepted into the project.
- **Small Features** can be crafted and directly submitted as a Pull Request.

## Submission Guidelines

### Submitting an Issue

Before you submit an issue, please search the issue tracker, maybe an issue for your problem already exists, and the discussion might inform you of workarounds readily available.

You can file new issues by filling out our new issue form.

### Submitting a Pull Request (PR)

Before you submit your Pull Request (PR) consider the following guidelines:

1. Search GitHub for an open or closed PR that relates to your submission. You don't want to duplicate effort.
2. Fork the repository.
3. Make your changes in a new git branch:

```
git checkout -b my-fix-branch master
```

4. Create your patch, including appropriate test cases.
5. Run the full test suite and ensure that all tests pass
6. Commit your changes using a descriptive commit message that follows common commit message conventions. Adherence to these conventions is necessary.
7. Push your branch to GitHub:

```
git push origin my-fix-branch
```

8. In GitHub, send a pull request to vevericka:master.

- If we suggest changes then:

    - Make the required updates.

    - Re-run the test suites to ensure tests are still passing.

    - Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

  ```
  git rebase master -i
  git push -f
  ```

Thank you for your contribution.

### After your PR is merged

After your pull request is merged, you can safely delete your branch and pull the changes from the main (upstream) repository:

- Delete the remote branch on GitHub either through the GitHub web UI, or your local shell as follows:

```
git push origin --delete my-fix-branch
```

- Check out the master branch:

```
git checkout master -f
```

- Delete the local branch:

```
git branch -D my-fix-branch
```

- Update your master with the latest upstream version:

```
git pull --ff upstream master
```

## Development Setup

You will need Node.js version 14.16.1+.

1. After cloning the repo, run:

```
npm install
```
