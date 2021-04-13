import  { useState, useEffect } from 'react';
import React from 'react';
import IPFS  from 'ipfs-core';

const UploadFn = () => {
    const [hash, setHash] = useState("");
    const [fileName, setFileName] = useState("");
    const [pathFileName, setPathFileName] = useState([]);
  
    useEffect(() => {

    const saveToIpfsWithFilename = async ([ file ]) => {
      const fileDetails = {
        path: file.name,
        content: file
      }
      const options = {
        wrapWithDirectory: true,
        progress: (prog) => console.log(`received: ${prog}`)
      }
      const ipfs = await IPFS.create()
      const { cid } = await ipfs.add(fileDetails, options)
      const result = {hash: cid.string, fileName: fileDetails.path}
      return result;
    }
    
    const captureFile = async files => {
      const data = await saveToIpfsWithFilename(files);
      setHash(data.hash);
      setFileName(data.fileName);
    }
    
    if (pathFileName.length) {
        captureFile(pathFileName);
      }

  },[pathFileName]);
  
    const handelChangeFile = e => {
      setPathFileName(e.target.files);
    }
   
    return (
      <div className="App">
        <form>
             <input type='file' name='input-file' onChange={handelChangeFile}/><br/>
           </form>
           <div>
            <a target='_blank'
              href={'https://ipfs.io/ipfs/'+hash+"/"+fileName}> {hash}
            </a>
          </div>       
      </div>
    );
}

export default UploadFn;
  