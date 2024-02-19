## Prelude

The following task is a great opportunity to show us your experience, style, and the way you work - and impress us with your skills and knowledge. Familiarize yourself with the information below, set up the development environment, and once everything is up and running, click on the link labeled "Start Assignment" at the bottom or navigate to `TASK.md`.

## Environment requirements: 

```json
{
  "node": ">= 18.0 < 19",
  "npm": ">= 9.5"
}
```

In addition to running the application locally, this repository supports `devcontainers`. If you are experiencing some problems with your local node installation, using devcontainers should give you much more reliable results.

## Description
The application should display a list of moods provided by the API and allow a user to search, paginate, and submit their current mood. The current mood can consist of max three emotions, e.g. "Happy", "Excited", "Proud".

<p align="center"><img src="./.github/screen-1.png" width="750px" /></p>

## General advice

- You can take a look around the project and change every part of it, but all the tasks can be achieved by:
  - Modifying the [`App.tsx`](./frontend/src/App.tsx) 
  - Creating and modifying files in [`/components`](./frontend/src/components/), [`/src`](./frontend/src/) folders.
- We advise you to do the tasks in order, most of them build upon each other.

## Before you start

Install the dependencies with npm
```cmd
npm i
```

Start the dev server with the frontend application:
```cmd
npm run dev
```

After that, the server should be running at: http://localhost:5173/


Now, you can choose a form of the backend API that you want you use while completing the assignment:

<details>
<summary><strong>With REST:</strong></summary>
<p></p>
<p>Start the REST server with command:</p>


```cmd
npm run serve:rest
```
</details>

<details>
<summary><strong>With GraphQL:</strong></summary>
<p></p>
<p>Start the GraphQL server with command:</p>


```cmd
npm run serve:graphql
```
</details>

## Final notes

- We prefer a more straightforward solution relying on pure `react` than one depending on many external tools and libraries.

- You can use README to write down your thoughts that you may have had while completing the task. You can present your point of view or explain your thought process. 

- Please provide a copy of the checklist from [TASK.MD](./TASK.md) and mark the implemented points.

- Please make sure that there are no console errors or bugs. It's better if some point is not delivered than if the implementation is buggy or incomplete.


<p align="center"><a href="./TASK.MD"><strong>Start assignment</strong></a></p>

## Delivery

You can use GitHub, BitBucket, GitLab, or anything you want, but you need to maintain your repository as private. Do not share our task or your solution in any way such as a public repo.
Compress the task in a .bundle file. We want to have the entire git history. The easiest way is to run:
```cmd
git bundle create your-name.bundle --all
```
Be sure to use `.gitignore` and not include, for example, `node_modules` inside your .bundle file.
