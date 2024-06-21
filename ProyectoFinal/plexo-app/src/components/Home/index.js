import { Link } from 'react-router-dom'
import Navbar from "../Navbar/index";
import Headphone from '../../assets/images/headphones.png'
import './style.css'
import Balones from '../../assets/images/balones.png'
import Controller from '../../assets/images/controller.png'
import Xbox from '../../assets/images/xbox.png'
import Jordan from '../../assets/images/air-jordan-.png'
import BalonFutbol from '../../assets/images/balon-futbol.png'
import Tablet from '../../assets/images/electrodomesticos.png'
import Camisanegra from '../../assets/images/camisanegra.png'

function Home() {
  return (
    <>
      <Navbar />
        <div className="container-sm container-home rounded-4">
          <p>arphones</p> 
          <h1>Wireless</h1>  
          <h6 className='title-home'>Headphones</h6> 
          <Link to='catalogo' className='btn btn-home text-white'>Shop by category</Link> 
          <div className='containerImg'>
            <img src={Headphone} alt="" />
            </div>
        </div>
        <div className='d-flex flex-row flex-wrap justify-content-center'>
          <div className="morado">
            <div className="container-fluid container-morado rounded-4">
              <p>Jordan</p>
              <h6>Tennis</h6>
              <h4 className='title-morado'>Shoes</h4>
              <button className='btn btn-morado text-white'>Shop by category</button>
              <div className='elecontainerImgc'>
                <img src={Jordan} alt=""  />
              </div>
            </div>
          </div>

          <div className="morado">
            <div className="container-fluid container-morado rounded-4">
              <p>Console</p>
              <h6>With controls 
                <br/>including</h6>
              <h6 className='title-morado'>XBOX</h6>
              <Link to='catalogo' className='btn btn-morado text-white'>Shop by category</Link>
              <div className='elecontainerImgc'>
                <img src={Xbox} alt=""  />
              </div>
            </div>
          </div>
          <div className="morado-4">
            <div className="container-fluid container-morado rounded-4">
              <p>Wireless</p>
              <h6>video games</h6>
              <h6 className='title-morado'>Controller</h6>
              <Link to='catalogo' className='btn btn-morado text-white'>Shop by category</Link>
              <div className='elecontainerImgc-4'>
                <img src={Controller} alt="" />
              </div>
            </div>
          </div>
          <div className="morado-4">
            <div className="container-fluid container-morado rounded-4">
              <p>Instruments</p>
              <h6>for all types of</h6>
              <h6 className='title-morado'>Sports</h6>
              <Link to='catalogo' className='btn btn-morado text-white'>Shop by category</Link>
              <div className='elecontainerImgc-4'>
                <img src={Balones} alt="" />
              </div>
            </div>
          </div>
          <div className="morado-4">
            <div className="container-fluid container-morado rounded-4">
              <p>Choose</p>
              <h6>your favorite</h6>
              <h6 className='title-morado'>Mobile technology</h6>
              <Link to='catalogo' className='btn btn-morado text-white'>Shop by category</Link>
              <div className='elecontainerImgc-4'>
                <img src={Tablet} alt="" />
              </div>
            </div>
          </div>
          <div className="morado">
            <div className="container-fluid container-morado rounded-4">
              <p>Choose</p>
              <h6>your favorite</h6>
              <h6 className='title-morado'>Sport</h6>
              <Link to='catalogo' className='btn btn-morado text-white'>Shop by category</Link>
              <div className='elecontainerImgc'>
                <img src={BalonFutbol} alt="" />
              </div>
          </div>
          </div>
          
        </div>
      </>
  );
}

export default Home;
