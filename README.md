## Prelude

The following task is a great opportunity to show us your experience, style, and the way you work and impress us with your skills and knowledge.

## General advice:

- You can take a look around the project and change every part of it, but all the tasks can be achieved modifying only the `App.tsx` and files in `/components` folder.
- We advice you too do the tasks in order, most of them built upon each other.

## Description

## Starting 
Before you start coding:

Start dev server with frontend application run:
```cmd
npm run dev
```

<details>
<summary><strong>With REST:</strong></summary>
<p></p>
<p>To start the REST server run:</p>


```cmd
npm run serve:rest
```
</details>

<details>
<summary><strong>With GraphQL:</strong></summary>
<p></p>
<p>To start the GraphQL server run:</p>


```cmd
npm run serve:graphql
```
</details>


## Checklist

- [ ] Fetch and render a list of "mood cards" in the [`Moods`](./src/components/Moods.tsx) component. To accomplish this, utilize the [`Card`](./src/ui/Card.tsx) component from the `ui` folder and provided API


<details>
<summary><strong>REST API:</strong></summary>
<p></p>

**URL:**


_GET_ request should be send to http://localhost:4000/api/moods

**Types:**

Types for the REST response can be found in [./src/types/rest/index.ts](./src/types/rest/index.ts)

**Example response**


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
<p></p>

> To run `<App />` in GraphQL mode go to [./src/main.tsx](./src/main.tsx) and change `Root` to `<Root type="graphql">`

**URL:**

Send query request to http://localhost:4000/graphql

**Types:**

Types for the GraphQL response can be found in [./src/types/graphql/index.ts](./src/types/graphql/index.ts)

**Example response**


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

--- 

- [ ] Limit the number of displayed mood cards to 3. You can achieve this by calling the API with appropriate variables:

<details>
<summary><strong>REST API:</strong></summary>
<p></p>

Add query parameter to url `limit=3`.
</details>

<details>
<summary><strong>GraphQL API:</strong></summary>
<p></p>

Add query variable `{"limit": 3}`.
</details>

---

- [ ] Ensure that the search input is focused when the page when you enter the page.

---

- [ ] Implement pagination functionality. The `Navigation` component should have two optional props: `onNext` and `onPrevious`. Add appropriate handles to alow user to: 

  - [ ] By clicking "Next" view next 3 moods. This should increase the limit by 3 and skip by 3. 

  - [ ] By clicking "Previous" view previous 3 moods. This should decrease limit by 3 and skip by 3.

<details>
<summary><strong>REST API:</strong></summary>
<p></p>

Extend query variables by adding `&skip=3`.
</details>

<details>
<summary><strong>GraphQL API:</strong></summary>
<p></p>

Extend query variables by adding `{"skip": 3}`.
</details>

---

- [ ] Add search functionality. Without impacting the previous functionality. When a user types something into the search input, we should make an API call and display the results accordingly.

<details>
<summary><strong>REST API:</strong></summary>
<p></p>

Request variables should be set to `?limit=3&search="<search_query>"`
</details>

<details>
<summary><strong>GraphQL API:</strong></summary>
<p></p>

Query variables should be set to `{"limit": 3, "search": "<search_query>"}"`
</details>

---

- [ ] Add the ability to select "mood cards" using the `isSelected` and `onSelect` props of the `Card` component. The selection state should remain unaffected by searching and navigation.

---

- [ ] Implement the functionality to send selected "moods" to our API. Utilize the `onSend` prop from the `Footer` component in the `App` component.
