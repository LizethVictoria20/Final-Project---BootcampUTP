import api from "../../http/index";
function Logout() {
  const logoutUser = async () => {
    try {
      const response = await api.get("auth/logout", {});
      if (response.status === 200) {
        console.log("Logout successful.");
        // Limpiar el estado de autenticación, por ejemplo, eliminar el token del local storage
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
        <button onClick={logoutUser}>Logout</button>
    </>
  )

}

export default Logout