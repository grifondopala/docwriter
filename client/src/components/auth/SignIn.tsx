import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { authStage, AuthProps } from "@/types/auth";
import { signInQuery } from "@/api/auth";

import { DefaultButton } from "./DefaultButton";
import { DefaultInput } from "./DefaultInput";
import { ErrorField } from "./ErrorField";


export function SignIn({changeStage, stage}: AuthProps){

    const [_, setCookie] = useCookies(['user']);

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const { data, mutate, error } = signInQuery();

    function onClick(){
        mutate({username, password});
    }

    const classStage = stage === authStage.ChangingToSignUp ? ' changing' : '';

    useEffect(() => {
        if(data && !error){
            setCookie("user", {token: data.token});
        }
    }, [data, error])

    return(
        <div id="auth__container">
            <div className={'auth__container__form' + classStage}>
                <div className={"auth__container__content" + classStage}>
                    <h2 className="auth__container__form__title">Вход в аккаунт</h2>
                    <div className="auth__container__form__inputs">
                        <DefaultInput imgSrc="/imgs/auth/person-icon.png" placeholder="Username" value={username} setValue={setUsername}/>
                        <DefaultInput imgSrc="/imgs/auth/password-icon.png" placeholder="Пароль" value={password} setValue={setPassword}/>
                        <ErrorField error={error as string} />
                    </div>
                    <DefaultButton text="Войти" onClickHandler={onClick}/>
                </div>
            </div>
            <div className={"auth__container__change_stage sign_in" + classStage}>
                <div className={"auth__container__content" + classStage}>
                    <h2 className="auth__container__change_stage__title">Нет аккаунта?</h2>
                    <p  className="auth__container__change_stage__label">Зарегистрируйтесь, чтобы получить возможность создавать документации к своим проектам и писать статьи.</p>
                    <img className="auth__container__img" src="/imgs/auth/auth-img.svg"/>
                    <DefaultButton text="Регистрация" onClickHandler={changeStage} style={{marginTop: 'auto'}}/>
                </div>
            </div>
        </div>
    )
    
}