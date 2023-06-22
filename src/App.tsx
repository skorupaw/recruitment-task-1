import { Page, Navigation, Main, Search, Footer } from "./ui";
import Moods from "./components/Moods";

export default function App() {
  return (
    <Page>
      <div className="py-6">
        <h2 className="text-3xl font-bold">Mood selector</h2>
        <span className="text-sm text-neutral-500">
          (Select 3 moods that bests describe your feeling)
        </span>
      </div>
      <Search />
      <Main>
        <Moods />
      </Main>
      <Navigation />
      <Footer />
    </Page>
  );
}
