//tag filters https://codepen.io/goldbullet/pen/bZPOAK
import React, { Suspense } from "react";
import Header from '../components/header.js';
import Loading from '../components/loading.js';
import fetchAPI from '../components/fetchREST.js';

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
  imgInGrid,
  scrollState} from './savoirPlus.module.css'

import Masonry from 'react-masonry-css';
import InfiniteScroll from "react-infinite-scroll-component";


const title = 'Découvrir plus';


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
      hasMorePict : true,
      imgCount : 11,//so it tries to load picture, will be updated by "count" api request response
    };
    this.pictModalRef = React.createRef();
    this.nextModalRef = React.createRef();
    this.prevModalRef = React.createRef();
  }


  fetchData = () => {
    const loadedPictureBatch = 10;
    fetchAPI(`moreimages?_start=${this.state.loadedPict}&_limit=${loadedPictureBatch}`).then( apiMoreImages => {
      const newData = [];
      apiMoreImages.sort((a, b) => a.id - b.id);// sort the array with ascending id
      for (const  moreImg of apiMoreImages) {
        newData.push({
          urls:{
            regular : 
              moreImg.image.formats.large ? 
              process.env.GATSBY_API_URL + moreImg.image.formats.large.url 
              : process.env.GATSBY_API_URL + moreImg.image.url,
            thumb: process.env.GATSBY_API_URL + moreImg.image.formats.small.url,
          },
          id: moreImg.id,
          alt: moreImg.image.alternativeText ? moreImg.image.alternativeText : moreImg.title,
          title: moreImg.title, 
          description: moreImg.description ? moreImg.description : moreImg.title
        });
      };
      this.setState((prevState) => ({
        loadedPict: prevState.loadedPict + newData.length,
        imagesData:[...prevState.imagesData, ...newData],
        hasMorePict : (this.state.imgCount > prevState.loadedPict + newData.length)
      }));
    }); 
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
    fetchAPI('moreimages/count').then( count => { 
      this.setState({imgCount: count});
    });
    this.fetchData();
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
    return (
    <React.Fragment>
      <title>{title}</title>
      <Header headerText = {title} className= {header} />

      <InfiniteScroll
        dataLength={this.state.imagesData.length}
        next={this.fetchData}
        hasMore={this.state.hasMorePict}
        loader={<div className={scrollState}><Loading dark={true} /></div>}
        scrollThreshold="50px"
        endMessage={
          <p className={scrollState}>
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
                          title: photo.title? photo.title : "pas de titre pour cette image",
                          description: photo.description? photo.description : "pas de légende pour cette image",
                          imageIndex: index,
                          currentSectionLength: this.state.imagesData.length
                        }
                      });
                    }}
                  />
                  <div className={gridCaption}>{photo.title? photo.title : "pas de titre pour cette image"}</div>
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
                <div className={modalCaption}>description&nbsp;: {this.state.imageModal.description}</div>
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