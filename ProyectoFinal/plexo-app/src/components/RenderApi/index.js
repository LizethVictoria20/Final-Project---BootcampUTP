function RenderAPI(params) {
  fetch("http://localhost:3000/api/products").then((data) => console.log(data));
}

export default RenderAPI;
