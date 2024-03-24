import { usePlayPianoController } from "../../App";
import { ProgressHeader } from "./ProgressHeader";

 export default function PlayPage() {
    const controller = usePlayPianoController();

    return ( 
        <div className = "inProgress-container">
            <ProgressHeader />
            <SheetMusic/>

        </div>
    );
}