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
        <div className="morado" style={{ width: '20rem', height: '20rem' }}>
      <div className="container-sm container-home rounded-4">
        <p>Beats Solo</p> 
        <h1>Wireless</h1>  
        <h6 className='title-home'>Headphones</h6> 
        <button className='btn btn-home text-white'>Shop by category</button> 
        <div className='elec'>
          <img src={Controller} alt="" />
          </div>
        </div> 
        
        </div>
      </div>
      </div>
    </>
  );
}

export default Home;
