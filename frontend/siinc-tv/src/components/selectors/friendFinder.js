import React from 'react';
import {friendsMock} from "../../mocks/friendsMock";
import Select from 'react-select';

/**
 * This basically defines a team of streamers
 * 
 * @prop {streamGroup} group the current group of streamers
 * @prop {Function} setGroup setter for the streamer group
 * @prop {friendsData[]} friends user's friends
 * @component
 * @category Frontend
 * @subcategory Selectors
 */
function FriendFinder(props){
    const styles = props.styles;
    const group = props.group;
    const setGroup = props.setGroup;
    const friends = props.friends;

    const onChange=(value)=>{
        setGroup({key: group.key, group: value});
        console.log(value);
    };
    return(
        <Select
        styles={styles}
        isMulti
        name="friends"
        onChange={onChange}
        options={friends}
        className="basic-multi-select"
        classNamePrefix="select"
    />
    );
}
export default FriendFinder;