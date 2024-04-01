import hotcrossbunsBB from '../../assets/SheetMusic/hot-cross-buns-midi/bounding_boxes.json'
import hotcrossbunsSheets from '../../assets/SheetMusic/hot-cross-buns-midi/hot-cross-buns-midi.jpg'
import { BoundingBox } from '../utils/types';

export function getSongBoundingBoxes() {
    let bblist : BoundingBox[] = [];

    for (let index = 0; index < Object.keys(hotcrossbunsBB).length; index++) {
        bblist.push(Object.values(hotcrossbunsBB)[index])

     }
   // const bblist : BoundingBox[];

    
    

    return bblist;

}