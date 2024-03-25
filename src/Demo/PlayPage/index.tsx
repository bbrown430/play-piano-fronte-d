import { usePlayPianoController } from "../../App";
import { ProgressHeader } from "./ProgressHeader";
import "./playpageformatting.css"


 export default function PlayPage() {
    return ( 
        <div className = "inProgress-container">
            <ProgressHeader />
            <SheetMusic/>

        </div>
    );
}

export function SheetMusic(){

    return (
        <div className="sheet-music"></div>
    )

}