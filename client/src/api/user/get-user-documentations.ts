export async function getUserDocumentations(username: string){
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/documentation/get-user-documentations/${username}`, {
        method: 'GET', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
    });

    if(!response.ok) throw new Error('123');

    return response.json();
}