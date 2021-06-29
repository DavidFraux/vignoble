//tag filters https://codepen.io/goldbullet/pen/bZPOAK
import React from "react"
import Header from '../components/header.js';
import Container from "../components/container"

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

import Masonry from 'react-masonry-css'
import InfiniteScroll from "react-infinite-scroll-component";


const title = 'En savoir plus';

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
      page : 0,
    };
    this.slideModalRef = React.createRef();
  }


  getData = () => {
    fetch(
      `https://api.unsplash.com/photos?client_id=ZqXbcY28ANlOVeIWmpXwtR9ZKeB44r24xyNIf2uVzC8&page=${
        this.state.page + 1
      }`
    )
      .then((response) => response.json())
      .then((res) => {
        this.setState({imagesData:[...this.state.imagesData, ...res]});
      })
      .catch((err) => {});
  }

  fetchData = () => {
    this.setState((prevState) => ({page: prevState.page + 1}));
    this.getData();
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
    this.getData();
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }


  handleModalClick(e) {
    if (this.slideModalRef && (e.target  != this.slideModalRef.current) ) {
      this.setState({imageModal: {showModal: false,}});
    }
  }


  render () {
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
                  <img
                    className={imgInGrid}
                    src={photo.urls.thumb}
                    alt={photo.alt_description}
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
                ref={this.slideModalRef}
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

            <a href="#" className={prev} onClick={() => this.navigatePict(-1)}>
              &#10094;
            </a>
            <a href="#" className={next} onClick={() => this.navigatePict(+1)}>
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