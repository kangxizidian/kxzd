import {unpack_delta} from "./unpackintarray"
import {fibSearch} from "./fibonacci";

const unpack_headwords=()=>{
    const headwords=window.kxzd_headwords;
    if (!typeof headwords)return;
    if (typeof headwords=='string') {
        window.headwords=headwords.split(/\r?\n/).map(line=>unpack_delta(line));
    }
}

export const fileByUnicode=uni=>{
	const htmlFileNames=window.kxzd_htmlFileNames;
    unpack_headwords();
    for (let i=0;i<headwords.length;i++) {
        const at=fibSearch(headwords[i],uni);
        if (at>=headwords[i].length)continue;
        return '../kxzd/'+htmlFileNames[i];
    }
}