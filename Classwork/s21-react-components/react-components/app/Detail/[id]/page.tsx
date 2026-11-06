import Detail from "../../../Components/Detail";
const SAMPLE_INITIATIVES = [
  { id: '101', title: 'Campus Solar Canopy', category: 'Energy', votes: 14, description: 'Lorem ipsum', author: 'Dr. X' },
  { id: '102', title: 'Zero-Waste Cafeteria Loop', category: 'Waste', votes: 29, description: 'Lorem ipsum', author: 'Master Splinter' },
  { id: '103', title: 'Urban Rainwater Harvester', category: 'Water', votes: 8, description: 'Lorem ipsum', author: 'Dr. Banner' }
];
const errorInitiative={
    id:'0',
    title:"initiative not found",
    category:"unknown",
    votes:-1,
    description:'initiative not found, incorrect id.',
    author:"unknown"
}

const DetailPage = async( {params}:{params:Promise<{id:string}>})=>{
    const {id}= await params;

    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <Detail initiative={SAMPLE_INITIATIVES.find(initiative => initiative.id===id)||errorInitiative }/>
        </div>
    )
}

export default DetailPage;