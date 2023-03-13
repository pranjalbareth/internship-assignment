import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { connect } from "react-redux";
import { setSelectedBucket } from "../store/actions/bucketAction";
import "../index.css";

const { Option } = Select;

function BucketSelector({ buckets = [], selectedBucket, setSelectedBucket }) {
  const [selected, setSelected] = useState(
    selectedBucket ? selectedBucket : { name: "No buckets" }
  );

  useEffect(() => {
    setSelected(selectedBucket ? selectedBucket : { name: "No buckets" });
  }, [buckets]);

  return (
    <Select
      value={selected.name}
      onChange={(value, option) => {
        setSelected(option.props.bucket);
        setSelectedBucket(option.props.bucket);
      }}
      className="mb-8 max-w-lg mx-auto"
    >
      {buckets.map((bucket, bucketIdx) => (
        <Option key={bucketIdx} bucket={bucket} value={bucket.name}>
          {bucket.name}
        </Option>
      ))}
    </Select>
  );
}

const mapStateToProps = (state) => {
  return {
    buckets: state.bucket.buckets,
    selectedBucket: state.bucket.selected,
  };
};

export default connect(mapStateToProps, { setSelectedBucket })(BucketSelector);
