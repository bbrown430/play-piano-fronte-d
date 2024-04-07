import { usePlayPianoController } from "../../App";
import { useEffect } from "react";
import { EVENTENDPOINT, KeyPress } from "../utils/APIHooks";
import { sleep } from "../utils/utils";

export function StartSongPage() {
    const controller = usePlayPianoController();

    const startdisplaytest = async () => {
        await controller.clearKeys();
        await sleep(50);
        await controller.setStatus('inProgress');

    };

    useEffect(() => {
        //starts game on keypress
        const events = new EventSource(EVENTENDPOINT);

        const regkeys = async () => {
            await controller.clearKeys();
            await sleep(50);
            await controller.registerAllKeys();
        };

        regkeys();


        events.onmessage = (event) => {

            const keypressed = JSON.parse(event.data);
            const keypress: KeyPress = { keyID: keypressed.keyID, count: keypressed.count };
            console.log(`Key pressed id : ${keypress.keyID} keys listening for ANY`);

            if (keypress.keyID === undefined) {
                console.log(`returning keypress :  ${keypress}`);
                return;
            }

            const startbutton = document.getElementById("start-button");
            if (startbutton) {
                startbutton?.click();
            }
        };




        return () => {
            events.close();
        };

    }, [controller, controller.pianoMode, controller.status]);



    return (
        <div className="start-page">
            <div className="start-button"
                id="start-button"
                onClick={async () => await startdisplaytest()}>
                <h2>Press any key to start!</h2>
            </div>
        </div>
    );
}
