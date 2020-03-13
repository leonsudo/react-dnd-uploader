# React-DnD-Uploader

React Drag-n-Drop Uploader is a light weight React library that create a drag and drop zone for uploading your files.

## Features

* Image and video thumbnail previews
* Upload multiple files
* Display progress updates
* Response design
* Customizable theme

## Installation

For npm

```bash
npm install --save react-dnd-uploader
```

For yarn

```bash
yarn
```

## Demo

```bash
npm install
npm start
```

A browser opens up, or visit http://localhost:3000 to browse the demo.

## Documentation

### fileWindow

Type: `Boolean`<br>
Required: `false`<br>
Default: `false`<br>

If the `fileWindow` is set to `true, there will be a file window button available on drag and drop zone.

### autoUpload

Type: `Boolean`<br>
Required: `false`<br>
Default: `false`<br>

If the `autoUpload` is set to `true`, the dropped file will be automatically uploaded.

### preview

Type: `Boolean`<br>
Required: `false`<br>
Default: `true`<br>

If the `preview` is set to `false`, the image/video preview thumbnail will be disabled in the drop and drag zone.

### uploadUrl

Type: `String`<br>
Required: `true`<br>
Default: `null`<br>

`uploadUrl` should be the upload endpoint for uploading files.

### styleOptions

Type: `Object`<br>
Required: `false`<br>
Default: `{}`<br>

`styleOptions` allows you to style the elements within `react-dnd-uploader` either using inline styles or classNames. The possible options are:

`{ dragContainer, drag, dragText, fileInput, previewsContainer, imgContainer, img, previewName, progressContainer, progress, delBtn, uploadBtn }`

You can add inline styles by adding a `Style` suffix to the option and add a className by adding a `Class` Suffix. For example, to add inline styles to `dragContainer` we would use the `dragContainerStyle` option. All the options must either be suffixed by `Style` or `Class` expect for `dragText` which could be used without a suffix to replace the text that is displayed when the user drags over the element.

## Sample Code

ReactDndUploader makes use of the render prop pattern. So in order to get the uploading state and render something within ReactDndUploader, a render function must be passed as the child like in the following example.


```javascript
import React from "react";
import ReactDndUploader from "react-dnd-uploader";

export default function App() {
  return (
    <div className="App">
      <ReactDndUploader
        className="drag-and-drop"
        preview
        fileWindow
        uploadUrl="http://localhost:3001/api/photo"
      >
        {
          uploading => {
            return (
            <div>
              <div>
                <div style={{ marginBottom: "1rem" }}>
                  {!uploading
                    ? 'Click "Choose Files" or Drag and Drop files here to upload'
                    : "Uploading..."}
                </div>
              </div>
            </div>
            )
          }
        }
      </ReactDndUploader>
    </div>
  );
}
```
