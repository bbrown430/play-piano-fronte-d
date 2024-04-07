import { BoundingBox } from '../utils/types';


/**
 * 
 * @param title name of song to fetch data from assets folder
 * @returns 
 */
export async function getSongBoundingBoxes(artist:string, title:string) {
    let boundingBoxesJson
    const path = `../../../public/data/${artist} - ${title}/bounding_boxes.json`

   try{  boundingBoxesJson = await import(path);
   }
   catch (error){
    throw Error('clould not find bounding boxes')
   }
        
    let bblist : any[] = [];
   // console.log(Object.values(boundingBoxesJson));

    for (let index = 0; index < Object.values(boundingBoxesJson).length; index++) {
        bblist.push(Object.values(boundingBoxesJson)[index]);
       // console.log(bblist[index]); 

     }
    

    return bblist;

}


/**
 * 
 * @param title name of song to fetch data from assets folder
 * @returns 
 */
export async function getSongSheetMusic(artist:string, title:string) {
    let image
    const path = `../../../public/data/${artist} - ${title}/sheet_music.jpg`

   try{ image = await import(path)
    //image = await import(`../../assets/SheetMusic/hot cross buns/hot cross buns.jpg`)
   return image;
   }
   catch (error){
    throw Error(`failed to load ${path}`)
   }
        
}
