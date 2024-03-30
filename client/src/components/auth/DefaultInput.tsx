import '@/css/auth/default-input.css'

interface DefaultInputProps{
    placeholder: string;
    imgSrc: string;
    value: string;
    setValue: any;
}

export function DefaultInput({placeholder, imgSrc, value, setValue}: DefaultInputProps){
    return(
        <div className="default_input_container">
            <img src={imgSrc}/>
            <input placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)}/>
        </div>
    )
}