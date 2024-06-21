import Navbar from "../Navbar/index";
import Headphone from '../../assets/images/headphones.png'
import './style.css'
import Clothes from '../../assets/images/clothes.png'
import Sport from '../../assets/images/sport.png'
import Gaming from '../../assets/images/gaming.png'
import Controller from '../../assets/images/controller.png'




function Home(params) {
  return (
    <>
      <Navbar />
      <div className="sol">
      <div className="category">
      <h3>Category</h3>
        <button> <img src={Clothes} alt="clothes"/> clothes </button> <br/>
        <button> <img src={Sport} alt="sport"/> sport </button><br/>
        <button> <img src={Gaming} alt="gaming"/> Clothes </button><br/>
      </div>
      <div className="azul">
      <div className="container-sm container-home rounded-4">
        <p>Beats Solo</p> 
        <h1>Wireless</h1>  
        <h6 className='title-home'>Headphones</h6> 
        <button className='btn btn-home text-white'>Shop by category</button> 
        <div className='containerImg'>
          <img src={Headphone} alt="" />
          </div>
        </div>
        <div className="morado">
  <div className="container-fluid container-morado rounded-4">
    <p>Beats Solo</p>
    <h6>Wireless</h6>
    <h6 className='title-morado'>Headphones</h6>
    <br /><br />
    <button className='btn btn-morado text-white'>Shop by category</button>
    <div className='elecontainerImgc'>
      <img src={Controller} alt="" style={{ width: '30vh', height: '20vh' }} />
    </div>
  </div>
</div>
<div className="morado">
  <div className="container-fluid container-morado rounded-4">
    <p>Beats Solo</p>
    <h6>Wireless</h6>
    <h6 className='title-morado'>Headphones</h6>
    <br /><br />
    <button className='btn btn-morado text-white'>Shop by category</button>
    <div className='elecontainerImgc'>
      <img src={Controller} alt="" style={{ width: '30vh', height: '20vh' }} />
    </div>
  </div>
</div>
<div className="morado">
  <div className="container-fluid container-morado rounded-4">
    <p>Beats Solo</p>
    <h6>Wireless</h6>
    <h6 className='title-morado'>Headphones</h6>
    <br /><br />
    <button className='btn btn-morado text-white'>Shop by category</button>
    <div className='elecontainerImgc'>
      <img src={Controller} alt="" style={{ width: '30vh', height: '20vh' }} />
    </div>
  </div>
</div>
<div className="morado">
  <div className="container-fluid container-morado rounded-4">
    <p>Beats Solo</p>
    <h6>Wireless</h6>
    <h6 className='title-morado'>Headphones</h6>
    <br /><br />
    <button className='btn btn-morado text-white'>Shop by category</button>
    <div className='elecontainerImgc'>
      <img src={Controller} alt="" style={{ width: '30vh', height: '20vh' }} />
    </div>
  </div>
</div>
        </div>
      </div>
    </>
  );
}

export default Home;
