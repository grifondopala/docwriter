import { useMutation } from "react-query";

interface SignUpProps{
  username: string;
  password: string;
  email: string;
}

async function fetchSignUp(data: SignUpProps){
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/`, {
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

export function signUpQuery(){
    return useMutation(fetchSignUp);
}