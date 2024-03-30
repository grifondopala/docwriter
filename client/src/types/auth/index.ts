export interface AuthProps{
    changeStage: () => void;
    stage: authStage;
}

export enum authStage{
    SignIn,
    ChangingToSignUp,
    SignUp,
    ChangingToSignIn,
}
