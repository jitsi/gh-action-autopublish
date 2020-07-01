# gh-action-autopublish

GitHub Action for automated npm version bumpping and publishing of packages.

This Action bumps the version in package.json and push it back to the repo. In addition
it will release the new package on npm.

It is meant to be used on every successful merge to master but you need to configure that workflow yourself.

## Thanks

This package started out as an adaptation of [gh-action-bump-version](https://github.com/phips28/gh-action-bump-version)
to better suit our needs.
