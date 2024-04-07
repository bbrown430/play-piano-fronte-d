import { BoundingBox } from '../utils/types';


/**
 * 
 * @param title name of song to fetch data from assets folder
 * @returns 
 */
export async function getSongBoundingBoxes(artist:string, title:string) {
    let boundingBoxesJson
   try{  boundingBoxesJson = await import(`../../public/data/${artist} - ${title}/bounding_boxes.json`);
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
export async function getSongSheetMusic(title:string) {
    let image
   try{ image = await import(`../../assets/SheetMusic/${title}/${title}.jpg`)
    //image = await import(`../../assets/SheetMusic/hot cross buns/hot cross buns.jpg`)
   return image;
   }
   catch (error){
    throw error
   }
        
}
