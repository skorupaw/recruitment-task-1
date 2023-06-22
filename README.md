<h1 align="center">Mood Selector 🎭🎉</h1>

To start dev server run:
```cmd
npm run dev
```

- [ ] Render a list of "mood cards" in the `Moods` component. You can fetch them from the REST API located at `http://localhost:4000/api/moods`. To accomplish this, utilize the `Card` component from the `ui` folder.

To start the REST server run:
```cmd
npm run serve:rest
```

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

Types for the REST response can be found in (./src/types/rest/index.ts)

To start GraphQL server run:
```cmd
npm run serve:graphql
```

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

To run App with GraphQL mode go to (./src/main.tsx) and change `<Root type="graphql">`

Types for the GraphQL response can be found in (./src/types/graphql/index.ts)

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
