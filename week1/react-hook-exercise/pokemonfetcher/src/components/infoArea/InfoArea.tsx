import React from 'react'
import {
    MyTable,
    MyTr,
    MyTh,
    MyTd,
    MyTbody,

} from './InfoAreaElements';

interface Attack {
    name: string;
    type: string;
    damage: string;
  }

type Props = {
    special?: Attack[]
}

const InfoArea = ({special}: Props) => {
  return (
    <>
    <MyTable>
        <MyTbody>
        <MyTr>
            <MyTh>Ability</MyTh>
            <MyTh>Type</MyTh>
            <MyTh>Damage</MyTh>
        </MyTr>
    {special? special.map((attack:any, key:number) => {
        return(
            <MyTr key={key}>
                <MyTd>{attack.name}</MyTd>
                <MyTd>{attack.type}</MyTd>
                <MyTd>{attack.damage}</MyTd>
            </MyTr>
        )
    }): <p>Nothing</p>}
    </MyTbody>
    </MyTable>
    </>
  )
}

export default InfoArea