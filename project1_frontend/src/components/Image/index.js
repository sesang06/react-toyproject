import React, { Component } from 'react';
import './index.css';
import Button from '../Button';
import { connect } from 'react-redux';
import Files from 'react-files'
import { GetImageRequest, PostImageRequest, DeleteImageRequest} from '../../actions';
import Gallery from '../Gallery'
import IG from '../ImageGallery'


class Image extends Component {
  constructor() {
    super();

    //this.onGet = this.onGet.bind(this)
    this.state={
      files: [],
      deleteimageidlist:[],
      delete: false,
    }
    this.getInitialState=this.getInitialState.bind(this)
    this.onFilesChange=this.onFilesChange.bind(this)
    this.onFilesError=this.onFilesError.bind(this)
    this.filesRemoveOne=this.filesRemoveOne.bind(this)
    this.filesRemoveAll=this.filesRemoveAll.bind(this)
    this.filesUpload=this.filesUpload.bind(this)
    this.onGet=this.onGet.bind(this)
    this.onDelete=this.onDelete.bind(this)
    this.onUpdate=this.onUpdate.bind(this)
  }
 componentDidMount(){
   this.onGet()
 }

    componentWillReceiveProps(nextProps){
      if(this.props.loginStatus===0 && nextProps.loginStatus===1)
      this.props.getImage(nextProps.ubase64)

      this.state={
        files: [],
        deleteimageidlist:[],
        delete: false,
      }

    }


    onUpdate() {
      this.setState({delete:!this.state.delete});
      console.log(this.state.delete)
      // this.props.updateArticle(this.props.ubase64, newtext)
    }

  onGet(){
    if (this.props.loginStatus === 1) {
      this.props.getImage(this.props.ubase64)
    }
    console.log(this.props.imagelist.map((item)=>
      {
        let value={original:"", thumbnail:""}
        value.original=item.image
        value.thumbnail=item.image
        return value;
      }
    )
    )
  }

  getInitialState(){
    return {
      files: [],
      deleteimageidlist:[],
      delete: false,
    }
  }

  onFilesChange(files){
    this.setState({
      files
    }, () => {
      console.log(this.state.files)
    })
  }

  onFilesError(error, file){
    console.log('error code ' + error.code + ': ' + error.message)
  }

  filesRemoveOne(file){
    this.refs.files.removeFile(file)
  }

  filesRemoveAll(){
    this.refs.files.removeFiles()
  }

  filesUpload(){
    //window.alert('Ready to upload ' + this.state.files.length + ' file(s)!')
    this.props.postImage(this.props.ubase64, this.state.files)
  }


    imageRemoveOne(id){
      if (this.state.deleteimageidlist.indexOf(id)===-1){
    console.log("hasno")
      this.setState({
        deleteimageidlist:this.state.deleteimageidlist.concat(id)
      })
    }else{
      console.log("hasyes")
        this.setState({
          deleteimageidlist:this.state.deleteimageidlist.slice().filter((item)=>(id!==item))
        })
      }
    }

    onDelete(){
      console.log("dd")
      console.log(this.state.deleteimageidlist)
      this.props.deleteImage(this.props.ubase64,this.state.deleteimageidlist)
    }
  render(){

    console.log(this.props.loginStatus )
      const imagelist=(
        <div className='files-list'>
          <ul>{this.state.files.map((file) =>
            <li className='files-list-item' key={file.id}>
              <div className='files-list-item-preview'>
                {file.preview.type === 'image'
                ? <img className='files-list-item-preview-image' src={file.preview.url} />
                : <div className='files-list-item-preview-extension'>{file.extension}</div>}
              </div>
              <div className='files-list-item-content'>
                <div className='files-list-item-content-item files-list-item-content-item-1'>{file.name}</div>
                <div className='files-list-item-content-item files-list-item-content-item-2'>{file.sizeReadable}</div>
              </div>
              <div
                id={file.id}
                className='files-list-item-remove'
                onClick={this.filesRemoveOne.bind(this, file)} // eslint-disable-line
              />
            </li>
          )}</ul>
        </div>

      )
      const deleteimagelist=(
        <div className='files-list'>
        <h1>갤러리 이미지 지우기</h1>

          <ul>{this.props.imagelist.map((image) =>
            <li className='files-list-item' key={image.id}>
              <div className='files-list-item-preview'>
                { this.state.deleteimageidlist.indexOf(image.id)=== -1
                ? <img className='files-list-item-preview-image' src={image.image} />
                : <div className='files-list-item-preview-extension'>X</div>}
              </div>
              <div className='files-list-item-content'>
                <div className='files-list-item-content-item files-list-item-content-item-1'>{image.author}</div>
                <div className='files-list-item-content-item files-list-item-content-item-2'>{image.id}</div>
              </div>
              <div
                id={image.id}
                className='files-list-item-remove'
                onClick={this.imageRemoveOne.bind(this, image.id)} // eslint-disable-line
              />
            </li>
          )}</ul>
          <button onClick={this.onDelete.bind()} >지우기</button>

        </div>

      )
const FileUpload=(
  <div>
  <h1>이미지 올리기</h1>
  <div className='file-body'>
  <Files
    id="gallery_upload"
    ref='files'
    className='files-dropzone-list'
    style={{ height: '100px' }}
    onChange={this.onFilesChange}
    onError={this.onFilesError}
    multiple
    maxFiles={10}
    maxFileSize={10000000}
    minFileSize={0}
    clickable
  >
    이미지를 이곳으로 드랍하거나, 이곳을 클릭해 업로드하세요!
  </Files>
  </div>
  {imagelist}
  <button onClick={this.filesRemoveAll}>올린 모든 이미지 지우기</button>
  <button id="gallery_upload_image" onClick={this.filesUpload}>업로드하기</button>
  </div>

)
      if(this.props.loginStatus===1)
    return (
      <div>
        <div>
          <ul>
            <li>이미지를 업로드하고 볼 수 있는 갤러리입니다.</li>
            <li>갤러리 불러오기 버튼을 눌러 최신 버전의 갤러리를 구경하세요!</li>
            <li>갤러리 수정 버튼을 눌러 직접 이미지를 올려보세요.</li>
            <li>이미 있는 이미지를 지울수도 있습니다.</li>
          </ul>
        </div>

      <div className="div-body">
      <button id="gallery_button" onClick={this.onGet}>갤러리 불러오기 </button>

        {(this.props.imagelist.length!==0)?  <IG imagelist={this.props.imagelist.map(({image,created}) => ({
          original: image,
          thumbnail: image,
          originalClass: 'featured-slide',
          thumbnailClass: 'featured-thumb',
          description: created.toString()
        }))}/>:null}
        <button id="gallery_modify_button" onClick={this.onUpdate.bind(this)}>{(this.state.delete)?"갤러리 수정 취소":"갤러리 수정"}</button>

        {(this.state.delete)?deleteimagelist:null}

        {(this.state.delete)?FileUpload:null}


      </div>
    </div>
    )
    else return(
      <div>
        <p>로그인이 필요합니다.</p>
      </div>

    )
  }
}
/*

        <Gallery images={this.props.imagelist.map(({image, orientation ='landscape'}) => ({
          src: image,
          thumbnail: image,
          orientation
        }))}/>



<Gallery images={DEFAULT_IMAGES.map(({ caption, id, orientation }) => ({
  src: makeUnsplashSrc(id),
  thumbnail: makeUnsplashThumbnail(id, orientation),
  orientation
}))}/>

*/
/*
function makeUnsplashSrc (id) {
  return 'http://localhost:8000/media/uploads/2017/05/25/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2017-04-06_03-48-02.png'
  //return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&w=1024&h=1024`;
}
function makeUnsplashThumbnail (id, orientation = 'landscape') {
	const dimensions = orientation === 'square'
		? 'w=300&h=300'
		: 'w=240&h=159';

      return 'http://localhost:8000/media/uploads/2017/05/25/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2017-04-06_03-48-02.png'
//	return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&crop=faces&fit=crop&${dimensions}`;
}
const DEFAULT_IMAGES = [
	{ id: '1470619549108-b85c56fe5be8', caption: 'Photo by Alan Emery', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/SYzUF6XcWBY (Flamingo)
	{ id: '1471079502516-250c19af6928', caption: 'Photo by Jeremy Bishop', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/GIpGxe2_cT4 (Turtle)
	{ id: '1454023492550-5696f8ff10e1', caption: 'Photo by Jessica Weiller', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/LmVSKeDy6EA (Tiger)
	{ id: '1470854989922-5be2f7456d78', caption: 'Photo by Piotr Łaskawski', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/GXMr7BadXQo (Hedgehog)
	{ id: '1470317596697-cbdeda56f999', caption: 'Photo by Michel Bosma', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/XgF9e93Tkt0 (Ladybug)
];
*/

let mapStateToProps=(state)=>{
  return {
    uname: state.login_reducer.uname,
    ubase64: state.login_reducer.ubase64,
    loginStatus: state.login_reducer.loginStatus,
    imagelist: state.image_reducer.imagelist
  };
}

let mapDispatchToProps=(dispatch)=>{
  return {
    postImage: (ubase64, files)=>dispatch(PostImageRequest(ubase64, files)),
    getImage: (ubase64)=>dispatch(GetImageRequest(ubase64)),
    deleteImage: (ubase64, idlist)=>dispatch(DeleteImageRequest(ubase64,idlist))
  };
}

//  getArticle: (ubase64)=>dispatch(GetArticleRequest(ubase64))

//export default ArticleList
export default connect(mapStateToProps, mapDispatchToProps)(Image);
