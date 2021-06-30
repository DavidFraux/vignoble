//tag filters https://codepen.io/goldbullet/pen/bZPOAK
import React, { Suspense } from "react"
import Header from '../components/header.js';
import dataSavoirPlus from "../data/savoirPlus.json";
import placeHolderPict from "../images/placeHolder.png";

import {
  photoItem,
  modal,
  modalPict,
  close,
  mySlides,
  prev,
  next,
  grid,
  column,
  header,
  modalInfoBox,
  modalTitle, 
  modalCaption,
  gridCaption,
  imgInGrid,} from './savoirPlus.module.css'

import crypto from 'crypto';
import Masonry from 'react-masonry-css';
import InfiniteScroll from "react-infinite-scroll-component";


const title = 'En savoir plus';
const pictureFolder = require.context('../images/savoirPlus', false, /./ , 'lazy');//'lazy': the underlying files will be loaded asynchronously -> using 
const loadedPictureBatch = 10;

//helps the understanding of webpack loader
// pictureFolder.keys().forEach(filePath => {
//   // load the component
// //  pictureFolder(filePath).then(module => {
// //         // module.default is the vue component
// //     console.log(module.default);
// //   });
// });

class savoirPlus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesData : [],
      imageModal: {
        showModal: false,
        modalSrc: null,
        imageIndex: null,
        currentSectionLength: null
      },
      loadedPict : 0,
    };
    this.pictModalRef = React.createRef();
    this.nextModalRef = React.createRef();
    this.prevModalRef = React.createRef();
  }

  dataLoader = () => {
    const from =  this.state.loadedPict ;
    if (dataSavoirPlus.length <= from) {return} ;
    const until = Math.min( this.state.loadedPict + loadedPictureBatch  , dataSavoirPlus.length );
    console.log('from ', from, ' ;  to ', until );
    const newData = [];
    for (let i = from ; i < until; i++) {
      const pict = dataSavoirPlus[i];
      pictureFolder("./" + pict.urls.regular).then(module => {
        pict.urls.regular = module.default;
        this.setState({});//force to re-render after promise is completed
      }).catch(err => {
        pict.urls.regular = placeHolderPict;
        console.log(err);
      });
      pictureFolder("./" + pict.urls.thumb).then(module => {
        pict.urls.thumb = module.default;
        this.setState({});
      }).catch(err => {
        pict.urls.thumb = placeHolderPict;
        console.log(err);
      });
      pict.id ? (pict.id = pict.id) : (pict.id = crypto.randomBytes(20).toString('hex'));
      newData.push(pict);
      console.log(pict);
    }
    this.setState((prevState) => ({
      loadedPict: prevState.loadedPict + until,
      imagesData:[...prevState.imagesData, ...newData]
    }));
  }

  // getData = () => {
  //   fetch(
  //     `https://api.unsplash.com/photos?client_id=ZqXbcY28ANlOVeIWmpXwtR9ZKeB44r24xyNIf2uVzC8&page=${
  //       this.state.page + 1
  //     }`
  //   )
  //     .then((response) => response.json())
  //     .then((res) => {
  //       this.setState({imagesData:[...this.state.imagesData, ...res]});
  //     })
  //     .catch((err) => {});
  // }

  fetchData = () => {
    //this.getData();
    this.dataLoader();
  }

  navigatePict = (side) => {
    //side is -1 for previous // +1 for next
    let targetImageIndex = this.state.imageModal.imageIndex + side;
    if (targetImageIndex > this.state.imagesData.length-1) {targetImageIndex=0}
    else if (targetImageIndex < 0 ) {targetImageIndex=this.state.imagesData.length-1};
    let data = this.state.imagesData[targetImageIndex];
    this.setState((prevState) => ({
      imageModal: {
        ...prevState.imageModal,
        imageIndex: targetImageIndex,
        modalSrc: data.urls.regular,
        id: data.id,
        title: data.description? data.description : "pas de titre pour cette image",
        caption: data.alt_description? data.alt_description : "pas de légende pour cette image",
      }
    }));
  }
  componentDidMount() {
    //this.getData();
    this.dataLoader();
  }



  handleModalClick(e) {//check wether the click on slide is not on the picture, nor on the next or previous button
    if (this.pictModalRef 
      && this.prevModalRef 
      && this.nextModalRef 
      && (e.target  !==  this.pictModalRef.current) 
      && (e.target  !==  this.prevModalRef.current) 
      && (e.target  !==  this.nextModalRef.current)
      ) {
      this.setState({imageModal: {showModal: false,}});
    }
  }


  render () {
    console.log(this.state.imagesData);
    return (
    <React.Fragment>
      <title>{title}</title>
      <Header headerText = {title} customClass= {header} />

        <InfiniteScroll
          dataLength={this.state.imagesData.length}
          next={this.fetchData}
          hasMore={true}
          loader={<h4>ça charge...</h4>}
          scrollThreshold="50px"
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>il n'y pas d'autres images à afficher</b>
            </p>
          }
        >
      <Masonry
        breakpointCols={3}
        className={grid}
        columnClassName={column}>
        {this.state.imagesData &&
              this.state.imagesData.map((photo, index) => (
                <div className={photoItem} key={index}>
                  <Suspense fallback={<div>Chargement...</div>}>
                  <img
                    className={imgInGrid}
                    src={photo.urls.thumb}
                    alt={'alt : ' + photo.alt_description}
                    onClick={() => {
                      this.setState({
                        imageModal: {
                          showModal: true,
                          modalSrc: photo.urls.regular,
                          id: photo.id,
                          title: photo.description? photo.description : "pas de titre pour cette image",
                          caption: photo.alt_description? photo.alt_description : "pas de légende pour cette image",
                          imageIndex: index,
                          currentSectionLength: this.state.imagesData.length
                        }
                      });
                    }}
                  />
                  </Suspense>
                  <div className={gridCaption}>{photo.description? photo.description : "pas de titre pour cette image"}</div>
                </div>
              ))}
      </Masonry>
        </InfiniteScroll>

        <div
          id="myModal"
          className={modal}
          style={{ display: this.state.imageModal.showModal ? "block" : "none" }}
          onClick={(e) =>this.handleModalClick(e)}
        >
          <div>
            <span
              className={close}
              onClick={() =>
                this.setState({imageModal: {showModal: false,}})
              }
            >
              &times;
            </span>

            <div
              className={mySlides}
              style={{ display: this.state.imageModal.showModal ? "block" : "none" }}
            >
              <img
                ref={this.pictModalRef}
                className={modalPict}
                id={this.state.imageModal.id}
                src={this.state.imageModal.modalSrc}
                alt={this.state.imageModal.title}
              />
              <div className={modalInfoBox}>
                <div className={modalTitle}>titre&nbsp;: {this.state.imageModal.title}</div>
                <div className={modalCaption}>description&nbsp;: {this.state.imageModal.caption}</div>
              </div>
            </div>

            <a href="#" ref={this.prevModalRef} className={prev} onClick={() => this.navigatePict(-1)}>
              &#10094;
            </a>
            <a href="#" ref={this.nextModalRef} className={next} onClick={() => this.navigatePict(+1)}>
              &#10095;
            </a>

            <div />
          </div>
        </div>

    </React.Fragment>
    )
  };

}

export default savoirPlus