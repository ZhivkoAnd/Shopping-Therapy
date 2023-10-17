
import React,{useEffect, useState} from 'react'

const STOP_DELAY = 1000
const SLOW_DELAY = 1000
const GO_DELAY = 1000

type TrafficLightsState = "stop" | "slow" | "go";

const TrafficLight = () => {

    const [state, setState] = useState<TrafficLightsState>('stop')
    
    const getStopLightClass = (light : TrafficLightsState) => {
        return `light ${light}` + (state === light ? ' on': '')
    }

    useEffect(() => {
        if (state === 'stop') {
            setTimeout(() => setState("slow"), STOP_DELAY);
        } else if (state === 'slow') {
            setTimeout(() => setState("go"), SLOW_DELAY);
        } else {
            setTimeout(() => setState("stop"), GO_DELAY);
        }
    },[state])
   
  return (
    <div className='traffic-lights'>
        {/* <div className={"light stop" + (state === 'stop' ? ' on' : '')}/> */}
        <div className={getStopLightClass('stop')}/>
        <div className={getStopLightClass('slow')}/>
        <div className={getStopLightClass('go')}/>
    </div>
  )
}

export default TrafficLight

