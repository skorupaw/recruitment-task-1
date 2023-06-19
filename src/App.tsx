import { Page, Navigation, Main, Header, Search, Footer } from "./ui";
import Moods from "./components/Moods";

export default function App() {
  return (
    <Page>
      <Header />
      <Search />
      <Main>
        <Moods />
      </Main>
      <Navigation />
      <Footer />
    </Page>
  );
}
