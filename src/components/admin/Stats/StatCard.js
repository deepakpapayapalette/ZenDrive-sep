// import { User } from "lucide-react"; 

export default function StatCard(data) {
  return (
    <div className="  text-white rounded-lg p-4 flex flex-col justify-between px-4 shadow-md" style={{backgroundColor: ` ${data.color} `, width: '100%'}}>
      <div className="flex justify-between items-start">
        <span className="text-lg text-[20px]">{data.title}</span>
        <div className="  rounded-full">
          <img src={data.data} alt="" />
        
        </div>
      </div>
      <span className="text-[30px] font-bold mt-2">{data.value}</span>
    </div>
  );
}


