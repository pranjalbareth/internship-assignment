import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import BucketSelector from "./components/BucketSelector";
// import Button from "./components/Button";
import AntCard from "./components/AntCard";
import CardContainer from "./components/CardContainer";
import CardForm from "./components/CardForm";
import CreateBucket from "./components/CreateBucket";
import History from "./components/History";
import Footer from "./components/Footer";
import AntModal from "./components/AntModal";
import MultiSelectOverlay from "./components/MultiSelectOverlay";
import { addCard, moveCards, removeCards } from "./store/actions/cardAction";
import { fetchAllBuckets } from "./store/actions/bucketAction";
import { fetchPrevHistory } from "./store/actions/historyAction";
import { DeleteModal } from "./components/DeleteModal";
import AntButton from "./components/AntButton";
import { PlusOutlined } from "@ant-design/icons";

function App({
  cards = [],
  bucket,
  addCard,
  removeCards,
  fetchAllBuckets,
  fetchPrevHistory,
}) {
  const [formOpen, setFormOpen] = useState(false);
  const [multiSelectOverlay, setMultiSelectOverlay] = useState(false);
  const [itemSelected, setItemSelected] = useState({});
  const [multiDeleteModal, setMultiDeleteModal] = useState(false);
  const [formData, setFormData] = useState({});

  const handleItemSelect = (item) => {
    setItemSelected({ ...itemSelected, [item]: !itemSelected[item] });
  };

  const multiSelectOverlayClose = () => {
    setMultiSelectOverlay(!multiSelectOverlay);
    setItemSelected({});
  };

  const handleMultiDelete = () => {
    removeCards(bucket.name, itemSelected);
    setItemSelected({});
  };

  useEffect(() => {
    fetchAllBuckets();
    fetchPrevHistory();
  }, []);

  return (
    <div className="relative bg-blue-50">
      <CreateBucket />
      <AntModal open={formOpen} setOpen={() => setFormOpen(false)}>
        <Dialog.Title
          as="h3"
          className="text-xl text-center px-8 pt-6 font-medium leading-6 text-gray-900"
        >
          Create Card
        </Dialog.Title>
        <CardForm setFormData={setFormData} />
        <p className="text-center text-xs my-4 px-5 break-words">
          In the card you can embed a youtube video, by giving input of Youtube
          Video URL <br />
          User can also create dummy card just by pressing save button.
        </p>
        <div className="px-4 md:px-6 py-3 md:py-4 gap-4 bg-gray-200 flex flex-row-reverse">
          <AntButton
            type="primary"
            className="bucket-create-button"
            onClick={() => setFormOpen(false)}
            danger
          >
            Close
          </AntButton>

          <AntButton
            type="primary"
            className="bucket-create-button"
            onClick={() => {
              addCard(bucket.name, formData);
              setFormOpen(false);
              setFormData({});
            }}
            style={{ backgroundColor: "rgb(29 199 90)" }}
          >
            Save
          </AntButton>
        </div>
      </AntModal>
      <MultiSelectOverlay
        itemSelected={itemSelected}
        multiSelectOverlay={multiSelectOverlay}
        setMultiDeleteModal={setMultiDeleteModal}
        multiSelectOverlayClose={multiSelectOverlayClose}
      />
      <DeleteModal
        deleteModalOpen={multiDeleteModal}
        setDeleteModalOpen={setMultiDeleteModal}
        handleDelete={handleMultiDelete}
      />

      <div id="main" className="py-8 px-4 md:px-12 bg-gray-50 pb-16">
        <div style={{ display: "flex" }}>
          {/*<h2 className="my-10 mx-auto text-center text-3xl font-semibold md:text-4xl">
            Choose bucket
          </h2>*/}
          <BucketSelector />
          <div className="w-full flex justify-center gap-4">
            <AntButton
              type="primary"
              icon={<PlusOutlined />}
              className="bucket-create-button"
              onClick={() => setFormOpen(true)}
              style={{
                backgroundColor: "rgb(48 205 104)",
                display: "flex",
                alignItems: "center",
                height: "45px",
              }}
            >
              Add Card
            </AntButton>
            <AntButton
              type="primary"
              className="bucket-create-button"
              onClick={() => setMultiSelectOverlay(!multiSelectOverlay)}
              danger
              style={{
                height: "45px",
              }}
            >
              Delete Multiple Cards
            </AntButton>
          </div>
        </div>
        <hr className="mb-8" />
        <CardContainer>
          {cards.length ? (
            cards.map((card, index) => (
              <AntCard
                key={index}
                multiSelect={multiSelectOverlay}
                url={card?.url}
                id={card.id}
                title={card.title}
                content={card.content}
                onItemSelect={() => handleItemSelect(card.id)}
                isSelected={itemSelected[card.id]}
              />
            ))
          ) : (
            <div className="text-xl p-6">No cards present</div>
          )}
        </CardContainer>
      </div>
      <History />
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cards: state.card.cards,
    bucket: state.bucket.selected,
  };
};

export default connect(mapStateToProps, {
  addCard,
  moveCards,
  removeCards,
  fetchAllBuckets,
  fetchPrevHistory,
})(App);
