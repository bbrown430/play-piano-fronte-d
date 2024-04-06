import axios from "axios";

export enum EndPoints  {
    registerKey = '/k/register',
    setKeyColor = '/k/set/color',
    mode = '/si/mode',
    status = '/si/status',
    soundSetting = '/si/sound/setting',
    speed = '/si/speed',
    songName = '/si/song/name'

}


export interface operations {
    registerkey(keyID:number) : Promise<boolean>
    setKeyColor(keyidx:number, color: [number,number,number]) : Promise<boolean>;

    /**
     * Http set request mode, returns false on failure
     * @param mode 
     */
    setMode(mode : string) : Promise<boolean>;
    /**
     * http get request mode 
     */
    getMode() : Promise<string>;

      /**
     * Http set piano state, returns false on failure
     * @param status 
     */
      setStatus(status : string) : Promise<boolean>;
      /**
       * http get request mode 
       */
      getStatus() : Promise<string>;

    /**
     * http request to change the piano sound setting
     * 
     * @param soundSetting piano sound setting. 
     */
    setSoundSetting(soundSetting : string) : Promise<boolean>;

    /**
     * http request to get the current sound setting
     * returns the setting as a string on success
     */
    getSoundSetting() : Promise<string>;

    /**
     * http request to set the speed of a song
     *
     *  @param speed number for tempo 
     */
    setSpeed(speed : number) : Promise<boolean>;
    /**
     * http request the speed of song
     */
    getSpeed() : Promise<number>;

    /**
     * http request to set the song
     * @param title song title. 
     * @returns false on failue to set
     */
    setSong(title : string) : Promise<boolean>;
    /**
     * http request to get the current song title;
     */
    getSong() : Promise<string>;
} 


async function get(url:string,endpoint: EndPoints) : Promise<any>{
    const fullUrl = `${url}${endpoint}`;    

    try{
     return (await axios.get(fullUrl)).data;

    }
    catch (exception){

        console.log(`ERROR received from ${fullUrl}: ${exception}\n`);
    return 'failure';
    }
}
/**
 * Class that Play piano Front end uses to give the Play piano device user inputs in the menus
 */

export class PlayPianoHttp implements operations{
    private url!: string;

    constructor(url: string){
        this.url = url
    }
    async setStatus(status: string): Promise<boolean> {
        const fullUrl = `${this.url}${EndPoints.status}`;

        await axios.post(fullUrl,{
            Status:status
        }).catch(exception => {console.log(`ERROR received from ${fullUrl}: ${exception}\n`);
        return false;})

        return true;
        
    }
    async getStatus(): Promise<string> {
        return await get(this.url,EndPoints.status)
    }

    

    /**
     * requests to register a key of interest to the backend
     */
    async registerkey(keyID:number): Promise<boolean> {

        const fullUrl = `${this.url}${EndPoints.registerKey}`;
        const msg =  keyID <= 61 ?  { KeyID:`key ${keyID}`} :
        { KeyID:`btn ${keyID}`}
        console.log(`registering ${msg}`);
        
        await axios.put(fullUrl,
            msg).catch(exception => {console.log(`ERROR received from ${fullUrl}: ${exception}\n`);
            return false;})

        return true;
        
    }

    /**
     * 
     * @param keyidx number of key to set to a color
     * @param color color [0-255,0-255,0-255]
     * @returns Pro
     */
    async setKeyColor(keyidx:number,color : [number,number,number]): Promise<boolean> {

        if(color.find((element) => (element < 0 || element > 255))){
            throw new Error("invalid key color");
        }
        console.log(`registering ${keyidx} color ${color}`);

        const fullUrl = `${this.url}${EndPoints.setKeyColor}`;

        await axios.post(fullUrl,{
            KeyIdx: keyidx,
            Color:color
        }).catch(exception => {console.log(`ERROR received from ${fullUrl}: ${exception}\n`);
        return false;})

        return true;

    }    


    async setMode(mode: string): Promise<boolean> {
     

        const fullUrl = `${this.url}${EndPoints.mode}`;

        await axios.post(fullUrl,{
            Mode:mode
        }).catch(exception => {console.log(`ERROR received from ${fullUrl}: ${exception}\n`);
        return false;})

        return true;
    }

    async getMode(): Promise<string> {
        return await get(this.url,EndPoints.mode);
    }

    async setSoundSetting(soundSetting: string): Promise<boolean> {

        const fullUrl = `${this.url}${EndPoints.soundSetting}`;

        await axios.post(fullUrl,{
            SoundSetting: soundSetting,
        }).catch(exception => {console.log(`ERROR received from ${fullUrl}: ${exception}\n`);
        return false;})

        return true;
    }


    async getSoundSetting(): Promise<string> {
        return await get(this.url,EndPoints.soundSetting);
    }
    async setSpeed(speed: number): Promise<boolean> {
        const fullUrl = `${this.url}${EndPoints.speed}`;

        await axios.post(fullUrl,{
            Speed: speed,
        }).catch(exception => {console.log(`ERROR received from ${fullUrl}: ${exception}\n`);
        return false;})

        return true;
    }

     async getSpeed(): Promise<number> {
        return await get(this.url,EndPoints.speed);
    }
    
    async setSong(title: string): Promise<boolean> {
        const fullUrl = `${this.url}${EndPoints.songName}`;

        await axios.post(fullUrl,
            {SongName: title})
        .catch(exception => {console.log(`ERROR received from ${fullUrl}: ${exception}\n`);
        return false;})

        return true;
    }
    async getSong(): Promise<string> {
        return await get(this.url,EndPoints.songName);
    }



}


