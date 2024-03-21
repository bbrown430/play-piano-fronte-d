import { usePlayPianoController } from "../../App";

 export default function ProgressPage() {
    const controller = usePlayPianoController();

    return ( 
        <div className="inProgress-container">
            <div className="inProgress-info">
                {'coming sooon'}
            </div>

        </div>
    );
}