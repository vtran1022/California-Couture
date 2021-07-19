# FEC
Front End Capstone for Hack Reactor

## Getting a Copy of the Repo
If you haven't already, fork the repository on GitHub and clone your newly created repo down to your computer.

## Set Repo as Remote Upstream
After you fork, set this repo as an upstream with `git remote add upstream hhttps://github.com/Bug-Busters-HRSJO/FEC.git`

## Pull From Upstream Master Daily
Before you begin coding for the day, pull from the upstream main branch with `git pull upstream main`.

## How to Run
Navigate to the root directory of FEC, then install the required packages by running `npm install` in your terminal. To begin, first compile the client-side files by running `npm run react-dev`, then start the server by running `npm run server`. Lastly, navigate to `http://localhost:3000` in your browser.

## Opening a PR
When you're ready to merge your fork with FEC:Main, open a PR, wait for a review, then merge when approved.

## To Resolve a Conflict

### Manual Option
Pull from your upstream or main, depending on where the conflict is happening. Next, checkout your working branch and run `git merge upstream main` to merge the main branch with your main branch. Then, resolve the merge conflicts on your local machine. Finally, push your changes and open a new PR.

### Rebasing Option
Fetch all branches of remote upstream with `git fetch upstream`. Next, rewrite your main with upstream’s main using `git rebase upstream/main`. Then, push your updates to main. You may need to force the push with “--force”. `git push origin main --force`. Lastly, open up a new PR.
