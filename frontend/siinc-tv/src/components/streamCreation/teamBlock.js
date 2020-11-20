import React, {useState, useRef} from "react";
import update from 'immutability-helper';
import FriendFinder from "../selectors/friendFinder";

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
    menuList:styles=>({...styles, width:580, borderRadius:14})
};

/**
 * @brief defines a group of streamers
 * @param {*} props props should have a member streamGroups and setStreamGroups for updating the current groups
 */
function TeamBlock(props){
    const streamGroups = props.streamGroups;
    const setStreamGroups = props.setStreamGroups;
    const [teams, setTeams] = useState([]);
    const [numOfTeams, setNumOfTeams]=useState(0);

    /**
     * @brief used for mapping subgroups to their team finder
     * 
     * @param {*} group the group mapped to the finder
     * @param {*} index the index of the group
     */
    const updateTeamMap=(group, index)=>
            <div>
            <FriendFinder
                styles={customTagStyle}
                group={group}
                // Updates the specific group in the index
                setGroup={(newGroup)=>{
                    console.log(newGroup);
                    const updatedStreamGroups=update(streamGroups, {$splice: [[index, 1, newGroup]]});
                    setStreamGroups(updatedStreamGroups);   
                }}
            />
                <button onClick={()=>{deleteGroup(index)}}>-</button>
            </div>

    /**
     * @brief adds a new group, if the number of groups exceeds 4 it does not allow to add a new group
     */
    const addGroup=()=>{
        if(numOfTeams > 3)
        {
            console.log("Maxmium number of groups exceeded")
            return;
        }
        setNumOfTeams(numOfTeams + 1);
        streamGroups.push([]);
        console.log(streamGroups);
        // Teams is always set to map between the group to its selector
        setTeams(streamGroups.map(updateTeamMap));
    }

/**
 * @brief deletes a group in certain index
 * 
 * @param {*} index the index of the group
 */
    const deleteGroup=(index)=>{
        console.log(index);
        const streamGroupsCopy = streamGroups;
        if(index > -1)
        {
            streamGroups.splice(index, 1);
            teams.splice(index, 1)
            console.log(streamGroups);
            setNumOfTeams(numOfTeams - 1);
            setTeams(streamGroups.map(updateTeamMap));

        }

    }
    return(
        <div>
            {teams}
            {(numOfTeams  < 4) && <button onClick={addGroup}>+</button>}
        </div>

    );
}
export default TeamBlock;