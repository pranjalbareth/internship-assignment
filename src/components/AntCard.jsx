import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import CardForm from "./CardForm";
import AntButton from "./AntButton";
import AntModal from "./AntModal";
import { connect } from "react-redux";
import { editCard, removeCards } from "../store/actions/cardAction";
import { addHistory } from "../store/actions/historyAction";
import { DeleteModal } from "./DeleteModal";
import {
  DeleteTwoTone,
  EditTwoTone,
  CloseCircleFilled,
} from "@ant-design/icons";
import { Tooltip } from "antd";

function AntCard({
  addHistory,
  multiSelect = false,
  isSelected,
  title,
  content,
  bucket,
  id,
  onItemSelect,
  url,
  editCard,
  removeCards,
}) {
  let [editOpen, setEditOpen] = useState(false);
  let [viewOpen, setViewOpen] = useState(false);
  let [formData, setFormData] = useState({});
  let [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleMultiSelect = () => {
    if (multiSelect) onItemSelect();
  };
  let tempUrl = content;
  const videoID = tempUrl.split("v=")[1];
  const thumbnailURL = `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`;
  const videoURL = `https://www.youtube.com/embed/${videoID}`;
  return (
    <div
      onClick={handleMultiSelect}
      className={`h-full w-full ${multiSelect && "cursor-pointer"}`}
    >
      <div
        className={`flex justify-center h-full w-full ${
          multiSelect && "pointer-events-none"
        }`}
        style={{ width: "23vw" }}
      >
        <AntModal open={viewOpen} setOpen={() => setViewOpen(false)}>
          <div
            className="bg-gray-200 flex flex-row"
            style={{
              padding: "0.5rem 0.5rem 0.5rem 1.5rem",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p className="text-gray-800 text-l font-medium">{title}</p>
            <AntButton type="button" onClick={() => setViewOpen(false)}>
              <CloseCircleFilled
                style={{ fontSize: "24px", color: "#ff3a2b" }}
              />
            </AntButton>
          </div>
          <iframe
            className="my-6 mx-5 ssrounded-md w-[80vw] h-[25vh] md:w-[60vw] md:h-[60vh] bg-gray-900"
            src={`${videoURL}?autoplay=1`}
            title="Can You Beat Me At This Interview?"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ margin: "0.5rem" }}
          ></iframe>
        </AntModal>
        <AntModal open={editOpen} setOpen={() => setEditOpen(false)}>
          <Dialog.Title
            as="h3"
            className="text-xl text-center px-8 pt-6 font-medium leading-6 text-gray-900"
          >
            Edit Card
          </Dialog.Title>
          <CardForm setFormData={setFormData} />
          <div className="px-4 md:px-6 py-3 md:py-4 gap-4 bg-gray-200 flex flex-row justify-end">
            <button
              type="button"
              className="inline-flex w-28 justify-center rounded-md border border-transparent bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-[3px] focus:ring-blue-300"
              onClick={() => {
                editCard(bucket.name, { ...formData, id, url });
                setEditOpen(false);
              }}
            >
              Save
            </button>
            <button
              type="button"
              className="inline-flex w-32 justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-[3px] focus:ring-blue-300"
              onClick={() => setEditOpen(false)}
            >
              Cancel
            </button>
          </div>
        </AntModal>
        <DeleteModal
          deleteModalOpen={deleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          handleDelete={() => {
            removeCards(bucket.name, { [id]: true });
            setDeleteModalOpen(false);
          }}
        />
        <div className="rounded-lg shadow-lg bg-white w-full flex flex-col">
          <div className="h-[200px]">
            <img
              src={thumbnailURL}
              style={{ borderRadius: "10px 10px 0 0" }}
              alt="Video Thumbnail"
            />
          </div>
          <div
            className={"h-full flex flex-row" + (isSelected && "bg-blue-100")}
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1rem",
            }}
          >
            <h5 className="text-gray-900 text-xl font-medium">{title}</h5>
            <div
              className="flex justify-around gap-3 md:gap-4"
              style={{ alignItems: "center" }}
            >
              <Tooltip title="Edit Card" placement="bottomRight">
                <button
                  type="button"
                  onClick={() => setEditOpen(true)}
                  style={{ fontSize: "20px" }}
                >
                  <EditTwoTone twoToneColor="#30cd68" />
                </button>
              </Tooltip>
              <Tooltip title="Delete Card" placement="bottomLeft">
                <button
                  type="button"
                  onClick={() => setDeleteModalOpen(true)}
                  style={{ fontSize: "20px" }}
                >
                  <DeleteTwoTone twoToneColor="#ff3a2b" />
                </button>
              </Tooltip>
              <AntButton
                onClick={() => {
                  addHistory({ name: title, date: new Date(), link: url });
                  setViewOpen(true);
                }}
                style={{ backgroundColor: "#1677ff" }}
              >
                View
              </AntButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    bucket: state.bucket.selected,
  };
};

export default connect(mapStateToProps, { editCard, removeCards, addHistory })(
  AntCard
);
