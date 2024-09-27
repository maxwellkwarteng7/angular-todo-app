


export function storeUsername(val: string) {
  // access the username first
  const username: string = val ;
  // store it in the local storage
  localStorage.setItem("store", username);
}


export function generateToken() {
  let generator = Math.ceil(Math.random() * 1000000) + "$token";
  const token = JSON.stringify(generator);
  return token;
}


export function getUsernameAsKey () {
    let username = localStorage.getItem('store'); 
    const key = username + 'todoId'; 
    return key; 

}

