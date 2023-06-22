## Prelude

The following task is a great opportunity to show us your experience, style, and the way you work and impress us with your skills and knowledge.

## General guidelines:

- You can take a look around the project and change every part of it, but all the tasks can be achieved modifying only the `App.tsx` and files in `/components` folder.

## Description

## Starting 
Before you start coding:

To start dev server run with frontend application run:
```cmd
npm run dev
```

<details>
<summary><strong>With REST:</strong></summary>
To start the REST server run:


```cmd
npm run serve:rest
```
</details>

<details>
<summary><strong>With GraphQL:</strong></summary>
To start the GraphQL server run:


```cmd
npm run serve:graphql
```
</details>


## Checklist
### Tasks 1

Fetch and render a list of "mood cards" in the [`Moods`](./src/components/Moods.tsx) component. To accomplish this, utilize the [`Card`](./src/ui/Card.tsx) component from the `ui` folder and provided API


<details>
<summary><strong>REST API:</strong></summary>


GET request should be send to http://localhost:4000/api/moods

Types for the REST response can be found in [./src/types/rest/index.ts](./src/types/rest/index.ts)

Example REST response:
```json
{
  "moods": [
    {
      "id": "1a2b3c",
      "emoji": "😊",
      "title": "Happy",
      "description": "Feeling joyful, content, or delighted."
    }
  ],
  "pagination": {
    "limit": "1",
    "count": 40
  }
}
```
</details>

<details>
<summary><strong>GraphQL API:</strong></summary>
To run `<App />` in GraphQL mode go to [./src/main.tsx](./src/main.tsx) and change `Root` to `<Root type="graphql">`

Send query request to http://localhost:4000/graphql

Types for the GraphQL response can be found in [./src/types/graphql/index.ts](./src/types/graphql/index.ts)

Example GraphQL response:
```json
{
  "data": {
    "getMoods": {
      "moods": [
        {
          "description": "Feeling joyful, content, or delighted.",
          "id": "1a2b3c",
          "emoji": "😊",
          "title": "Happy"
        }
      ],
      "pagination": {
        "count": 40,
        "limit": 1,
        "skip": 0
      }
    }
  }
}
```
</details>

- [ ] Limit the number of displayed mood cards to 3. You can achieve this by calling the API with:

  In case of REST the query parameter `limit=3`.
  
  In case of GraphQL the query variable `{"limit": 3}`.

- [ ] Ensure that the search input is focused when the page when you enter the page.

- [ ] Implement pagination functionality. The `Navigation` component should have two optional props: `onNext` and `onPrevious`. 
  - [ ] Clicking on "Next" should increase the limit by 3 and skip by 3. 
  - [ ] Clicking on "Previous" should go back by 3 decrease limit by 3 and skip by 3.

- [ ] Add search functionality. When a user types something into the search input, we should make an API call to `http://localhost:4000/api/moods?limit=3&search={search}` and display the results accordingly.

- [ ] Add the ability to select "mood cards" using the `isSelected` and `onSelect` props of the `Card` component. The selection state should remain unaffected by searching and navigation.

- [ ] Implement the functionality to send selected "moods" to our API. Utilize the `onSend` prop from the `Footer` component in the `App` component.
