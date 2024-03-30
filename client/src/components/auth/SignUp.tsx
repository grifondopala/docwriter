import { useState } from "react";

import { DefaultButton } from "./DefaultButton";
import { DefaultInput } from "./DefaultInput";

import { authStage, AuthProps } from "@/types/auth";

export function SignUp({changeStage, stage}: AuthProps){

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    function onClick(){

    }

    const classStage = stage === authStage.ChangingToSignIn ? 'changing' : '';
    
    return(
        <div id="auth__container">
            <div className={`auth__container__change_stage sign_up ${classStage}`}>
                <div className={`auth__container__content ${classStage}`}>
                    <h2 className="auth__container__change_stage__title">Уже есть аккаунт?</h2>
                    <p  className="auth__container__change_stage__label">Авторизируйтесь, чтобы получить доступ к своим статьям и документациям.</p>
                    <img className="auth__container__img" src="/imgs/auth/auth-img.svg"/>
                    <DefaultButton text="Войти" onClickHandler={changeStage} style={{marginTop: 'auto'}}/>
                </div>
            </div>
            <div className={`auth__container__form ${classStage}`}>
                <div className={`auth__container__content ${classStage}`}>
                    <h2 className="auth__container__form__title">Регистрация</h2>
                    <div className="auth__container__form__inputs">
                        <DefaultInput imgSrc="/imgs/auth/person-icon.png" placeholder="Username" value={username} setValue={setUsername}/>
                        <DefaultInput imgSrc="/imgs/auth/password-icon.png" placeholder="Пароль" value={password} setValue={setPassword}/>
                        <DefaultInput imgSrc="/imgs/auth/password-icon.png" placeholder="Повторите пароль" value={confirmPassword} setValue={setConfirmPassword}/>
                        <DefaultInput imgSrc="/imgs/auth/email-icon.png" placeholder="Email" value={email} setValue={setEmail}/>
                    </div>
                    <DefaultButton text="Зарегистрироваться" onClickHandler={onClick}/>
                </div>
            </div>
        </div>
    )
    
}