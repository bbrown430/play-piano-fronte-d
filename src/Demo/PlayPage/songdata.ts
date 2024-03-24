import { number } from 'yargs'
import hotcrossbunsBB from '../../assets/SheetMusic/hot-cross-buns-midi/bounding_boxes.json'
import hotcrossbunsSheets from '../../assets/SheetMusic/hot-cross-buns-midi/hot-cross-buns-midi.jpg'

interface BoundingBox{
    x : number,
    y : number,
   width : number,
   height : number
}


export function getSongDisplay() {
    const bblist : BoundingBox[] = [];

    for (let index = 0; Object.keys(hotcrossbunsBB).length; index++) {
        bblist[index] = Object.values(hotcrossbunsBB)[index]
        
        
    }
   // const bblist : BoundingBox[];

    
    

    return bblist;

}