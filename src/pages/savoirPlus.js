//tag filters https://codepen.io/goldbullet/pen/bZPOAK
import React from "react"
import Header from '../components/header.js';
import Container from "../components/container"

import {
  photoItem,
  modal,
  modalPict,
  modalCaption,
  close,
  mySlides,
  prev,
  next,
grid,
column,
header,} from './savoirPlus.module.css'

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
  }

  
  componentDidMount() {
    this.getData();
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
    console.log("fetching");
    this.setState((prevState) => ({page: prevState.page + 1}));
    this.getData();
  }

  navigatePict = (side) => {
    //side is -1 for previous // +1 for next
    let targetImageIndex = this.state.imageModal.imageIndex + side;
    if (targetImageIndex > this.state.imagesData.length-1) {targetImageIndex=0}
    else if (targetImageIndex < 0 ) {targetImageIndex=this.state.imagesData.length-1};
    let data = this.state.imagesData[targetImageIndex];
    console.log(targetImageIndex, data);
    this.setState((prevState) => ({
      imageModal: {
        ...prevState.imageModal,
        imageIndex: targetImageIndex,
        modalSrc: data.urls.regular
      }
    }));
  }


  render () {
    console.log(this.state);
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
                    src={photo.urls.thumb}
                    alt={photo.alt_description}
                    onClick={() => {
                      this.setState({
                        imageModal: {
                          showModal: true,
                          modalSrc: photo.urls.regular,
                          caption: photo.alt_description? photo.alt_description : "pas de légende pour cette image",
                          imageIndex: index,
                          currentSectionLength: this.state.imagesData.length
                        }
                      });
                    }}
                  />
                  <span>{photo.alt_description? photo.alt_description : "pas de légende pour cette image"}</span>
                </div>
              ))}
      </Masonry>
        </InfiniteScroll>

        <div
          id="myModal"
          className={modal}
          style={{ display: this.state.imageModal.showModal ? "block" : "none" }}
        >
          <div>
            <span
              className={close}
              onClick={() =>
                this.setState({imageModal: {showModal: false,}})
                //setImageModal((modal) => ({ ...modal, showModal: false }))
              }
            >
              &times;
            </span>

            <div
              className={mySlides}
              style={{ display: this.state.imageModal.showModal ? "block" : "none" }}
            >
              <img
                className={modalPict}
                id="img01"
                src={this.state.imageModal.modalSrc}
                alt=""
              />
              <span className={modalCaption}>{this.state.imageModal.caption}</span>
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



///////////////////////////////////////
