import React, { RefObject } from 'react'
import { CustomeData } from '../../types';
import {
    DataFrame,
} from './TiltDataDisplayElements';


type Props = {
  data: CustomeData;
}
const initialCustomDAta = {angle:"", percentageX:"", percentageY:"", tiltX:"", tiltY:""};

export const TiltDataDisplay = ({data}: Props) => {
  return (
    <DataFrame>
      {JSON.stringify(data) == JSON.stringify(initialCustomDAta) ? <p>point here</p> :<div>
      <p> angle: {data.angle}</p>
      <p> percentageX: {data.percentageX}</p>
      <p> percentageY: {data.percentageY}</p>
      <p>tiltX: {data.tiltX}</p>
      <p>tiltY: {data.tiltY}</p>
      </div>}
    </DataFrame>
  )
}