import React, {useState, useRef} from "react";
import style from './newStream.module.css'
import update from 'immutability-helper';
import FriendFinder from "../selectors/friendFinder";


/**
 * @brief This is a utility function for generating keys
 * 
 * @param {*} pre 
 */
const generateKey = (pre) => {
    return `${ pre }_${ new Date().getTime() }`;
}

// We use this to style our selector   
const customTagStyle={
    control: styles=>({...styles, width:580, marginTop:10, borderRadius:14, height:40, minHeight: 40}),
    valueContainer: styles=>({...styles, height:40, minHeight: 40}),
    indicatorContainer: styles=>({...styles, height:40, minHeight: 40,paddingTop:0, paddingBottom:0}),
    input: styles=>({...styles, top:20, lineHeight:0, fontFamilt:'Roboto',textAlign:'center', fontWeight: 'normal', color: '#AFAFAF'}),
    placeholder: styles=>({...styles, top:20, lineHeight:0, fontFamily:'Roboto',
    textAlign:'center', fontWeight: 'normal', color: '#AFAFAF'}),
    multiValue: styles=>({...styles, bottom:20, height:30, backgroundColor:'#8D31D8', borderRadius:14}),
    multiValueLabel: styles=>({...styles, height:30, fontSize:18, top:15, color:'#F0D6FF', fontFamily:'Roboto'}),
    menu:styles=>({...styles, width:580, borderRadius:14}),
    menuList:styles=>({...styles, width:580, borderRadius:14, fontFamily:'Roboto',
    fontWeight: 'normal', color: '#AFAFAF'}),
};

/**
 * @brief defines a group of streamers
 * @param {*} props props should have a member streamGroups and setStreamGroups for updating the current groups
 */
function TeamBlock(props){
    const maxGroups = props.maxGroups;
    const friends = props.friends;
    const streamGroups = props.streamGroups;
    const setStreamGroups = props.setStreamGroups;
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    /**
     * @brief adds a new group, if the number of groups exceeds 4 it does not allow to add a new group
     */
    const addGroup =()=>{
        if(streamGroups.length >= maxGroups)
        {
            console.log("Maxmium number of groups exceeded")
            return;
        }
        const newKey = generateKey('G_');
        const newGroups = [...streamGroups,{key: newKey, group:[]}];
        setStreamGroups(newGroups);
        console.log(newGroups);
    }

/**
 * @brief deletes a group in certain index
 * 
 * @param {*} key the key of the group
 */
    const deleteGroup=(key)=>{
        console.log(key);
        const index = streamGroups.findIndex(g => g.key === key);
        streamGroups.splice(index, 1);
        setStreamGroups(streamGroups);
        console.log(streamGroups);
        forceUpdate()
    }

    return(
        <div>
        {streamGroups.map((group)=>{
            if(group === null) return;
            console.log(group.key)
            return(
                <div className={style.teamDiv} key={group.key + "d"}>
                <FriendFinder key={group.key}
                    friends={friends}
                    styles={customTagStyle}
                    group={group}
                    // Updates the specific group in the index
                    setGroup={(newGroup)=>{
                        console.log(newGroup);
                        const index = streamGroups.findIndex(g => g.key === group.key) 
                        const updatedStreamGroups = update(streamGroups, {$splice: [[index, 1, newGroup]]});
                        setStreamGroups(updatedStreamGroups)
                        forceUpdate();   
                    }}
                />
                    <button className={style.removeTeamButton} key={group.key + "b"} onClick={()=>{deleteGroup(group.key)}}/>
                </div>
            );})}
            <div className={style.addTeamDiv}>
            {(streamGroups.length  < 4) && <button className={style.addTeamButton} onClick={addGroup}/>}
            </div>
            </div>
    );
}
export default TeamBlock;