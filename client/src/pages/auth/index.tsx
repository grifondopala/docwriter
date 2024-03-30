import { useState } from 'react'
import { SignIn, SignUp } from '@/components/auth'
import { authStage } from '@/types/auth';

import '@/css/auth/auth.css'

export default function Auth(){
    
    const [stage, setStage] = useState(authStage.SignIn)

    function changeStage(intermediateStage: authStage, nextStage: authStage){
        setStage(intermediateStage);
        setTimeout(() => setStage(nextStage), 1500);
    }

    if(stage === authStage.SignIn || stage === authStage.ChangingToSignUp){
        return(
            <SignIn changeStage={() => changeStage(authStage.ChangingToSignUp, authStage.SignUp)} stage={stage}/>
        )
    }

    return(
        <SignUp changeStage={() => changeStage(authStage.ChangingToSignIn, authStage.SignIn)} stage={stage}/>
    )

}