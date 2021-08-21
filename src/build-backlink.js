import {readFileSync,writeFileSync,readdirSync} from'fs';
import {pack_delta,escapePackedStr} from './packintarray.js'


const folder="../";
const files=readdirSync("..");

const ForwardLinks={};

files.forEach(file=>{
    if (!file.endsWith(".htm"))return;
    const content=readFileSync(folder+file,'utf8');
    const lines=content.split(/\r?\n/);

    ForwardLinks[file]={};
    let wh='';
    lines.forEach(line=>{
        const m=line.match(/a name="u(.+?)">/);
        if (m) wh=m[1];
        line.replace(/<k n="(.+?)">/g,(m,m1)=>{
            const lnk=m1.match(/(.+?):(.+)/);
            if (lnk) {
                const [m0,fn,addr]=lnk;
                const htmlfn=fn+'.htm';
                if (!ForwardLinks[file][htmlfn]) ForwardLinks[file][htmlfn]=[];
                ForwardLinks[file][htmlfn].push([addr,wh]);
            } else {
                console.log('wrong link target',m1,'file',file);
            }
        })
    })

})

const Backlinks={};//  htm: array of wh
for (let i in ForwardLinks) { //remove file without any links.
    if (!Object.keys(ForwardLinks[i]).length) delete ForwardLinks[i];
    else {
        for (let srcbk in ForwardLinks[i]) {
            const rawlinkarray=ForwardLinks[i][srcbk];
            //sort by unicode value of kangxi wh

            if (!Backlinks[srcbk]) Backlinks[srcbk]={};
            
            for (let j=0;j<rawlinkarray.length;j++) {
                const [addr,wh]=rawlinkarray[j];
                if (!Backlinks[srcbk][addr]) Backlinks[srcbk][addr]='';
                Backlinks[srcbk][addr]+='u'+wh;
            }
        }
    }
}

const out=JSON.stringify(Backlinks,'',' ');

writeFileSync('../backlinks.js','window.kxzd_backlinks='+out,'utf8');
