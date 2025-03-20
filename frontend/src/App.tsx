import {
  Page,
  Navigation,
  Main,
  Search,
  Footer,
  Counter,
  SaveButton,
  MoodSaveSuccessModal,
} from "@/ui";
import Moods from "@/components/Moods";
import { Outlet } from "react-router";

export default function App() {
  return (
    <Page>
      <div className="py-6">
        <h2 className="text-3xl font-bold tracking-tight">Mood selector</h2>
        <span className="text-muted-foreground">
          Select 3 moods that bests describe your feeling
        </span>
      </div>
      <div className="flex w-full items-center py-2">
        <Search placeholder="Search..." />
      </div>
      <Main>
        <Outlet />
        <Moods />
      </Main>
      <Footer>
        <Counter />
        <Navigation />
        <div className="flex items-center justify-end">
          <SaveButton onSave={() => null} isSaving={false} />
        </div>
      </Footer>
      <MoodSaveSuccessModal isOpen={false} onChangeOpen={() => null} />
    </Page>
  );
}
