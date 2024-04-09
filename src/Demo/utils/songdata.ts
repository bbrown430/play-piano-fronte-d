/**
 * 
 * @param title name of song to fetch data from assets folder
 * @returns 
 */
export async function getSongBoundingBoxes(artist:string, title:string) {
    let boundingBoxesJson

   try{  boundingBoxesJson = await import(`/public/data/${artist} - ${title}/bounding_boxes.json`);
   }
   catch (error){
    console.log(`clould not find bounding boxes ${`../../assets/SheetMusic/${artist} - ${title}/bounding_boxes.json`}`)
    return [];
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
/*
 async function getSongSheetMusic(artist:string, title:string) {
    let image
    //const path = `../../assets/SheetMusic/${artist} - ${title}/sheet_music.jpg`

   try{ image = await import(`../../assets/SheetMusic/${artist} - ${title}/sheet_music.png`)
    //image = await import(`../../assets/SheetMusic/hot cross buns/hot cross buns.jpg`)
   return image;
   }
   catch (error){
    console.log(`failed to load ${`../../assets/SheetMusic/${artist} - ${title}/sheet_music.png`}`)
    return;
   }
        
} */
