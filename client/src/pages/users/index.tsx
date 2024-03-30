import type { GetServerSideProps } from 'next'

export default function Users({data}: any){
    return(
        <div>
            {data.map((item: Doc) => (<div>{item.name}</div>))}
        </div>
    )
}

interface Doc{
    name: string;
}

export const getServerSideProps = (async () => {
    return({props: {
        data: [
            {
                name: "Doc 1",
            },
            {
                name: "Next is cool"
            }
        ]
    }})
}) satisfies GetServerSideProps<{ data: Array<Doc> }>