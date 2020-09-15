import React, { Component } from "react";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { reqQiniuToken } from "@/api/upload";
import * as qiniu from "qiniu-js";
const MAX_VIDEO_SIZE = 1024 * 1024 * 8;
export default class MyUpload extends Component {
  beforeUpload = (file) => {
    return new Promise((resolve, reject) => {
      if (file.size <= MAX_VIDEO_SIZE) {
        resolve(file);
      } else {
        reject("视频大小超过了8MB");
        message.warning("视频大小超过了8MB");
      }
    });
  };
  customRequest = async ({ file, onError, onProgress, onSuccess }) => {
    const observer = {
      next({ total }) {
        onProgress({ percent: total.percent });
      },
      error(err) {
        onError();
        message.error("上传失败，请联系管理员");
      },
      complete: (res) => {
        onSuccess();

        this.props.onChange("http://qgoxzepze.hn-bkt.clouddn.com/" + res.key);
        message.success("上传成功");
      },
    };
    const key = "0422test3" + file.uid;
    const { uploadToken: token } = await reqQiniuToken();
    const observable = qiniu.upload(file, key, token);
    observable.subscribe(observer);
  };
  render() {
    return (
      <Upload
        accept="video/mp4"
        beforeUpload={this.beforeUpload}
        customRequest={this.customRequest}
      >
        <Button icon={<UploadOutlined />}>点击上传</Button>
      </Upload>
    );
  }
}
