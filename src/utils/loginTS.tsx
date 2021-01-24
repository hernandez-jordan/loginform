//with reducer
interface Login {
  username: string;
  password: string
}

export async function login({ username, password }: Login) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "jordan" && password === "pass") {
        resolve("login succes");
        // console.log(message);
      } else {
        reject("login failed");
        // console.log(message);
      }
    }, 1000);
  });
}

//withoud reducer
// export async function login({ username, password }, setMessage) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (username === "jordan" && password === "pass") {
//         resolve(setMessage("login succes"));
//         // console.log(message);
//       } else {
//         reject(setMessage("login failed"));
//         // console.log(message);
//       }
//     }, 1000);
//   });
// }
