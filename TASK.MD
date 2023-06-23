## Checklist

- [ ] Fetch and render a list of "mood cards" in the [`Moods`](./src/components/Moods.tsx) component. To accomplish this, utilize the [`Card`](./src/ui/Card.tsx) component from the [`ui`](./src/ui/) folder and fetch the data from provided API


<details>
<summary><strong>REST API:</strong></summary>
<p></p>

**Request:**


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

**Request:**

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

- [ ] Implement pagination functionality. The [`Navigation`](./src/ui/Navigation.tsx) component should have two optional props: `onNext` and `onPrevious`. Add appropriate handles to alow user to: 

  - [ ] By clicking "Next" display 3 next moods from API (increase the `limit` by 3 and `skip` by 3)

  - [ ] By clicking "Previous" display 3 previous moods from API (decrease `limit` by 3 and `skip` by 3)

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

- [ ] Add search functionality. Without impacting the previous functionality. When user types something into the search input, we should make an API call and display the results accordingly.

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

- [ ] Add the ability to select "mood cards" using the `isSelected` and `onSelect` props of the [`Card`](./src/ui/Card.tsx) component. The selection state should remain unaffected by searching and navigation.

---

- [ ] Implement the functionality to send selected "moods" to our API. Utilize the `onSend` prop from the `Footer` component in the `App` component.

<details>
<summary><strong>REST API:</strong></summary>
<p></p>

Send POST request to http://localhost:4000/api/moods/current with `{body: { moodIds: [] }}` of selected moods in the request body. 
</details>


<details>
<summary><strong>GraphQL API:</strong></summary>
<p></p>

Send mutation with selected moods ids `saveCurrentMoods(moodsIds: [ID!]!)` to http://localhost:4000/graphql 
</details>
