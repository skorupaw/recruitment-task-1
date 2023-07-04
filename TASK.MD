## Checklist

### Base
---

- [ ] Fetch and render a list of "mood cards" in the [`Moods`](./src/components/Moods.tsx) component. To accomplish this, utilize the [`Card`](./src/ui/Card.tsx) component from the [`/ui`](./src/ui/) folder and fetch the data from provided API


<details>
<summary><strong>REST API:</strong></summary>
<p></p>

**Request:**


_GET_ request should be send to http://localhost:4000/api/moods

**Types:**


Types for the REST response can be found in [./src/types/rest.ts](./src/types/index.ts)

**Example response:**


```json
{
    "moods": [
        {
            "id": 1,
            "title": "Happiness",
            "emoji": "😄",
            "description": "A state of being happy or experiencing pleasure.",
            "word": {
                "partOfSpeech": "Noun",
                "definitions": [
                    "The state of being happy.",
                    "A feeling of pleasure or contentment."
                ],
                "pronunciation": "/ˈhæp.i.nəs/"
            }
        }
    ],
    "pagination": {
        "skip": 0,
        "limit": "1",
        "count": 40
    }
}
```
</details>

<details>
<summary><strong>GraphQL API:</strong></summary>
<p></p>
> You can access GraphQL sandbox navigating to: http://localhost:4000

**Request:**

Apollo client is already setup, so you can jump straight in to writing `useQuery` hook.

**Types:**

Types for the GraphQL response can be found in [./src/types/graphql.ts](./src/types/graphql.ts)

**Example response:**


```json
{
  "data": {
    "moods": {
      "moods": [
        {
          "id": "1",
          "emoji": "😄",
          "description": "A state of being happy or experiencing pleasure.",
          "title": "Happiness",
          "word": {
            "definitions": [
              "The state of being happy.",
              "A feeling of pleasure or contentment."
            ],
            "partOfSpeech": "Noun",
            "pronunciation": "/ˈhæp.i.nəs/"
          }
        }
      ],
      "pagination": {
        "skip": 0,
        "limit": 1,
        "count": 40
      }
    }
  }
}
```
</details>

---

- [ ] Ensure that the search input (which can be found in [`App`](./src/App.tsx) component), is focused when the page is reloaded.

---

- [ ] Add the ability to select "mood cards" using the `isSelected` and `onSelect` props of the [`Card`](./src/ui/Card.tsx) component.

---

- [ ] Limit the number of possible mood selections to 3. 

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

- [ ] Implement pagination functionality. The [`Navigation`](./src/ui/Navigation.tsx) component should have two optional props: `onNext` and `onPrevious`. Add appropriate handles to alow user to: 

  - [ ] By clicking "Next" display 3 next moods from API (increase the `limit` by 3 and `skip` by 3)

  - [ ] By clicking "Previous" display 3 previous moods from API (decrease `limit` by 3 and `skip` by 3)

Example: 


**For page 1:**
limit = 3 and skip = 0


**For page 2:**
limit = 6 and skip = 3

and so on.

> The selection state should remain unaffected by navigation.

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

- [ ] Display [`NoResults`](./src/ui/NoResults.tsx) component from [`ui`](./src/ui) when no results are found for a given query

---

### Bonus
---

- [ ] Display additional information about given mood. This can be achieved by editing existing [`Mood`](./src/components/Mood.tsx) component. Use `moodId` provided from query params to fetch the data from appropriate endpoint, then to display retrieved information utilize [`Details`](./src/ui/Details.tsx) component from [`/ui`](./src/ui) folder. **Please make sure that user can click on the multiple mood cards while data is loading but only one state updated will be performed**

<details>
<summary><strong>REST API:</strong></summary>
<p></p>

**Request:**


Send _GET_ request to http://localhost:4000/moods/:moodId


**Types:**


Types for the REST response can be found in [./src/types/rest.ts](./src/types/rest.ts)


**Example response:**

```json
{
    "id": 1,
    "title": "Happiness",
    "emoji": "😄",
    "description": "A state of being happy or experiencing pleasure.",
    "word": {
        "partOfSpeech": "Noun",
        "definitions": [
            "The state of being happy.",
            "A feeling of pleasure or contentment."
        ],
        "pronunciation": "/ˈhæp.i.nəs/"
    }
}
```
</details>


<details>
<summary><strong>GraphQL API:</strong></summary>
<p></p>

**Request:**


Utilize `mood(id: !ID)` query. 

**Types:**


Types for the query can be found in [./src/types/graphql.ts](./src/types/graphql.ts)


**Example response:**


```json
{
  "data": {
    "mood": {
      "id": "1",
      "emoji": "😄",
      "description": "A state of being happy or experiencing pleasure.",
      "title": "Happiness",
      "word": {
        "definitions": [
          "The state of being happy.",
          "A feeling of pleasure or contentment."
        ],
        "partOfSpeech": "Noun",
        "pronunciation": "/ˈhæp.i.nəs/"
      }
    }
  }
}
```
</details>

---

- [ ] Implement the functionality to send selected "moods" to our API. Utilize the `onSend` prop from the [`CTA`](./src/ui/CTA.tsx) component in the [`App`](./src/App.tsx) component.

<details>
<summary><strong>REST API:</strong></summary>
<p></p>

Send _POST_ request to http://localhost:4000/api/moods/current with `{body: { moodIds: [<ids>] }}`. 
</details>


<details>
<summary><strong>GraphQL API:</strong></summary>
<p></p>

Send mutation with selected moods ids `saveCurrentMoods(moodsIds: [ID!]!)`.
</details>
