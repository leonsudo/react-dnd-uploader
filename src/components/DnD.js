import React from "react";

import Preview from "./Preview";
import { createPreviews } from "../utils";
import { AppContext } from "../context/AppProvider";
import ApiService from "../api/ApiService";

class DnD extends React.Component {
  state = {
    dragging: false
  };
  static contextType = AppContext;
  apiService = new ApiService();
  dragCounter = 0;
  dropRef = React.createRef();

  handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDragIn = e => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ dragging: true });
    }
  };

  handleDragOut = e => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter <= 0) {
      this.setState({ dragging: false });
    }
  };

  handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ dragging: false });
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (this.props.preview)
        createPreviews(e.dataTransfer.files, this.context, this.props.fileType);
      if (this.props.autoUpload) this.uploadFiles();
      else if (this.props.handleDrop)
        this.props.handleDrop(e.dataTransfer.files);
      // e.dataTransfer.clearData();
      this.dragCounter = 0;
    }
  };

  uploadFiles = () => {
    const { context } = this;
    if (context.files) {
      Object.values(context.files).forEach(file => {
        this.apiService.uploadFile(
          file,
          context.setContext,
          this.props.uploadUrl
        );
      });
    }
  };

  deleteFile = (e) => {
    e.preventDefault()
    const { context } = this;
    delete context.imgPreviews[Object.keys(context.imgPreviews)[e.target.id]]
    delete context.files[e.target.id]
    context.setContext(context)
  }

  componentDidMount() {
    let div = this.dropRef.current;
    div.addEventListener("dragenter", this.handleDragIn);
    div.addEventListener("dragleave", this.handleDragOut);
    div.addEventListener("dragover", this.handleDrag);
    div.addEventListener("drop", this.handleDrop);
  }

  componentWillUnmount() {
    let div = this.dropRef.current;
    div.removeEventListener("dragenter", this.handleDragIn);
    div.removeEventListener("dragleave", this.handleDragOut);
    div.removeEventListener("dragover", this.handleDrag);
    div.removeEventListener("drop", this.handleDrop);
  }

  render() {
    const { preview, autoUpload, uploadUrl } = this.props;

    return (
      <div
        style={{ position: "relative", ...this.props.style }}
        ref={this.dropRef}
        className={this.props.className}
      >
        {this.state.dragging && (
          <div
            style={{
              border: "dashed grey 4px",
              backgroundColor: "rgba(255,255,255,.8)",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 9999
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "grey",
                fontSize: 36
              }}
            >
              <div>Drops files here to upload</div>
            </div>
          </div>
        )}
        {this.props.children}
        {preview && uploadUrl && (
          <Preview autoUpload={autoUpload} handleDelete={this.deleteFile} handleSubmit={this.uploadFiles} />
        )}
      </div>
    );
  }
}

export default DnD;
