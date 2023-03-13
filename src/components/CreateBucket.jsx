import { Input, Button } from "antd";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";
import "./NavBar.css";
import { connect } from "react-redux";
import { addBucket } from "../store/actions/bucketAction";

function CreateBucket({ addBucket }) {
  const [bucketName, setBucketName] = useState("");

  const handleCreateBucket = () => {
    if (bucketName === "") return;
    addBucket(bucketName);
    setBucketName("");
  };
  return (
    <div className="NavBar">
      <Title className="title" level={4}>
        Internship Assignment
        <span>
          &nbsp;(By{" "}
          <a href="https://github.com/pranjalbareth">@PranjalBareth</a>)
        </span>
      </Title>
      <div className="bucket-creator">
        <div className="bucket-name-input"></div>
        <Input
          type="text"
          className="bucket-name-input"
          placeholder="Enter bucket name"
          value={bucketName}
          onChange={(e) => setBucketName(e.target.value)}
          style={{height: "45px"}}
        />
        <Button
          type="primary"
          className="bucket-create-button"
          onClick={handleCreateBucket}
          style={{backgroundColor: "#1677ff", height: "45px"}}
        >
          Create Bucket
        </Button>
      </div>
    </div>
  );
}
export default connect(null, { addBucket })(CreateBucket);