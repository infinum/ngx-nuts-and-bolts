# Contributing to ngx-nuts-and-bolts

We would love for you to contribute to ngx-nuts-and-bolts library to make it better than it is today!
In the following chapters is the short workflow of how you can contribute to this project.

## <a name="issue"></a> Found a Bug?

If you find a bug in the source code or the functionality itself, you can help us by [submitting an issue](#submit-issue) to our [GitHub Repository][github].
After which you can, you can [submit a Pull Request](#submit-pr) with a fix if you feel like contributing.

### <a name="submit-issue"></a> Submitting an Issue

Before you submit an issue, please check if an issue for your problem might already exist and the discussion might inform you of workarounds readily available.

We want to fix all the issues as soon as possible, but before fixing a bug, we need to reproduce and confirm it.
In order to reproduce bugs, we require that you provide a minimal reproduction.
Having a minimal reproducible scenario gives us a wealth of important information without going back and forth to you with additional questions.

A minimal reproduction allows us to quickly confirm a bug (or point out a coding problem) as well as confirm that we are fixing the right problem.

## Missing a feature?

You can request adding a new feature to the library by starting a new discussion in the discussions tab, where you can outline the problem your requested feature would solve. Ideally, you would already have a solution in mind which you can describe in the discussion. Based on the discussion of the new feature and if team members agree that it will be useful and reusable, a new issue will be created. Development will start and, finally, a new pull request will be created.

## Coding rules

To ensure consistency throughout the source code, keep these rules in mind as you are working on implementation of a new feature or a bugfix:

- All features or bug fixes must be tested by one or more specs (unit-tests).

- All features must be documented by adding a new `.md` file in an appropriate folder inside of the `ngx-nuts-and-bolts-docs` project.

- All features that interact directly with or affect the UI should also have an accompanying `.stories.ts` file.

### Writing documentation

After you've added a new feature into the library, steps to add corresponding documentation are as follows:

1. Add related `README.md` file inside of the `docs` folder in the `ngx-nuts-and-bolts-docs` project.
2. Edit `sidebar.js` file and add a new object which will be used in building sidebar navigation.

After your pull request is merged, documentation will be built via github action and after successfull build available at [github-pages][github-pages]

[github]: https://github.com/infinum/ngx-nuts-and-bolts
[github-pages]: https://infinum.github.io/ngx-nuts-and-bolts/
