
/**
 * 
 * @param waitTime ms
 * @returns 
 */
export const sleep = async (waitTime: number) => new Promise(resolve => setTimeout(resolve, waitTime));
