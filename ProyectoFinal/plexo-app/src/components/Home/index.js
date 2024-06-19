import Navbar from "../Navbar/index";
import Headphone from '../../assets/images/headphones.png'
import './style.css'

function Home(params) {
  return (
    <>
      <Navbar />
      <div className="container-sm container-home rounded-4">
        <p>Beats Solo</p> 
        <h1>Wireless</h1>  
        <h1 className='title-home'>Headphones</h1> 
        <button className='btn btn-home text-white'>Shop by category</button> 
        <div className='containerImg'>
          <img src={Headphone} alt="" />
        </div>  
      </div>

    </>
  );
}

export default Home;
