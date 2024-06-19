import Axios from "axios";
function RenderAPI(params) {
  //GET
  const getProducts = () => {
    Axios.get("https://final-project-bootcamputp.onrender.com/api/products")
      .then((data) => console.log(data.data))
      .catch((error) => console.log(error));
  };
  return(
    <div>
      <button onClick={getProducts}>ask</button>
    </div>
  )
}

export default RenderAPI;
