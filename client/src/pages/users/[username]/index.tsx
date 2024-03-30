import { getUserDocumentations } from "@/api/user/get-user-documentations";
import { ErrorField } from "@/components/user";
import { Documentation } from "@/types/user";
import { GetServerSideProps } from "next"
import { useCookies } from "react-cookie";

interface UserProps{
    documentations?: Array<Documentation>,
    error?: string,
}

export default function User({documentations, error}: UserProps){

    if(error){
        return(
            <ErrorField error={error}/>
        )
    }

    return(
        <div>
            {documentations?.map((item: Documentation) => (<p>{item.name}</p>))}
        </div>
    )

}

export const getServerSideProps = (async (context) => {

    const [cookies] = useCookies(['user']);

    try{
        const username = context?.params?.username as string;

        const documentations = await getUserDocumentations(username);

        return({props: {
            documentations: documentations.documentations,
        }})
    }catch(e: any){
        return({
            props: {
                error: `Пользователь не найден.`
            }
        })
    }

}) satisfies GetServerSideProps<{ documentations?: Array<Documentation>, error?: string }>