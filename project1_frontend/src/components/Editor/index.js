import React, { Component } from 'react';
import ReactQuill from 'react-quill'
import { connect } from 'react-redux';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.state = { editorHtml: ''}
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (html) {
  	this.setState({ editorHtml: html });
    this.props.onChange(html);
  }

  render () {
    if (this.props.readOnly)
    return(  <ReactQuill
        id={this.props.id}
        theme={this.props.readOnly?null:'snow'}
        onChange={this.handleChange}
        modules={this.props.readOnly?Editor.readonlymodules:Editor.modules}
        formats={Editor.formats}
        value={this.props.defaultValue}
          readOnly={this.props.readOnly}
        placeholder={this.props.placeholder} />
   )
    else
    return (
        <ReactQuill
          id={this.props.id}
          theme={this.props.readOnly?null:'snow'}
          onChange={this.handleChange}
          modules={this.props.readOnly?Editor.readonlymodules:Editor.modules}
          formats={Editor.formats}
          defaultValue={this.props.defaultValue}
          readOnly={this.props.readOnly}
          placeholder={this.props.placeholder} />
     )
  }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.readonlymodules= {
  toolbar: false
}
Editor.modules = {}
Editor.modules.toolbar = [
  ['bold', 'italic', 'underline', 'strike'],       // toggled buttons
  ['blockquote', 'code-block'],                    // blocks
  [{ 'header': 1 }, { 'header': 2 }],              // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],    // lists
  [{ 'script': 'sub'}, { 'script': 'super' }],     // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],         // outdent/indent
  [{ 'direction': 'rtl' }],                        // text direction
  [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],       // header dropdown
  [{ 'color': [] }, { 'background': [] }],         // dropdown with defaults
  [{ 'font': [] }],                                // font family
  [{ 'align': [] }],                               // text align
  ['link','image','video'],
  ['clean'],                                       // remove formatting
]

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header', 'font', 'background', 'color', 'code', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent', 'script', 'align', 'direction',
  'link', 'image', 'code-block', 'formula', 'video'
]

export default Editor;
