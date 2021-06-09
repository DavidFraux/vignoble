import React from 'react';
import Header from '../components/header.js';
import TouchSwipeEvents from '../components/TouchSwipeEvents.js'
import {
  videosWrapper,
  controlsWrapper,
  mediaControls,
  toggle,
  videoLeft,
  video,
  videoRight,
  infoBoxes2,
  infoBox2,
  donutWrapper2,
  description2,
  duration2,
  saviezVous2,
  infoBoxTitle,} from './pasApas.module.css'
import TimeLine from "../components/timeLine";
import AnalogClock from "../components/analogClock"
import Donut from "../components/donut"
import { MdSkipPrevious, MdPause, MdPlayArrow, MdSkipNext, MdInfoOutline, MdSettings} from 'react-icons/md';
import { GiDuration } from 'react-icons/gi'


import footPoster from '../images/videoPosters/footPoster.jpg';
import footZoomPoster from '../images/videoPosters/footZoomPoster.jpg';
import pyramidPoster from '../images/videoPosters/pyramidPoster.jpg';
import tikalPoster from '../images/videoPosters/tikalPoster.jpg';
import lakePoster from '../images/videoPosters/lakePoster.jpg';
import lakeViewPoster from '../images/videoPosters/lakeViewPoster.jpg';
import gatePoster from '../images/videoPosters/gatePoster.jpg';
import foretPoster from '../images/videoPosters/foretPoster.jpg';

import postertest from '../images/videoPosters/postertest.png';

import poster0 from '../images/videoPosters/poster0.jpg';
import poster1 from '../images/videoPosters/poster1.jpg';
import poster2 from '../images/videoPosters/poster2.jpg';
import poster3 from '../images/videoPosters/poster3.jpg';
import poster4 from '../images/videoPosters/poster4.jpg';
import poster5 from '../images/videoPosters/poster5.jpg';
import poster6 from '../images/videoPosters/poster6.jpg';
import poster7 from '../images/videoPosters/poster7.jpg';
import poster8 from '../images/videoPosters/poster8.jpg';
import poster9 from '../images/videoPosters/poster9.jpg';
import poster10 from '../images/videoPosters/poster10.jpg';
import poster11 from '../images/videoPosters/poster11.jpg';
import poster12 from '../images/videoPosters/poster12.jpg';


const title = 'Le fonctionnement du pressoir long-fut pas à pas';
const baseURL = 'https://uncloud.univ-nantes.fr/index.php/s/eL8zoRTzJMB9L53/download?path=/&files=';
const steps = [{
    title: 'Verser',
    short: 'Verser le raisin frais dans la maie',
    description: 'Directement issu de la vendange le raisin frais est étalé dans la maie',
    annecdote: 'Les pressoirs sont construits par des charpentiers, avec des chênes locaux. Il fallait 5 à 6 chênes pour faire un grand pressoir. ',
    videoRight: baseURL+"pressage0.mp4",
    posterRight: poster0,
    videoLeft: baseURL+"test.webm",
    posterLeft: postertest,
    duration : 15,
  }, {
    title: 'Fouler',
    short: 'Fouler le raisin dans la maie',
    description: `Avec les pieds, à plusieurs, parfois en musique, les jeunes foulent le raisin dans la maie.
                  Les jeunes filles, qui ont aussi vendangé, chantent pour donner le rythme. 
                  Cette opération casse les peaux de raisins, libère le jus et rend l'ensemble plus compact.
                  Ce travail peut être remplacé par un moulin à vendange posé dans la maie.`,
    annecdote: `Le pressoir du musée possède 2 maies: on foule le raisin dans la maie basse, pendant qu'une pressée est menée dans la maie haute. 
                Surement le signe d'un domaine important.`,
    videoRight:baseURL+"pressage1.mp4",
    posterRight: poster1,
    videoLeft:baseURL+"tikal.mp4",
    posterLeft: tikalPoster,
    duration : 50,
  }, {
    title: '1er moût',
    short: `Un premier moût (jus) de raisin peut être recueilli`,
    description: `En foulant le raisin un premier moût s'écoule par l'anche. Le viticulteur puise le moût dans le jarlot pour le mettre en barrique.
                  Le jus sera naturellement stérilisé par l'alcool qui se developpera dans le vin.`,
    annecdote: 'Le pressoir est totalement en bois, le jus ne trouve jamais de metal sur son passage, cela pourrait altérer le goût du vin',
    videoRight:baseURL+"pressage2.mp4",
    posterRight: poster2,
    videoLeft:baseURL+"lakeView.mp4",
    posterLeft: lakeViewPoster,
    duration : 10,
  }, {
    title: 'Constituer',
    short: 'Les grapes de raisin sont organisé en cep (tas de raisin à presser)',
    description: `Les raisins sont disposés de façon pyramidale dans la haute maie.
                Un écart de 20 à 30 cm est laissé entre les banchots de la maie et le cep.
                Souvent de la paille est installée  - au moins aux angles -  pour maintenir le cep. `,
    annecdote: `Il fallait 4 à 5 personnes pour faire fonctionner un pressoir comme celui du musée`,
    videoRight:baseURL+"pressage3.mp4",
    posterRight: poster3,
    videoLeft:baseURL+"foret.mp4",
    posterLeft: foretPoster,
    duration : 25,
  }, {
    title: 'Habiller',
    short: `Le cep est couvert de pièces de bois destinées à répartir la charge de pressage`,
    description: `La couverture sert à répartir la pression sur l'ensemble du cep.
                  On dispose d'abord 2 perches appelées quenouilles, 
                  puis, les couchages, puis les moutons.
                  Au-dessus encore, 2 ou 3 madriers plus courts, les blins reçoivent le fût haut.`,
    annecdote: `Les couchages sont des madrierrs de 6 à 7 cm d'épaisseur,
                Les moutons font 15 cm d'épaisseur`,
    videoRight: baseURL+"pressage4.mp4",
    posterRight: poster4,
    videoLeft: baseURL+"footZoom.mp4",
    posterLeft: footZoomPoster,
    duration : 20,
  }, {
    title: 'Positionner',
    short: `Le fut-haut (poutre mobile) du pressoir est positionnée, prêt à presser.`,
    description: `Le fut haut est verrouillée d'un coté grâce aux aiguilles. Les aiguilles sont les pièces de bois qui sont déplacées dans les fente appelées "lumières". 
                  Le serrage est optimal quand le fût haut est à l'horizontal. On est alors en position pour presser.`,
    annecdote: `Le pressoir "parle" lorsque la vis en bois tourne : elle frotte sur l'écrou. 
                Chaque pressoir avait une vis, un écrou et donc une "voix" différente. `,
    videoRight:baseURL+"pressage5.mp4",
    posterRight: poster5,
    videoLeft:baseURL+"lakeView.mp4",
    posterLeft: lakeViewPoster,
    duration : 15,
  }, {
    title: 'Presser',
    short: `En serrant la vis, on presse le cep`,
    description: `Deux personnes sont necessaires pour tourner la vis et abaisser le fut-haut. Il est fixe de l'autre coté, verrouillé par les aiguilles.
                  Sous la pression le fut haut est arqué, au fur et à mesure de la pressée, il reprend sa forme normale. `,
    annecdote: `Le pressoir du musée est le dernier à conserver sa vis en bois.
                La vis, soumise à de fortes contraintes, casse facilement.
                Progressivement les vis en bois sont remplacées par des pièces en métal.`,
    videoRight:baseURL+"pressage6.mp4",
    posterRight: poster6,
    videoLeft:baseURL+"tikal.mp4",
    posterLeft: tikalPoster,
    duration : 15,
  }, {
    title: 'Moût',
    short: `Le moût est receuilli, versé dans des barriques.`,
    description: `La pression est maintenue plusieurs heures pour récupérer tout le moût, parfois même toute la nuit.
                  Régulièrement on ressere la vis. On utilisait du cormier, du frêne ou du chataignier comme ici.`,
    annecdote: `Au niveau de la vis, il faut bloquer le levier de serrage en frêne sinon la vis risque de "dévirer" sous la pression.`,
    videoRight: baseURL+"pressage7.mp4",
    posterRight: poster7,
    videoLeft:baseURL+"lakeView.mp4",
    posterLeft: lakeViewPoster,
    duration : 180,
  }, {
    title: 'Relacher',
    short: `Après plusieurs heures, on relache la pression.`,
    description: `Après plusieurs heures, le moût ne coule plus et la vis est dure à tourner. Les marges ont glissé hors de la pression des couchages.
                  Inutile alors de presser davantage, il faut manoeuvre pour soulever le fut haut et relacher la pression.`,
    annecdote: `On ne peut pas presser davantage car le cep est trop compact et étalé sur la périphérie. On dit alors que les "courants de vin" ne passent plus.`,
    videoRight: baseURL+"pressage8.mp4",
    posterRight: poster8,
    videoLeft: baseURL+"footZoom.mp4",
    posterLeft: footZoomPoster,
    duration : 10,
  }, {
    title: 'Manoeuvrer',
    short: `On positionne le fut en hauteur`,
    description: `En manipulant les aiguilles, on leve progressivement le fut en porte à faux au dessus de la maie pour libérer l'accès au cep.`,
    annecdote: ``,
    videoRight:baseURL+"pressage9.mp4",
    posterRight: poster9,
    videoLeft:baseURL+"tikal.mp4",
    posterLeft: tikalPoster,
    duration : 10,
  }, {
    title: 'Déshabiller',
    short: 'La couverture du cep est retirée',
    description: `La couverture du cep est retirée `,
    annecdote: `Les maies sont assemblées avec précision par les charpentiers.
                Avant les vendanges, ils réparent et resserrent les pièces.
                Ils renforcent l'étanchéité des maies, en utilisant des joints en jonc ou en terre glaise. `, 
    videoRight:baseURL+"pressage10.mp4",
    posterRight: poster10,
    videoLeft:baseURL+"lakeView.mp4",
    posterLeft: lakeViewPoster,
    duration : 20,
  }, {
    title: 'Tailler',
    short: `On taille la périphérie du cep, qui s'est étalé sous la pression`,
    description: `Le cep s'est étalé sous la pression, il est très compact. Il faut libérer un passage en périphérie et de décompacter les grapes.
                  Pour le décompacter et le reformer il faut le tailler. 
                  On utilise un "couteau à pressoir". `,
    annecdote: ``,
    videoRight:baseURL+"pressage11.mp4",
    posterRight: poster11,
    videoLeft:baseURL+"foret.mp4",
    posterLeft: foretPoster,
    duration : 45,
  }, {
    title: 'Reformer',
    short: 'Le cep est reformé en pyramide, pour rpesser ce qui reste.', 
    description:`La râpe est brassée à la fourche et rechargée sur le cep. 
                On reforme le cep en laissant un passage périphérique au moût. 
                Souvent 2 ou 3 pressurages sont nécessaires pour assécher le cep car ses marges glissent hors de la pression des couchages.`,
    annecdote: `Il faut parfois revenir en pleine nuit pour serrer la vis d'un petit tour lors du pressurage.`, 
    videoRight:baseURL+"pressage12.mp4",
    posterRight: poster12,
    videoLeft:baseURL+"foret.mp4",
    posterLeft: foretPoster,
    duration : 30,
  }];




class PasApas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStepIndex: 0,
      //readyVideo : 0,//managing wait for loaded content OR wait for video ends
      Lready : false,
      Rready : false,
      Lended: false,
      Rended: false,
      Lplaying: false,
      Rplaying: false,
      paused: false,
    };
    this._isMounted = false;
    this.videoL = React.createRef();
    this.videoR = React.createRef();
  }

  resetVideoStates() {
    this.setState({
      Lready : false,
      Rready : false,
      Lended: false,
      Rended: false,
      Lplaying: false,
      Rplaying: false,
    });
  }

  onClickStep(i) {
    if (this.state.activeStepIndex !== i) {
      this.setState({activeStepIndex: i,});
      this.setState({paused: false,});
      this.resetVideoStates();
    };
  }


  navigateSteps(i) {
    if (this._isMounted) {//protect from state changes if the component is unmounted during the timeOut
      const targetIndex = this.state.activeStepIndex + i;
      if(targetIndex < 0 ) {
        return false;
      };
      if(targetIndex  >= steps.length ) {
        this.setState({activeStepIndex:4});
        //#TODO somehow display onscreen message "on recommence une seconde pressée"
      } 
      else {//for all the other "normal" cases
        this.setState((prevState) => ({activeStepIndex: prevState.activeStepIndex + i}));
      }
      this.videoL.current.load();
      this.videoR.current.load();
      this.resetVideoStates();
    }
  }

  handleVideoEnded(side) {
    if (this.state.paused) {return false};
    if (side === 'L') {
      this.setState({Lplaying: false, Lended : true});
      if (this.state.Rended) {setTimeout(() => this.navigateSteps(1), 1000 )};
    }  else {
      this.setState({Rplaying: false, Rended : true});
      if (this.state.Lended) {setTimeout(() => this.navigateSteps(1), 1000 )};
    };
  }

  handleVideoReady(side) {
    if (this.state.paused) {return false};
    if (side === 'L') {
      this.setState({Lready : true});
      if (this.state.Rready) {setTimeout(() => this.playBoth(), 500 )}; //wait a littleBit the browser and element to really sync};
    }  else {
      this.setState({Rready : true});
      if (this.state.Lready) {setTimeout(() => this.playBoth(), 500 )};
    }
  }

  playBoth () {
    if (this._isMounted) {//protect from state changes if the component is unmounted during the timeOut
      if (!this.state.Lended)  { this.setState({ Lplaying: true}) };
      if (!this.state.Rended)  { this.setState({ Rplaying: true}) };
    }
  }

  //TODO replay button

  togglePlay() {
    if (this.state.paused) {
      this.playBoth()
      this.setState({ paused: false});
    } else {
      this.setState({ Lplaying: false, Rplaying: false, paused: true});
    }
  }

  handleVideoClick() {
    this.togglePlay()
  }

  handlePrev() {
    this.navigateSteps(-1);
    this.setState({paused: false,});
  }

  handleNext() {
    this.navigateSteps(1);
    this.setState({paused: false,});
  }

  handleswipes(i) {
    (i === 'left')? this.handleNext() : this.handlePrev();
  }

  componentDidUpdate() {
    this.state.Lplaying ? this.videoL.current.play() : this.videoL.current.pause();
    this.state.Rplaying ? this.videoR.current.play() : this.videoR.current.pause();
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false; 
  }

  render() {
    //the followin manage the onClick behavious for each step of the timeLine
    for (const [index, step] of steps.entries()) {
      step.onClick = (e) => {
        e.preventDefault();
        this.onClickStep(index);
      };
    };
    const currentStep = steps[this.state.activeStepIndex];
    return (
      <React.Fragment>
        <title>{title}</title>
        <Header headerText = {title}/>

        <TouchSwipeEvents onSwiped = {(i) => this.handleswipes(i)}/>
        <div className={controlsWrapper}>
          <button className = {mediaControls}             onClick={() => this.handlePrev()}>{<MdSkipPrevious size='1.5x'/>}</button>
          <button className = {mediaControls} id={toggle} onClick={() => this.togglePlay()}>{this.state.paused ? <MdPlayArrow size='1.5x'/> : <MdPause size='1.5x'/> }</button>
          <button className = {mediaControls}             onClick={() => this.handleNext()}>{<MdSkipNext size='1.5x'/>}</button>
        </div>
        
        <TimeLine steps={steps} activeStepIndex={this.state.activeStepIndex} navigateSteps = {(i) => this.navigateSteps(i)}/>
          <React.Fragment>
            <div className={videosWrapper}>
              <video 
                  muted
                  key={currentStep.title+'L'}
                  src={currentStep.videoLeft}
                  poster={currentStep.posterLeft}
                  preload={'auto'}
                  type={'video/mp4'}
                  id={videoLeft}
                  className={`${videoLeft} ${video}`}
                  ref={this.videoL}
                  onCanPlayThrough={() => this.handleVideoReady('L')}
                  onClick={() => this.handleVideoClick()}
                  onEnded={() => this.handleVideoEnded('L')}
                  >
                  <p>impossible de charger la video</p>
              </video>

              <video
                  muted
                  key={currentStep.title+'R'}
                  src={currentStep.videoRight}
                  poster={currentStep.posterRight}
                  preload={'auto'}
                  type={'video/mp4'}
                  id={videoRight}
                  className={`${video} ${videoRight}`}
                  ref={this.videoR}
                  onCanPlayThrough={() => this.handleVideoReady('R')}
                  onClick={() => this.handleVideoClick()}
                  onEnded={() => this.handleVideoEnded('R')}
                  >
                  <p>impossible de charger la video</p>
              </video>
            </div>
            
            <div className = {infoBoxes2} >
              <div className = {donutWrapper2} >
                <Donut steps={steps} activeStepIndex={this.state.activeStepIndex}/>
              </div>
              <div className = {`${infoBox2} ${duration2}`}>
                <div className = {infoBoxTitle} ><GiDuration/>  Durée </div>
                <span>environ {currentStep.duration} minutes</span>
              </div>
              <div className = {`${infoBox2} ${description2}`}>
                <div className = {infoBoxTitle} ><MdSettings/>  À cette étape  </div>
                <span>{currentStep.description}</span>
              </div>
              <div className = {`${infoBox2} ${saviezVous2}`}>
                <div className = {infoBoxTitle} ><MdInfoOutline/>  Le saviez-vous ?</div>
                <span>{currentStep.annecdote}</span>
              </div>
            </div>
        </React.Fragment>
      </React.Fragment>
    )
  };
}

export default PasApas