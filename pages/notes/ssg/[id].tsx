import { GetStaticProps, InferGetStaticPropsType } from 'next'

type ListNotes = {
    id: string
    title: string
    description: string    
    deleted_at: string
    created_at: string
    updated_at: string  
}
type Notes = {
    success : boolean
    message : string
    data : ListNotes
}

export const getStaticPaths = (async () => {
    const notes = await fetch('https://service.pace-unv.cloud/api/notes').then((res) => res.json())
    const paths = notes.data.map((note : ListNotes) => ({params: {id: note.id}}))
    return {
        paths, 
        fallback: 'blocking' }
})

export const getStaticProps = (async (contex) => {
    const {params} = contex
    const notes = await fetch(`https://service.pace-unv.cloud/api/notes/${params?.id || ''}`).then((res) => res.json())
    return {
        props: {notes}
    }
}) satisfies GetStaticProps <{ notes: Notes}>


export default function NotesSSGDetailPage({ notes, 

} : InferGetStaticPropsType<typeof getStaticProps>) {
    return (
    <div className='p-4 bg-white shadow-sm rounded-lg'>
    <h1>{notes.data.title}</h1>
    <p>{notes.data.description}</p>
</div>
  )
  }