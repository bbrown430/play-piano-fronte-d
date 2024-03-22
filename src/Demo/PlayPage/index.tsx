import { usePlayPianoController } from "../../App";

 export default function PlayPage() {
    const controller = usePlayPianoController();

    return ( 
        <div className="inProgress-container">
            <div className="inProgress-info">
                {'coming sooon'}
            </div>

        </div>
    );
}