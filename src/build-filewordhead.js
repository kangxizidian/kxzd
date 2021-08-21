import {readFileSync,writeFileSync,readdirSync} from'fs';
import {pack_delta,escapePackedStr} from './packintarray.js'


const folder="../";
const files=readdirSync("..");

const fileWordheads={};

files.forEach(file=>{
    if (!file.endsWith(".htm"))return;
    fileWordheads[file]=[];
    const content=readFileSync(folder+file,'utf8');
    content.replace(/<a name="(.+?)">/g,(m,m1)=>{
        fileWordheads[file].push(m1);
    })
})

for (let fn in fileWordheads) {
    fileWordheads[fn]=fileWordheads[fn].join('');
}
//from 250KB to 48KB

const out=[];
for (let fn in fileWordheads) {
    const codes=[];
    fileWordheads[fn].replace(/u([^u]+)/g,(m,uni)=>{
        const unicode=parseInt(uni,16);
        if (unicode) {
            codes.push(unicode);
        }
    });
    codes.sort((a,b)=>a-b);

    out.push(escapePackedStr(pack_delta(codes)));
}

const keys=JSON.stringify(Object.keys(fileWordheads));

writeFileSync('../filewordhead.js','window.kxzd_htmlFileNames='+keys+
';\nwindow.kxzd_headwords=`'+out.join('\n') +'`','utf8');
