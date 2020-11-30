
function HomePage(props) {
    return(
        <div style={{height:"500px"}}>
        <iframe 
            src="https://player.twitch.tv/?channel=thehalfwayhouse&parent=localhost" 
            frameBorder="0" 
            allowFullScreen="true" 
            scrolling="no" 
            height="378"
            width="620">
        </iframe>
        </div>
        
    )
}

export default HomePage;