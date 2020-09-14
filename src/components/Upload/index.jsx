import React, { Component } from "react";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const MAX_VIDEO_SIZE = 1024 * 1024 * 8; //8MB
export default class MyUpload extends Component {
  beforeUpload = (file) => {
    console.log("beforeUpload执行了", file);
    return new Promise((resolve, reject) => {
      if (file.size <= MAX_VIDEO_SIZE) {
        resolve(file);
      } else {
        reject("视频大小超过8MB！");
        message.warning("视频大小不得超过8MB");
      }
    });
  };

  customReques = () => {};

  render() {
    return (
      <Upload
        accept="video/mp4"
        beforeUpload={this.beforeUpload}
        customReques={this.customReques}
      >
        <Button icon={<UploadOutlined />}>点击上传</Button>
      </Upload>
    );
  }
}
