import React,{useState} from 'react'
import { directive } from '@babel/types';
import Logo from "../carimage.jpg"
import './carpark.css'

function SecondfloorLayout(props) {
    const [carpark1,setCarpark1] = useState([
        {
            lot:'Bay 5',
            color:'green',
        },
        {
            lot:'Bay 6',
            color:'green',
        },
        {
            lot:'Bay 7',
            color:'green',
        },
        {
            lot:'Bay 8',
            color:'green',
        }
    ])
    const changeColor = (lotNum)=>{
        setCarpark1(carpark1.map((lot)=>{
            if (lotNum == lot.lot) {
                if (lot.color == "green") {
                    return {lot:lot.lot,color:'red'}
                } else {
                    return {lot: lot.lot, color: 'green'}
                }
            } else {
                return lot
            }
       }))
    }
    return(
        <div className='baselayout'>
            <div className='carparklot'>
                <div className='carlot1' style={{}}>
                    {carpark1.map((lot,index) => (
                        <div key={index} className='carpark' name="car1" style={{backgroundColor:lot.color}} onClick={()=>changeColor(lot.lot)}>
                            {lot.color == "red" ? <img src={Logo} alt="car logo"  className="image" /> : lot.lot}
                        </div> 
                    ))}
                    {/* <div className='carpark' name="car2" style={{backgroundColor:baycolor}} onClick={changeColor}>BAY 2</div>
                    <div className='carpark' name="car3" style={{backgroundColor:baycolor}} onClick={changeColor}>BAY 3</div>
                    <div className='carpark' name="car4" style={{backgroundColor:baycolor}} onClick={changeColor}>BAY 4</div> */}
                </div>
                {/* <div className='carlot2'> */}
                {/* </div> */}
                <div className='leveldown2'>LEVEL DOWN</div>
                <div className='Secondfloorentrance'>2ND FLOOR ENTRANCE</div>
                <div className='Arrows-bay5'>
                <div className='downright'>&#8624;</div>
                <div className='rightdown'>&#8625;</div>
                <div className='downleft'>&#8625;</div>
                </div>
                <div className='Arrows-bay6'>
                <div className='downright'>&#8624;</div>
                <div className='rightdown'>&#8625;</div>
                <div className='downright2'>&#8624;</div>
                </div>
                <div className='Arrows-bay7'>
                <div className='downright'>&#8624;</div>
                <div className='rightdown'>&#8625;</div>
                <div className='down'>&#8675;</div>
                <div className='downleft2'>&#8625;</div>
                </div>
                <div className='Arrows-bay8'>
                <div className='downright'>&#8624;</div>
                <div className='rightdown'>&#8625;</div>
                <div className='down'>&#8675;</div>
                <div className='downright3'>&#8624;</div>
                </div>
            </div>
        </div>
    );
}
export default SecondfloorLayout;