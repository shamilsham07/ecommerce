import React from 'react'
import "./loading.css"
import { ScaleLoader } from 'react-spinners';
export default function Loading() {
  return (
    <div className='loading d-flex justify-content-center align-items-center'>
       <div>
       <ScaleLoader className='loaders'/>
       </div>
    </div>
  )
}
