import { useRouter } from 'next/navigation'

import '@/css/user/error-field.css'

export function ErrorField({error}: {error: string}){
    
    const router = useRouter()

    function onClickHandler(){
        router.push('/users')
    }
    
    return(
        <div id="error__container">
            <p id="error__container__label">{error}</p>
            <p id="error__container__text">Попробуйте найти нужного человека <br/> в списке всех пользователей.</p>
            <button id="error__container__button"onClick={onClickHandler}>Перейти</button>
        </div>
    )
}