import Navbar from "../Navbar/index";
import "./stylesheet.css"
function Admin() {
  return (
    <>
      <Navbar />
      <div className="containerAll">
        <div className="container">
          <div className="productsAddSearch">
            <h1>Productos</h1> 
            <button className="addItem"></button>
            <input className="searchBar"></input>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
