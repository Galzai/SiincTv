import React, {useState, useRef} from "react";
import style from './newStream.module.css'
import CreateableInputOnly from "../selectors/createableInputOnly";
const { default: streamActions } = require("../../stream/streamActions");

/**
 * @brief stream creation page
 * @param {user} props expects the current user to be passed as props
 */
function NewStream(props){
    const {
        user
    }=props;

    const [name, setName]=useState("");
    const [privateStream, setPrivateStream]=useState(false);
    const [inviteOnly, setInviteOnly]=useState(false);
    const [tags, setTags]=useState([]);
    const [date, setDate]=useState(new Date().toLocaleString());
    const [streamGroups, setsSreamGroups]=useState([]);
    const [currentTag, setCurrentTag] = useState("");

// We use this to style or selector   
const customTagStyle={
    control: styles=>({...styles, width:613, marginTop:10, borderRadius:14, height:40, minHeight: 40}),
    valueContainer: styles=>({...styles, height:40, minHeight: 40}),
    indicatorContainer: styles=>({...styles, height:40, minHeight: 40,paddingTop:0, paddingBottom:0}),
    input: styles=>({...styles, top:20, lineHeight:0, fontFamilt:'Roboto',textAlign:'center'}),
    placeholder: styles=>({...styles, top:20, lineHeight:0, fontFamily:'Roboto',textAlign:'center'}),
    multiValue: styles=>({...styles, bottom:20, height:30, backgroundColor:'#8D31D8', borderRadius:14}),
    multiValueLabel: styles=>({...styles, height:30, fontSize:18, top:15, color:'#F0D6FF', fontFamily:'Roboto'})

};

    /**
     * @brief sets the value of privateStrean
     */
    const privacyCheckboxOnChange=()=>{
        setPrivateStream(!privateStream);
    };

       /**
     * @brief sets the value of inviteOnly
     */
    const inviteOnlyCheckboxOnChange=()=>{
        setInviteOnly(!inviteOnly);
    };

    return(
        <div className={style.createStreamBox}>
            <div className={style.createStreamForm}>      
                <div className={style.streamInformation}>

                        <label className={style.titleLabel}>Stream information</label>
                        <hr className={style.titleLine}/>


                    <div className={style.fieldDiv}>
                    <label className={style.fieldLabel}>Stream Title:</label>
                        <input className={style.fieldText} type="text"/>
                    </div>

                    <div className={style.checkboxDiv}>
                    <label className={style.fieldLabel}>Private viewing?
                        <input className={style.checkbox} type="checkbox" checked={privateStream} onChange={privacyCheckboxOnChange}></input>
                        </label>
                    </div>

                    <div className={style.fieldDiv}>
                    <label className={style.fieldLabel}>Tags:</label>
                    <CreateableInputOnly style={customTagStyle}/>
                    </div>

                    <div className={style.fieldDiv}>
                    <label className={style.fieldLabel}>Description:</label>
                        <input className={style.descriptionText} type="text"/>
                    </div>

                    <div className={style.fieldDiv}>
                    <label className={style.fieldLabel}>Start Time:</label>
                        <input type="text"/>
                    </div>
                    

                </div>
                <div className={style.participants}>
                    <label className={style.titleLabel}>Participants</label>
                    <hr className={style.titleLine}/>
                    
                    <div className={style.checkboxDiv}>
                    <label className={style.fieldLabel}>Invite Only?</label>
                        <input className={style.checkbox} type="checkbox" checked={inviteOnly} onChange={inviteOnlyCheckboxOnChange}></input>
                    </div>

                    <div className={style.fieldDiv}>
                    <label className={style.fieldLabel}>Teams:</label>
                    <input type="text"/> 
                    </div>

                </div>
            </div>
        </div>
    );
}

export default NewStream;