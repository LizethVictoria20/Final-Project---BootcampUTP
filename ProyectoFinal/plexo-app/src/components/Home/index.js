import Headphone from '../../assets/images/headphones.png'
import './style.css'
import Clothes from '../../assets/images/clothes.png'
import Sport from '../../assets/images/sport.png'
import Gaming from '../../assets/images/gaming.png'

function Home(params) {
  return (
    <>
      <div className="category">
      <h3>Category</h3>
        <button> <img src={Clothes} alt="clothes"/> clothes </button> <br/>
        <button> <img src={Sport} alt="sport"/> sport </button><br/>
        <button> <img src={Gaming} alt="gaming"/> Clothes </button><br/>
      </div>
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
