import axios from "axios";
function DeleteAccountButton({ authToken }) {

  const handleDeleteAccount=() => {
    try {
     axios.delete("/api/v1/customer",{
        headers: {
            Authorization: sessionStorage.getItem("token"), // replace with your authorization header value
            "Content-Type": "application/json" // replace with your content type header value
        },
        }).then(
        (response) => {
            sessionStorage.removeItem("token");
            window.location.href = "/login";
            }
     )
    }
    catch (error) {
        console.error(error);
    }
}

  return (
    <>
      <button
        className="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-lg delete-account-button"
        onClick={() => handleDeleteAccount()}
      >
        Delete account
      </button>
    </>
  );
}

export default DeleteAccountButton;
