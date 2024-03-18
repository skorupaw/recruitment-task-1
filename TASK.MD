
## End2End Tests

**Note: After completing every task you can run**

```cmd
npm run test:task -- task00

# Example
npm run test:task -- task01
```
this command will run the e2e test suite responsible for testing this part of the assignment. For everything to run smoothly, you need to do the tasks in order - this should check the correctness of every individual task. If some tests are failing but you are sure that the task is completed, don't hesitate to ignore them. We check every solution manually. 

## Checklist


**1.**
- [ ] Fetch and render a list of "mood cards" in the [`Moods`](./frontend/src/components/Moods.tsx) component. To accomplish this, use the [`Card`](./frontend/src/ui/Card.tsx) component from the [`/ui`](./frontend/src/ui/) folder and fetch the data from the provided API.


<details>
<summary><strong>REST API:</strong></summary>
<p></p>

**Request:**


_GET_ request should be sent to http://localhost:5173/api/moods

**Types:**


Types for the REST response can be found in [./frontend/src/types/rest.ts](./frontend/src/types/index.ts)

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
        "limit": 1,
        "count": 40
    }
}
```
</details>

<details>
<summary><strong>GraphQL API:</strong></summary>
<p></p>

> You can access GraphQL sandbox navigating to: http://localhost:4001

**Request:**

Apollo Client is already set up, so you can jump right into writing a `useQuery` hook.

**Types:**

Types for the GraphQL response can be found in [./frontend/src/types/graphql.ts](./frontend/src/types/graphql.ts)

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

**2.**
- [ ] Display 3 loading skeletons while waiting for the response from the server. This can be achieved using `isLoading` prop from the [`Card`](./frontend/src/ui/Card.tsx) component.  

---

**3.**
- [ ] Ensure that the search input (which can be found in [`App`](./frontend/src/App.tsx) component) is focused when the page is reloaded.

---

**4.**
- [ ] Add the ability to select and deselect "mood cards" using the `isSelected` and `onSelect` props of the [`Card`](./frontend/src/ui/Card.tsx) component. "Mood card" can be selected by clicking on the dot in the top right corner.

---

**5.**
- [ ] Limit the number of possible mood selections to 3. 

--- 

**6.**
- [ ] Limit the number of displayed mood cards to 3. You can achieve this by calling the API with appropriate variables:

<details>
<summary><strong>REST API:</strong></summary>
<p></p>

Add the query parameter to the URL: `limit=3`.
</details>

<details>
<summary><strong>GraphQL API:</strong></summary>
<p></p>

Add the query variable: `{"limit": 3}`.
</details>

---

**7.**
- [ ] Implement the pagination functionality. The [`Navigation`](./frontend/src/ui/Navigation.tsx) component should have two optional props: `onNext` and `onPrevious`. Add appropriate handlers to allow a user to: 

  - [ ] By clicking "Next", display 3 next moods from the API (increase the `limit` by 3 and `skip` by 3)

  - [ ] By clicking "Previous", display 3 previous moods from the API (decrease `limit` by 3 and `skip` by 3)

Example: 


**For page 1:**
limit = 3 and skip = 0


**For page 2:**
limit = 6 and skip = 3

and so on.

> The selection state should remain unaffected by the navigation.

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

**8.**
- [ ] Disable the navigation buttons when waiting for the response from the backend server. It can be achieved by using the `isNextDisabled` and `isPreviousDisabled` props from the [`Navigation`](./frontend/src/ui/Navigation.tsx) component. 

---

**9.**
- [ ] Add a search option, without impacting the previous functionality. When a user types something into the search input, we should make an API call and display the results accordingly.


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

**10.**
- [ ] Debounce the search input. A request shouldn't be sent as long as the user is typing.

> **Note:**
> For this task there are no e2e tests.

---

**11.**
- [ ] Display the [`NoResults`](./frontend/src/ui/NoResults.tsx) component from [`ui`](./frontend/src/ui) when no results are found for a given query.

---

**12.**
- [ ] Display additional information about a given mood. This can be achieved by editing the existing [`Mood`](./frontend/src/components/Mood.tsx) component. Use `moodId` provided from query params to fetch the data, then to display retrieved information use the [`Details`](./frontend/src/ui/Details.tsx) component from [`/ui`](./frontend/src/ui) folder. **Please make sure that the user can click on the multiple mood cards while data is loading, but only one state update is performed.**

<details>
<summary><strong>REST API:</strong></summary>
<p></p>

**Request:**


Send _GET_ request to http://localhost:5173/api/moods/:moodId


**Types:**


Types for the REST response can be found in [./frontend/src/types/rest.ts](./frontend/src/types/rest.ts)


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


Types for the query can be found in [./frontend/src/types/graphql.ts](./frontend/src/types/graphql.ts)


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

**13.**
- [ ] Display a loading skeleton while waiting for the response from the server. This can be achieved by using `isLoading` prop from the [`Details`](./frontend/src/ui/Details.tsx) component.

---

**14.**
- [ ] Implement the functionality to send selected "moods" to our API. Use the `onSend` prop from the [`CTA`](./frontend/src/ui/CTA.tsx) component in the [`App`](./frontend/src/App.tsx) component. 

<details>
<summary><strong>REST API:</strong></summary>
<p></p>

Send _POST_ request to http://localhost:5173/api/moods/current with `{body: { moodIds: [<ids>] }}`. 
</details>


<details>
<summary><strong>GraphQL API:</strong></summary>
<p></p>

Send a mutation with the ids of selected moods `saveCurrentMoods(moodsIds: [ID!]!)`.
</details>

> **Note:**
> For this task there are no e2e tests.

---

**15.**
- [ ] Display the number of all moods. This can be achieved by passing the `count` data from the request to the [`Navigation`](./frontend/src/ui/Navigation.tsx) component as a prop.

---

**16.**
- [ ] Hide the navigation buttons when the user reaches the first and the last page. It can be achieved by using the `isPreviousHidden` and `isNextHidden` props from the [`Navigation`](./frontend/src/ui/Navigation.tsx) component.

---


## Unit Tests


- [ ] Add unit tests. You can find some examples in the [`Mood.spec.tsx`](./frontend/src/components/Mood.spec.tsx) and [`App.spec.tsx`](./frontend/src/App.spec.tsx) files. The setup for the [`msw`](https://mswjs.io/) and [`@testing-library`](https://testing-library.com) can be found in [`/test-utils`](./frontend/src/test-utils/) and [`setup-tests.ts`](./frontend/setup-tests.ts). Once again, if you prefer, you can change the unit tests setup, matchers and runners. This one is configured to run with [`vitest`](https://vitest.dev/)

You can run unit-tests via this command:
```cmd
npm run test
```
