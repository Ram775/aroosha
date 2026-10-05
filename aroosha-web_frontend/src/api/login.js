// import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// console.log("API BASE URL:", API_BASE_URL);

// export const adminLogin = async (username, password) => {
//   const response = await axios.post(
//     `${API_BASE_URL}/auth/login`,
//     {
//        username: username,
//       password: password
//     }
//   );

//   return response.data;
// };



// // import axios from "axios";


// // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// // console.log("API BASE URL:", API_BASE_URL);


// // export const adminLogin = async (username, password) => {
// //   const response = await axios.post(
// //     `${API_BASE_URL}/admin/login`,
// //     {
// //       username,
// //       password,
// //     }
// //   );

// //   return response.data;
// // };





import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const adminLogin = async (username, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    username,
    password,
  });
  return response.data;
};

export const googleLogin = async (token) => {
  const response = await axios.post(`${API_BASE_URL}/auth/google-login`, {
    id_token: token,
  });
  return response.data;
};