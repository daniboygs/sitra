import React from 'react';
import map1 from '../../assets/img/mapa.png';
import map2 from '../../assets/img/mapa2.png';
import map3 from '../../assets/img/mapa3.png';

import num1 from '../../assets/img/numeracion.png';
import num2 from '../../assets/img/numeracion2.png';

import plot from '../../assets/img/plot.png';

import hdGenerPlot from '../../assets/img/hdsexo.png';
import hdGenerTable from '../../assets/img/thdsexo.png';

import daiPlot from '../../assets/img/dai2019.png';
import daiTable from '../../assets/img/tdai2019.png';

import fiscal from '../../assets/img/fiscal.jpg';

import { ModalView } from './modal'



class Home extends React.Component{

  constructor(props){
    super(props);
    this.state={
      showModal: false,
      modalViewTitle: '',
      modalImage: null,
    }
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleSetModalProps = this.handleSetModalProps.bind(this);
  }

  handleSetModalProps = (obj) => {
    switch(obj){
      case 'map':
        this.setState({
          modalViewTitle: 'Mapa estatal dividido por fiscalías regionales y municipios de Michoacán',
          modalImage: map3
        });
        break;
      case 'plot':
        this.setState({
          modalViewTitle: 'Homicidio doloso',
          modalImage: plot
        });
        break;
      case 'daiPlot':
        this.setState({
          modalViewTitle: 'Delitos de alto impacto 2019',
          modalImage: daiPlot
        });
        break;
      case 'daiTable':
        this.setState({
          modalViewTitle: 'Cantidad de delitos de alto impacto 2019',
          modalImage: daiTable
        });
        break;
      case 'hdGenerPlot':
        this.setState({
          modalViewTitle: 'Homicidio doloso por genero 2019',
          modalImage: hdGenerPlot
        });
        break;
      case 'hdGenerTable':
        this.setState({
          modalViewTitle: 'Cantidad de homicidios dolosos 2019',
          modalImage: hdGenerTable
        });
        break;
      case 'fiscal':
        this.setState({
          modalViewTitle: 'Adrián López',
          modalImage: fiscal
        });
        break;
      default:
        this.setState({
          modalViewTitle: 'Mapa de las fiscalias regionales de Michoacán',
          modalImage: map3
        });
        break;
    }
    this.handleShowModal(true);
  }

  handleShowModal = (value) => {
    this.setState({
      showModal: value
    });
  }
  
    render() {
        return (
          <>

<ModalView style={{width: '100%'}}  image={this.state.modalImage} showModal={this.state.showModal} setShow={this.handleShowModal} title={this.state.modalViewTitle}></ModalView>
          
{/*<div style={{display: 'inline-block', width: '100%'}}>
  <div className="shadow-box z-depth-5" style={{alignItems: 'center', textAlign: 'center'}}>

  <div style={{width: '100%', paddingTop: '10px', display: 'inline', alignItems: 'center', textAlign: 'center'}}>

    <img src={map1} width='825px' height='496px'/>

  </div>

  </div>
</div>

<br/>

<br/>


<div style={{display: 'inline-block', width: '100%'}}>

  <div className="shadow-box z-depth-5" style={{width: '49%', alignItems: 'center', textAlign: 'center', float: 'left'}}>

      <img src={plot} width='100%'/>

      <div class="card-body text-center" style={{backgroundColor: '#152F4A'}}>
          <h3 class="card-title white-text" style={{textAlign: 'center', fontFamily: 'LabradorA'}}>Homicidio doloso</h3>
          <p class="card-text white-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim ipsam voluptatem quia voluptas.</p>
      </div>

  </div>


  <div className="shadow-box z-depth-5" style={{width: '49%', alignItems: 'center', textAlign: 'center', float: 'right'}}>

      <img src={map1} width='100%'/>

      <div class="card-body text-center" style={{backgroundColor: '#152F4A'}}>
          <h3 class="card-title white-text" style={{textAlign: 'center', fontFamily: 'LabradorA'}}>Mapa de las fiscalias regionales de Michoacán</h3>
          <p class="card-text white-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim ipsam voluptatem quia voluptas.</p>
      </div>

  </div>

</div>

<br/>




<div style={{display: 'inline-block', width: '100%'}}>

  <div className="shadow-box z-depth-5" style={{width: '49%', alignItems: 'center', textAlign: 'center', float: 'left'}}>


      <img src={plot} width='100%'/>

      <div class="card-body text-center" style={{backgroundColor: '#152F4A'}}>
          <h3 class="card-title white-text" style={{textAlign: 'center', fontFamily: 'LabradorA'}}>Homicidio doloso</h3>
          <p class="card-text white-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim ipsam voluptatem quia voluptas.</p>
      </div>


  </div>


    <div className="shadow-box z-depth-5" style={{width: '49%', alignItems: 'center', textAlign: 'center', float: 'right'}}>


      <img src={map3} width='100%' style={{cursor: 'zoom-in'}} onClick={()=>this.handleSetModalProps('map')} />

      <div class="card-body text-center" style={{backgroundColor: '#152F4A'}}>
          <h3 class="card-title white-text" style={{textAlign: 'center', fontFamily: 'LabradorA'}}>Mapa de las fiscalias regionales de Michoacán</h3>
          <p class="card-text white-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim ipsam voluptatem quia voluptas.</p>
      </div>


    </div>

</div>

<br/> */}

{/* 
<div style={{display: 'inline-block', width: '100%'}}>

  <div className="shadow-box z-depth-5" style={{width: '49%', alignItems: 'center', textAlign: 'center', float: 'left'}}>


      <img src={plot} width='825px' height='496px'/>

      <div class="card-body text-center" style={{backgroundColor: '#152F4A'}}>
          <h3 class="card-title white-text" style={{textAlign: 'center', fontFamily: 'LabradorA'}}>Homicidio doloso</h3>
          <p class="card-text white-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim ipsam voluptatem quia voluptas.</p>
      </div>


  </div>


    <div className="shadow-box z-depth-5" style={{width: '49%', alignItems: 'center', textAlign: 'center', float: 'right'}}>


      <img src={map3} width='825px' height='496px' style={{cursor: 'zoom-in'}} onClick={()=>this.handleShowMap(true)} />

      <div class="card-body text-center" style={{backgroundColor: '#152F4A'}}>
          <h3 class="card-title white-text" style={{textAlign: 'center', fontFamily: 'LabradorA'}}>Mapa de las fiscalias regionales de Michoacán</h3>
          <p class="card-text white-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim ipsam voluptatem quia voluptas.</p>
      </div>


    </div>

</div>

<br/>
*/}

<div style={{width: '100%', display: 'inline-block', height: '700px'}}>

  <div className="shadow-box z-depth-5" style={{width: '49%', height: '700px', alignItems: 'center', textAlign: 'center', float: 'left', marginTop: '15px', marginBottom: '15px', marginRight: '15px', display: 'inline-flex', backgroundColor: 'rgb(192, 159, 119)'}}>


        <img src={fiscal} width='50%' style={{padding: '10px'}} />

        <hr/>

        <div class="card-body text-center" style={{backgroundColor: '#C09F77', color: '#000000'}}>
            <h3 class="card-title white-text" style={{textAlign: 'center', fontFamily: 'LabradorA'}}>PRESENTACIÓN</h3>
            <p class="card-text white-text" style={{ color: '#000000', textAlign: 'justify', fontSize: '10pt'}}>

            La incidencia delictiva es el conteo de delitos que registra la Fiscalía General del Estado, y  que surge de la información contenida en las denuncias hechas por los ciudadanos, expresadas en Averiguaciones Previas (Sistema de Justicia Penal Inquisitorio vigente hasta antes de 2015) y en carpetas  de  investigación a partir de la entrada en vigor del Nuevo Sistema de Justicia Penal, de marzo de 2015 a la fecha.
            El registro de la  incidencia delictiva se rige por la metodología para el registro y clasificación de los delitos y  las  víctimas  para  fines  estadísticos (Norma Técnica)  implementada  a  nivel  nacional por  el Secretariado Ejecutivo del Sistema  Nacional  de  Seguridad Púbica, con lo cual se puede tener comparabilidad de la información, así como mayor desagregación de los datos referentes al delito y las víctimas. 

            <br></br>
            <br></br>

            El  presente  producto  estadístico interactivo es  una  iniciativa desarrollada  en  la  Dirección  General  de Tecnologías de la Información, Planeación y Estadística de la Fiscalía General del Estado, con el objetivo de brindar  una  herramienta  de  análisis  de  datos   para  los  tomadores  de  decisión  de  las  instituciones encargadas de la seguridad y procuración de justicia, así como para las organizaciones de la sociedad civil y  la  propia  ciudadanía.  Es  un  ejercicio  de  transparencia  que  incentiva  la  participación  ciudadana y contribuye a entender el fenómeno criminal, al mostrar una radiografía de la conducta delictiva.

            <br></br>
            <br></br>

            El  análisis  de  información  se  puede  hacer  desde  diferentes  enfoques, permitiendo combinar diversas variables. Los  datos  están  modelados en la dimensión tiempo y espacio; en cuanto al tiempo, es posible seleccionar  los  delitos por año y mes, y en la dimensión espacio se puede seleccionar la información por Fiscalía regional, o municipio.  Se  incluyen  datos del número de delitos acontecidos y un análisis por tasa poblacional.

            </p>

        </div>


    </div>

    <div className="shadow-box z-depth-5" style={{width: '49%', height: '700px', alignItems: 'center', textAlign: 'center', float: 'left', marginTop: '15px', marginBottom: '15px'}}>


      <img src={map3} width='100%' style={{cursor: 'zoom-in', marginTop: '50px'}} onClick={()=>this.handleSetModalProps('map')} />

      <div class="card-body text-center" style={{backgroundColor: '#7C8B9E'}}>
          <h3 class="card-title white-text" style={{textAlign: 'center', fontFamily: 'LabradorA'}}>Mapa estatal dividido por fiscalías regionales y municipios de Michoacán</h3>
          {/*<p class="card-text white-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim ipsam voluptatem quia voluptas.</p>*/}
      </div>


    </div>

</div>

    


{/*

    <div className="shadow-box z-depth-5" style={{width: '49%', alignItems: 'center', textAlign: 'center', float: 'left', marginTop: '15px', marginBottom: '15px'}}>


        <img src={daiPlot} width='100%' style={{cursor: 'zoom-in'}} onClick={()=>this.handleSetModalProps('daiPlot')} />

        <hr/>

        <img src={daiTable} width='90%' style={{cursor: 'zoom-in'}} onClick={()=>this.handleSetModalProps('daiTable')} />

        <hr/>

        <div class="card-body text-center" style={{backgroundColor: '#C09F77', color: '#000000'}}>
            <h3 class="card-title white-text" style={{textAlign: 'center', fontFamily: 'LabradorA'}}>Delitos de alto impacto 2019</h3>
            <p class="card-text white-text" style={{ color: '#000000'}}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
              aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              Nemo enim ipsam voluptatem quia voluptas.</p>
        </div>


    </div>


    <div className="shadow-box z-depth-5" style={{width: '49%', alignItems: 'center', textAlign: 'center', float: 'right', marginTop: '15px', marginBottom: '15px'}}>


      <img src={map3} width='100%' style={{cursor: 'zoom-in'}} onClick={()=>this.handleSetModalProps('map')} />

      <div class="card-body text-center" style={{backgroundColor: '#152F4A'}}>
          <h3 class="card-title white-text" style={{textAlign: 'center', fontFamily: 'LabradorA'}}>Mapa de las fiscalias regionales de Michoacán</h3>
          <p class="card-text white-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim ipsam voluptatem quia voluptas.</p>
      </div>


    </div>


    <div className="shadow-box z-depth-5" style={{width: '49%', alignItems: 'center', textAlign: 'center', float: 'right', marginTop: '15px', marginBottom: '15px'}}>

    <img src={hdGenerPlot} width='100%' style={{cursor: 'zoom-in'}} onClick={()=>this.handleSetModalProps('hdGenerPlot')} />

    <hr/>

    <img src={hdGenerTable} width='60%' style={{cursor: 'zoom-in'}} onClick={()=>this.handleSetModalProps('hdGenerTable')} />

    <hr/>
      
      <div class="card-body text-center" style={{backgroundColor: '#E9CFB8', color: '#000000'}}>
          <h3 class="card-title white-text" style={{textAlign: 'center', fontFamily: 'LabradorA', color: '#000000'}}>Homicidio doloso por genero 2019</h3>
          <p class="card-text white-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim ipsam voluptatem quia voluptas.</p>
      </div>


    </div>


    <div className="shadow-box z-depth-5" style={{width: '49%', alignItems: 'center', textAlign: 'center', float: 'left', marginTop: '15px', marginBottom: '15px'}}>

      <img src={map3} width='100%' style={{cursor: 'zoom-in'}} onClick={()=>this.handleSetModalProps('map')} />

      <div class="card-body text-center" style={{backgroundColor: '#7C8B9E'}}>
          <h3 class="card-title white-text" style={{textAlign: 'center', fontFamily: 'LabradorA'}}>Mapa de las fiscalias regionales de Michoacán</h3>
          <p class="card-text white-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim ipsam voluptatem quia voluptas.</p>
      </div>


    </div>


*/}



{/*________________________________________________*/}

<hr/>
{/*

<div style={{display: 'inline-block', width: '100%'}}>

  <div className="shadow-box z-depth-5" style={{width: '49%', alignItems: 'center', textAlign: 'center', float: 'left'}}>


      <img src={plot} width='825px' height='496px' />

      <div class="card-body text-center" style={{backgroundColor: '#152F4A'}}>
          <h3 class="card-title white-text" style={{textAlign: 'center', fontFamily: 'LabradorA'}}>Homicidio doloso</h3>
          <p class="card-text white-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim ipsam voluptatem quia voluptas.</p>
      </div>


  </div>


  <div className="shadow-box z-depth-5" style={{width: '49%', alignItems: 'center', textAlign: 'center', float: 'right'}}>


      <img src={map3} width='825px' height='496px'/>

      <div class="card-body text-center" style={{backgroundColor: '#152F4A'}}>
          <h3 class="card-title white-text" style={{textAlign: 'center', fontFamily: 'LabradorA'}}>Mapa de las fiscalias regionales de Michoacán</h3>
          <p class="card-text white-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim ipsam voluptatem quia voluptas.</p>
      </div>

  </div>

</div>

<br/>

*/}

            {/*<div class="container my-5 px-0 z-depth-1" style={{backgroundColor: '#FFFFFF', width: '90%'}}>

            <section >
          
              <div class="row">
          
                <div class="col-md-6 offset-md-2">

                <img src={map} width='1428px' height='666px'/>
          
                    <h3 class="font-weight-bold">Call to action</h3>
          
                    <h5 class="h5">Lorem ipsum dolor, sit amet consectetur</h5>
          
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id quam sapiente molestiae
                      numquam quas, voluptates omnis nulla ea odio quia similique corrupti magnam.</p>
          
                    <a href="#" class="btn btn-outline-white btn-md waves-effect" role="button"><i class="fas fa-download mr-2"></i>Download</a>
          
                </div>

              </div>

            </section>
          
        </div>*/}


          {/*<div class="card default-color-dark">

            <div class="view">
              <img src="https://mdbootstrap.com/img/Photos/Slides/img%2810%29.jpg" class="card-img-top" alt="photo"/>
              <a href="#">
                <div class="mask rgba-white-slight"></div>
              </a>
            </div>

            <div class="card-body text-center">
              <h4 class="card-title white-text">Title of the news</h4>
              <p class="card-text white-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                Nemo enim ipsam voluptatem quia voluptas.</p>
              <a href="#" class="btn btn-outline-white btn-md">Button</a>
            </div>

        </div>*/}

          {/*<div class="card default-color-dark">

            <div class="view"  style={{alignItems: 'center', textAlign: 'center'}}>
            <img src={map3} width='825px' height='496px'/>
              <a href="#">
                <div class="mask rgba-white-slight"></div>
              </a>
            </div>

            <div class="card-body text-center">
              <h3 class="card-title white-text" style={{textAlign: 'center', fontFamily: 'LabradorA'}}>Mapa de las fiscalias de Michoacán</h3>
              <p class="card-text white-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                Nemo enim ipsam voluptatem quia voluptas.</p>
              <a href="#" class="btn btn-outline-white btn-md">Button</a>
            </div>

          </div>

          <br/>

          <div class="card default-color-dark">

            <div class="view"  style={{alignItems: 'center', textAlign: 'center', backgroundColor: '#7C8B9E'}}>
            <img src={map3} width='825px' height='496px'/>
              <a href="#">
                <div class="mask rgba-white-slight"></div>
              </a>
            </div>

            <div class="card-body text-center" style={{backgroundColor: '#152F4A'}}>
              <h3 class="card-title white-text" style={{textAlign: 'center', fontFamily: 'LabradorA'}}>Mapa de las fiscalias de Michoacán</h3>
              <p class="card-text white-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                Nemo enim ipsam voluptatem quia voluptas.</p>
              <a href="#" class="btn btn-outline-white btn-md">Button</a>
            </div>

          </div>

          <br/>

          <div class="card default-color-dark">

            <div class="view"  style={{ margin: '0', alignItems: 'center', textAlign: 'center', backgroundColor: '#FFFFFF'}}>
            <img src={map3} width='825px' height='496px'/>
              <a href="#">
                <div class="mask rgba-white-slight"></div>
              </a>
            </div>

            <div class="card-body text-center" style={{backgroundColor: '#152F4A'}}>
              <h3 class="card-title white-text" style={{textAlign: 'center', fontFamily: 'LabradorA'}}>Mapa de las fiscalias de Michoacán</h3>
              <p class="card-text white-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                Nemo enim ipsam voluptatem quia voluptas.</p>
              <a href="#" class="btn btn-outline-white btn-md">Button</a>
            </div>

          </div>

          <br/>

          <div class="card default-color-dark">

            <div class="view"  style={{margin: '0 auto', alignItems: 'center', textAlign: 'center', backgroundColor: '#FFFFFF'}}>
            <img src={map3} width='825px' height='496px'/>
              <a href="#">
                <div class="mask rgba-white-slight"></div>
              </a>
            </div>

            <div class="card-body text-center" style={{backgroundColor: '#152F4A'}}>
              <h3 class="card-title white-text" style={{textAlign: 'center', fontFamily: 'LabradorA'}}>Mapa de las fiscalias de Michoacán</h3>
              <p class="card-text white-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                Nemo enim ipsam voluptatem quia voluptas.</p>
              <a href="#" class="btn btn-outline-white btn-md">Button</a>
            </div>

      </div>*/}

          <br/>


        </>
        );
    }
}
  
export default Home;