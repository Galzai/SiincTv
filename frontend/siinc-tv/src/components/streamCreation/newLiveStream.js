import React, {useState, useRef} from "react";
import style from './newStream.module.css'
import CreateableInputOnly from "../selectors/createableInputOnly";
import userUtils from "../../user/userUtils" 
import TeamBlock from "./teamBlock";
import NavigationBar from "../NavigationBar/navigationBar"
const { default: streamActions } = require("../../stream/streamActions");

/**
 * @brief stream creation page
 * @param {user} props expects the current user to be passed as props
 */
function NewLiveStream(props){
    const {
        user
    }=props;

    const [name, setName]=useState("");
    const [privateStream, setPrivateStream]=useState(false);
    const [inviteOnly, setInviteOnly]=useState(true);
    const [tags, setTags]=useState([]);
    const [date, setDate]=useState(new Date().toLocaleString());
    const [streamGroups, setStreamGroups]=useState([]);
    const [description, setDescription]=useState('');
    const [currentTag, setCurrentTag] = useState("");
    const [formErrors, setFormErrors] = useState(null);

// We use this to style our selector   
const customTagStyle={
    control: (styles, state)=>({...styles, width:613, marginTop:10, backgroundColor: '#251A37', borderRadius:state.isFocused?3:3, height:40, 
    minHeight: 40, border: state.isFocused?'1px solid rgb(153, 153, 153)':'none', boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    ':hover': {borderRadius: 3, cursor: 'text', border: '1px solid rgb(153, 153, 153)'}}),
    valueContainer: styles=>({...styles, height:40, minHeight: 40}),
    indicatorContainer: styles=>({...styles, height:40, minHeight: 40,paddingTop:0, paddingBottom:0}),
    input: styles=>({...styles, top:20, lineHeight:0, fontFamilt:'Roboto',textAlign:'center', fontWeight: 'normal', color: '#AFAFAF'}),
    placeholder: styles=>({...styles, top:20, lineHeight:0, fontFamily:'Roboto',
    textAlign:'center', fontWeight: 'normal', color: '#AFAFAF'}),
    multiValue: styles=>({...styles, textAlign:'center', bottom:20, height:30, backgroundColor:'#12343B', borderRadius:5}),
    multiValueLabel: styles=>({...styles, height:30, fontSize:16, top:15, color:'#FFFFFF', fontFamily:'Roboto'}),
    multiValueRemove: styles=>({...styles,':hover': {backgroundColor: '#071416', color: '#AFAFAF', cursor: 'pointer'}})
};



    /**
     * @brief sets the value of inviteOnly
     */
    const inviteOnlyCheckboxOnChange=()=>{
        setInviteOnly(!inviteOnly);
    };


    /**
     * @brief handles new stream form submission
     */
    const submissionHandler=()=>{
        // if(streamGroups.length == 0)
        // {
        //     setFormErrors("Must have at least one other streamer.");
        //     return;
        // }
        const creatorData = {
             displayName: user.username,
             userImage: userUtils.assignImage(user),
             youtubeId: user.googleData ? user.googleData.youtubeId : null,
             twitchId: user.twitchId
            };
        
        const submissionData =
        {
            name:name,
            creator: creatorData,
            privateStream:privateStream,
            inviteOnly:inviteOnly,
            tags:tags,
            date:date,
            status:"Live",
            streamGroups:[...streamGroups, {group:[creatorData]} ],
            description:description
        }
        streamActions.createNewStream(submissionData);
        //TODO: Redirect to created stream page if completed succesfully

    }

    function filterFriends(user) {
        const friends = user.friendsData.friendsList;
        const filteredFriends = friends.filter((friend=>{ return (friend.twitchId || friend.youtubeId)}
        ));
        return filteredFriends;
    }

    return(
        <div>
        <div className={style.createStreamBox}>
            <div className={style.createStreamForm}>
                <div className={style.streamInformation}>
                    <div>
                        <label className={style.titleLabel}>Stream information</label>
                        <button className={style.submitButton} onClick={submissionHandler}>Submit</button>
                        <hr className={style.titleLine}/>
                    </div>
                        {formErrors &&<h2>{formErrors}</h2>}

                    <div className={style.fieldDiv}>
                    <label className={style.fieldLabel}>Stream Title:</label>
                        <input className={style.fieldText}  onChange={e => setName(e.target.value)} type="text" value={name}/>
                    </div>
                    <div className={style.fieldDiv}>
                    <label className={style.fieldLabel}>Tags:</label>
                    <CreateableInputOnly style={customTagStyle} updateTags={setTags}/>
                    </div>

                    <div className={style.fieldDiv}>
                    <label className={style.fieldLabel}>Description:</label>
                        <textarea className={style.descriptionText}  onChange={e => setDescription(e.target.value)} type="text" value={description}/>
                    </div>
                </div>
                                    
                <div className={style.checkboxDiv}>
                    <label className={style.fieldLabel}>Invite Only?
                        <input className={style.checkbox} type="checkbox" checked={inviteOnly} onChange={inviteOnlyCheckboxOnChange}></input>
                        </label>
                    </div>
                <div className={style.participants}>
                    <label className={style.titleLabel}>Participants</label>
                    <hr className={style.titleLine}/>

                    <div className={style.fieldDiv}>
                    <label className={style.fieldLabel}>Invite Friends:</label>
                        <TeamBlock
                        maxGroups={1}
                        friends={filterFriends(user)}
                        streamGroups={streamGroups}
                        setStreamGroups={setStreamGroups}/> 
                    </div>

                </div>
            </div>
        </div>
        <NavigationBar></NavigationBar>
        </div>
    );
}

export default NewLiveStream;