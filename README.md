<h1 align="center">Mood Selector 🎭🎉</h1>

- [ ] Render a list of "mood cards" in the `Moods` component. You can fetch them from the REST API located at `http://localhost:4000/api/moods`. To accomplish this, utilize the `Card` component from the `ui` folder.
- [ ] Limit the number of displayed mood cards to 3. You can achieve this by calling the API with the query parameter `limit=3`.
- [ ] Implement pagination functionality. The `Navigation` component should have two optional props: `onNext` and `onPrevious`. Clicking on "Next" should increase the limit by 3 and skip by 3 items. Clicking on "Previous" should go back by 3 items.
- [ ] Add search functionality. When a user types something into the search input, we should make an API call to `http://localhost:4000/api/moods?limit=3&search={search}` and display the results accordingly.
- [ ] Add the ability to select "mood cards" using the `isSelected` and `onSelect` props of the `Card` component. The selection state should remain unaffected by searching and navigation.
- [ ] Ensure that the search input is focused when the page is refreshed.
- [ ] Implement the functionality to send selected "moods" to our API. Utilize the `onSend` prop from the `Footer` component in the `App` component.
