import React, { useState, useRef } from "react";
import style from "./newStream.module.css";
import update from "immutability-helper";
import FriendFinder from "../selectors/friendFinder";


 //This is a utility function for generating keys
const generateKey = (pre) => {
  return `${pre}_${new Date().getTime()}`;
};

// We use this to style our selector
const customTagStyle = {
  control: (styles, state) => ({
    ...styles,
    width: 580,
    marginTop: 10,
    backgroundColor: "#251A37",
    borderRadius: state.isFocused ? 3 : 3,
    height: 40,
    minHeight: 40,
    lineHeight: "150%",
    border: state.isFocused ? "1px solid rgb(153, 153, 153)" : "none",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    ":hover": {
      borderRadius: 3,
      cursor: "pointer",
      border: "1px solid rgb(153, 153, 153)",
    },
  }),
  valueContainer: (styles) => ({
    ...styles,
    height: 40,
    minHeight: 40,
    cursor: "text",
  }),
  indicatorContainer: (styles) => ({
    ...styles,
    height: 40,
    minHeight: 40,
    paddingTop: 0,
    paddingBottom: 0,
    cursor: "pointer",
  }),
  input: (styles) => ({
    ...styles,
    top: 20,
    lineHeight: 0,
    fontFamilt: "Roboto",
    textAlign: "center",
    fontWeight: "normal",
    color: "#AFAFAF",
  }),
  placeholder: (styles) => ({
    ...styles,
    top: 20,
    lineHeight: 0,
    fontFamily: "Roboto",
    textAlign: "center",
    fontWeight: "normal",
    color: "#AFAFAF",
  }),
  multiValue: (styles) => ({
    ...styles,
    textAlign: "center",
    bottom: 20,
    height: 30,
    backgroundColor: "#123B22",
    borderRadius: 5,
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    cursor: "default",
    textAlign: "center",
    height: 30,
    fontSize: 16,
    top: 15,
    color: "#FFFFFF",
    opacity: 0.7,
    fontFamily: "Roboto",
  }),
  menu: (styles) => ({
    ...styles,
    width: 580,
    borderRadius: 5,
    backgroundColor: "black",
    color: "#AFAFAF",
  }),
  menuList: (styles) => ({
    ...styles,
    width: 580,
    borderRadius: 5,
    fontFamily: "Roboto",
    fontWeight: "normal",
    color: "#AFAFAF",
    opacity: 0.75,
    backgroundColor: "#251A37",
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    ":hover": {
      backgroundColor: "#071A0E",
      cursor: "pointer",
      backgroud: "#AFAFAF",
    },
  }),
};

/**
 * This is the block in the stream creations in charge of selecting friends
 * 
 * @prop {Number} maxGroups maximum amount of groups to allow
 * @prop {friendsData[]} friends the users friends
 * @prop {streamGroup[]} streamGroups the currently selected groups of streamers
 * @prop {Function} setStreamGroups setter for stream groups
 * @component
 * @category Frontend
 * @subcategory Stream Creation
 */
function TeamBlock(props) {
  const maxGroups = props.maxGroups;
  const friends = props.friends;
  const streamGroups = props.streamGroups;
  const setStreamGroups = props.setStreamGroups;
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  /**
   * adds a new group, if the number of groups exceeds 4 it does not allow to add a new group
   */
  const addGroup = () => {
    if (streamGroups.length >= maxGroups) {
      console.log("Maxmium number of groups exceeded");
      return;
    }
    const newKey = generateKey("G_");
    const newGroups = [...streamGroups, { key: newKey, group: [] }];
    setStreamGroups(newGroups);
    console.log(newGroups);
  };

  /**
   * deletes a group in certain index
   *
   * @param {*} key the key of the group
   */
  const deleteGroup = (key) => {
    console.log(key);
    const index = streamGroups.findIndex((g) => g.key === key);
    streamGroups.splice(index, 1);
    setStreamGroups(streamGroups);
    console.log(streamGroups);
    forceUpdate();
  };

  return (
    <div>
      {streamGroups.map((group) => {
        if (group === null) return;
        console.log(group.key);
        return (
          <div className={style.teamDiv} key={group.key + "d"}>
            <FriendFinder
              key={group.key}
              friends={friends}
              styles={customTagStyle}
              group={group}
              // Updates the specific group in the index
              setGroup={(newGroup) => {
                console.log(newGroup);
                const index = streamGroups.findIndex(
                  (g) => g.key === group.key
                );
                const updatedStreamGroups = update(streamGroups, {
                  $splice: [[index, 1, newGroup]],
                });
                setStreamGroups(updatedStreamGroups);
                forceUpdate();
              }}
            />
            <button
              className={style.removeTeamButton}
              key={group.key + "b"}
              onClick={() => {
                deleteGroup(group.key);
              }}
            />
          </div>
        );
      })}
      <div className={style.addTeamDiv}>
        {streamGroups.length < 4 && (
          <button className={style.addTeamButton} onClick={addGroup} />
        )}
      </div>
    </div>
  );
}
export default TeamBlock;
