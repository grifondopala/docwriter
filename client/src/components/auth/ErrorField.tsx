export function ErrorField({error}: {error: string}){
    if(!error) return <></>
    return(<p className="error__text">Неверное имя пользователя или пароль.</p>)
}