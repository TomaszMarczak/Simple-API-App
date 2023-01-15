import { Modal, Stack } from "react-bootstrap";
import { useSearchContext } from "../context/SearchContext";

export const InfoModal = () => {
  const { response, modalId, setModalId } = useSearchContext();
  const productObject = response?.data.find((object) => object.id === modalId);

  return (
    <Modal show={typeof modalId === "number"} onHide={() => setModalId(null)}>
      <Modal.Header
        className="text-uppercase text-light"
        closeButton
        style={{ backgroundColor: productObject?.color }}
      >
        <Modal.Title>{productObject?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={2}>
          <div>
            <span className="fw-bold">ID:</span> {productObject?.id}
          </div>
          <div>
            <span className="fw-bold">Name:</span> {productObject?.name}
          </div>
          <div>
            <span className="fw-bold">Year:</span> {productObject?.year}
          </div>
          <div>
            <span className="fw-bold">Color:</span>{" "}
            {productObject?.pantone_value} ({productObject?.color})
          </div>
        </Stack>
      </Modal.Body>
    </Modal>
  );
};
