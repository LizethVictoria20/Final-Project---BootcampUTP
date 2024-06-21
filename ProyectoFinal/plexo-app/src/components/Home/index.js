import { Link } from 'react-router-dom'
import Navbar from "../Navbar/index";
import Headphone from '../../assets/images/headphones.png'
import './style.css'
import Clothes from '../../assets/images/clothes.png'
import Sport from '../../assets/images/sport.png'
import Gaming from '../../assets/images/gaming.png'
import Controller from '../../assets/images/controller.png'




function Home() {
  return (
    <>
      <Navbar />
        <div className="container-sm container-home rounded-4">
          <p>Beats Solo</p> 
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
              <p>Beats Solo</p>
              <h6>Wireless</h6>
              <h6 className='title-morado'>Headphones</h6>
              <br /><br />
              <button className='btn btn-morado text-white'>Shop by category</button>
              <div className='elecontainerImgc'>
                <img src={Controller} alt=""  />
              </div>
            </div>
          </div>

          <div className="morado">
            <div className="container-fluid container-morado rounded-4">
              <p>Beats Solo</p>
              <h6>Wireless</h6>
              <h6 className='title-morado'>Headphones</h6>
              <br /><br />
              <Link to='catalogo' className='btn btn-morado text-white'>Shop by category</Link>
              <div className='elecontainerImgc'>
                <img src={Controller} alt=""  />
              </div>
            </div>
          </div>
          <div className="morado-4">
            <div className="container-fluid container-morado rounded-4">
              <p>Beats Solo</p>
              <h6>Wireless</h6>
              <h6 className='title-morado'>Headphones</h6>
              <br /><br />
              <Link to='catalogo' className='btn btn-morado text-white'>Shop by category</Link>
              <div className='elecontainerImgc-4'>
                <img src={Controller} alt="" />
              </div>
            </div>
          </div>
          <div className="morado-4">
            <div className="container-fluid container-morado rounded-4">
              <p>Beats Solo</p>
              <h6>Wireless</h6>
              <h6 className='title-morado'>Headphones</h6>
              <br /><br />
              <Link to='catalogo' className='btn btn-morado text-white'>Shop by category</Link>
              <div className='elecontainerImgc-4'>
                <img src={Controller} alt="" />
              </div>
            </div>
          </div>
          <div className="morado">
            <div className="container-fluid container-morado rounded-4">
              <p>Beats Solo</p>
              <h6>Wireless</h6>
              <h6 className='title-morado'>Headphones</h6>
              <br /><br />
              <Link to='catalogo' className='btn btn-morado text-white'>Shop by category</Link>
              <div className='elecontainerImgc'>
                <img src={Controller} alt="" />
              </div>
            </div>
          </div>
          <div className="morado">
            <div className="container-fluid container-morado rounded-4">
              <p>Beats Solo</p>
              <h6>Wireless</h6>
              <h6 className='title-morado'>Headphones</h6>
              <br /><br />
              <Link to='catalogo' className='btn btn-morado text-white'>Shop by category</Link>
              <div className='elecontainerImgc'>
                <img src={Controller} alt="" />
              </div>
            </div>
          </div>
        </div>
      </>
  );
}

export default Home;
