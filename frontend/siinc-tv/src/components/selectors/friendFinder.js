import React from 'react';
import {friendsMock} from "../../mocks/friendsMock";
import Select from 'react-select';

/**
 * @brief This basically defines a team of streamers
 * 
 * @param {*} props styles, group, and setGroup should be passed.
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
        options={friendsMock}
        className="basic-multi-select"
        classNamePrefix="select"
    />
    );
}
export default FriendFinder;