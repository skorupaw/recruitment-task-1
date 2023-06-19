import { useLayoutEffect, useRef, useState } from "react";
import { Page , Navigation, Main, Header, Search } from "./ui";
import Moods from "./components/Moods";

export default function App() {
  const ref = useRef<HTMLInputElement>(null);
  const [search, onSearch] = useState('')
  const [[skip, limit], setPagination] = useState([0, 3])
  const [selected, setSelected] = useState<string[]>([])

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [ref])

  // Add search debounce
  // Add use of useMemo or useCallback
  // Tests
  // Types for API
  // GraphQL setup
  // Test in code pen
  // Write steps task and cleanup

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value)
  }

  const handleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((selectedId) => selectedId !== id));
    } else {
      setSelected([ ...selected, id])
    }
  }
  
  const handleSend = () => {
    fetch('http://localhost:4000/api/moods/current', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selected)
    })
      .then((res) => res.json())
      .then((data) => console.log(`Success! ${data}`))
  }

  return (
    <Page>
      <Header />
      <Search ref={ref} onChange={handleSearch} value={search} />
      <Main>
        <Moods skip={skip} limit={limit} search={search} onSelect={handleSelect} selected={selected} />
      </Main>
      <Navigation
        onNext={() => setPagination([skip + 3, limit + 3])}
        onPrevious={() => setPagination([skip - 3, limit - 3])}
        isPreviousDisabled={skip === 0 || !!search}
        isNextDisabled={!!search}
      />
      <div className="flex w-full justify-end py-4">
        <button className="bg-green-500 px-4 py-2 text-sm rounded-3xl text-white font-bold inline-flex hover:bg-green-600" onClick={handleSend}>Send ✉️</button>
      </div>
    </Page>
  );
}
