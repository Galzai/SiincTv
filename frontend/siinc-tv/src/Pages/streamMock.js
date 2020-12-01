
import LiveStream from '../components/liveStream/liveStream'
function StreamMock(props) {
    return(
        <div>
        <div style={{height:"500px"}}>
        <LiveStream
         userName="thehalfwayhouse"
         dimensions={{width: "845", height:"463"}}
         />
        </div>
        <div style={{display:"inline-block"}}>
        <div>
            
        </div>
        <LiveStream style={{display:"relative", marginRight:"10px"}}
            userName="comicsexplained"
            dimensions={{width: "264", height:"145.13"}}
         />
        <LiveStream style={{display:"relative", marginRight:"10px"}}
            userName="starlitedrivein"
            dimensions={{width: "264", height:"145.13"}}
            />
        <LiveStream style={{display:"relative", marginRight:"10px"}}
            userName="mashonly"
            dimensions={{width: "264", height:"145.13"}}
        />
        </div>

        </div>
        
        

        
    )
}

export default StreamMock;