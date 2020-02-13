import React,{useState} from 'react'
import { directive } from '@babel/types';
import './carpark.css'

function FirstfloorLayout(props) {
    const [carpark1,setCarpark1] = useState([
        {
            lot:'Bay 1',
            color:'green',
        },
        {
            lot:'Bay 2',
            color:'green',
        },
        {
            lot:'Bay 3',
            color:'green',
        },
        {
            lot:'Bay 4',
            color:'green',
        }
    ])
    const changeColor = (ind)=>{
        console.log(ind)
        let newLot;
        if (carpark1[ind].color=='green'){
            newLot = carpark1.map((lot,index)=>(
                ind===index ? ({lot:lot.lot,color:'red'}) : lot
            ))
        }else{
            newLot = carpark1.map((lot,index)=>(
                ind===index ? ({lot:lot.lot,color:'green'}) : lot
            ))
        }
        setCarpark1(newLot)
    }
    return(
        <div className='baselayout'>
            <div className='carparklot'>
                <div className='carlot1' style={{}}>
                    {carpark1.map((lot,index) => (
<div key={index} className='carpark' name="car1" style={{backgroundColor:lot.color}} onClick={()=>changeColor(index)}>{lot.lot}</div> 
                    ))}
                    {/* <div className='carpark' name="car2" style={{backgroundColor:baycolor}} onClick={changeColor}>BAY 2</div>
                    <div className='carpark' name="car3" style={{backgroundColor:baycolor}} onClick={changeColor}>BAY 3</div>
                    <div className='carpark' name="car4" style={{backgroundColor:baycolor}} onClick={changeColor}>BAY 4</div> */}
                </div>
                {/* <div className='carlot2'> */}
                {/* </div> */}
                <div className='leveldown'>LEVEL DOWN</div>
                <div className='entrance'>ENTRANCE</div>
                <div className='levelup'>LEVEL UP</div>
                <div className='exit'>EXIT</div>
                <div className='entrance-boomgate'>
                    <div className='box1'></div>
                    <div className='box2'></div>
                </div>
                <div className='exit-boomgate'>
                    <div className='box3'></div>
                    <div className='box4'></div>
                </div>
                <div className='Arrows-bay1'>
                <div className='rightturn'>&#8625;</div>
                <div className='upright'>&#8624;</div>
                <div className='straight'>&#8673;</div>
                <div className='leftturn'>&#8624;</div>
                </div>
                {/* <div className='Arrows-bay2'>
                <div className='rightturn'>&#8625;</div>
                <div className='upright'>&#8624;</div>
                <div className='straight'>&#8673;</div>
                <div className='rightturn2'>&#8625;</div>
                </div>
                <div className='Arrows-bay3'>
                <div className='rightturn'>&#8625;</div>
                <div className='upright'>&#8624;</div>
                <div className='leftturn2'>&#8624;</div>
                </div>
                <div className='Arrows-bay3'>
                <div className='rightturn'>&#8625;</div>
                <div className='upright'>&#8624;</div>
                <div className='rightturn3'>&#8625;</div>
                </div>
                 <div className='Next-level'>
                 <div className='rightturn'>&#8625;</div>
                 <div className='upright'>&#8624;</div>
                 <div className='straight'>&#8673;</div>
                 <div className='straight2'>&#8673;</div>
                 <div className='rightturn4'>&#8625;</div>
                 <div className='upright2'>&#8624;</div>
                 </div> */}
            </div>
        </div>
    );
}
export default FirstfloorLayout;