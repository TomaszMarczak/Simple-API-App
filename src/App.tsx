import { Searchbar } from "./components/Searchbar";
import { Container, Stack } from "react-bootstrap";
import { ContentTable } from "./components/ContentTable";
import { InfoModal } from "./components/InfoModal";
import { useState } from "react";
import "./App.css";

function App() {
  const [show, setShow] = useState<boolean>(false);
  const [modalId, setModalId] = useState<number | null>(null);
  return (
    <div>
      <Container className="pt-3">
        <Stack>
          <h1>Products List</h1>
          <Searchbar />
          <ContentTable />
        </Stack>
        <InfoModal />
      </Container>
    </div>
  );
}

export default App;
