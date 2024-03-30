import { useMutation } from "react-query";

interface SignInProps{
  username: string;
  password: string;
}

async function fetchSignIn(data: SignInProps){
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/sign-in`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({...data}),
  });

  if(!response.ok){
    let res = await response.json();
    throw res.message;
  }

  return response.json();
}

export function signInQuery(){
    return useMutation(fetchSignIn);
}