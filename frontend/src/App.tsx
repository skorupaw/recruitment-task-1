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
import { Outlet } from "@tanstack/react-router";
import { useMoodsContext } from "@/lib/moods-context";

export default function App() {
  const {
    count,
    isLoading,
    page,
    search,
    isSaving,
    isSuccessOpen,
    setSearch,
    goNext,
    goPrevious,
    save,
    setSuccessOpen,
  } = useMoodsContext();

  const pageSize = 3;
  const isPreviousDisabled = isLoading || page === 0;
  const isNextDisabled = isLoading || (page + 1) * pageSize >= count;

  return (
    <Page>
      <div className="py-6">
        <h2 className="text-3xl font-bold tracking-tight">Mood selector</h2>
        <span className="text-muted-foreground">
          Select 3 moods that bests describe your feeling
        </span>
      </div>
      <div className="flex w-full items-center py-2">
        <Search
          placeholder="Search..."
          defaultValue={search}
          autoFocus
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Main>
        <Outlet />
        <Moods />
      </Main>
      <Footer>
        <Counter count={count} />
        <Navigation
          onNext={goNext}
          onPrevious={goPrevious}
          isNextDisabled={isNextDisabled}
          isPreviousDisabled={isPreviousDisabled}
        />
        <div className="flex items-center justify-end">
          <SaveButton onSave={save} isSaving={isSaving} />
        </div>
      </Footer>
      <MoodSaveSuccessModal
        isOpen={isSuccessOpen}
        onChangeOpen={setSuccessOpen}
      />
    </Page>
  );
}
