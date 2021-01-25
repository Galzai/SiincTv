/**
 * Handles creation of scheduled streams
 * Note: not currently in use
 */
import React, { useState, useRef } from "react";
import style from "./newStream.module.css";
import CreateableInputOnly from "../selectors/createableInputOnly";
import StreamDatePicker from "./streamDatePicker";
import TeamBlock from "./teamBlock";
import UserContext from "../../userContext";
const { default: streamActions } = require("../../stream/streamActions");

/**
 * @brief stream creation page
 * @param {user} props expects the current user to be passed as props
 */
function NewScheduledStream(props) {
  const { user } = props;

  const [name, setName] = useState("");
  const [privateStream, setPrivateStream] = useState(false);
  const [inviteOnly, setInviteOnly] = useState(false);
  const [tags, setTags] = useState([]);
  const [date, setDate] = useState(new Date().toLocaleString());
  const [streamGroups, setStreamGroups] = useState([]);
  const [description, setDescription] = useState("");
  const [currentTag, setCurrentTag] = useState("");

  // We use this to style our selector
  const customTagStyle = {
    control: (styles) => ({
      ...styles,
      width: 613,
      marginTop: 10,
      borderRadius: 14,
      height: 40,
      minHeight: 40,
    }),
    valueContainer: (styles) => ({ ...styles, height: 40, minHeight: 40 }),
    indicatorContainer: (styles) => ({
      ...styles,
      height: 40,
      minHeight: 40,
      paddingTop: 0,
      paddingBottom: 0,
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
      bottom: 20,
      height: 30,
      backgroundColor: "#8D31D8",
      borderRadius: 14,
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      height: 30,
      fontSize: 18,
      top: 15,
      color: "#F0D6FF",
      fontFamily: "Roboto",
    }),
  };

  /**
   * @brief sets the value of privateStrean
   */
  const privacyCheckboxOnChange = () => {
    setPrivateStream(!privateStream);
  };

  /**
   * @brief sets the value of inviteOnly
   */
  const inviteOnlyCheckboxOnChange = () => {
    setInviteOnly(!inviteOnly);
  };

  /**
   * @brief handles new stream form submission
   */
  const submissionHandler = () => {
    const submissionData = {
      name: name,
      privateStream: privateStream,
      inviteOnly: inviteOnly,
      tags: tags,
      date: date,
      status: "Scheduled",
      streamGroups: streamGroups,
      description: description,
    };
    streamActions.createNewStream(submissionData);
    //TODO: Redirect to created stream page if completed succesfully
  };

  return (
    <div className={style.createStreamBox}>
      <div className={style.createStreamForm}>
        <div className={style.streamInformation}>
          <label className={style.titleLabel}>Stream information</label>
          <hr className={style.titleLine} />

          <div className={style.fieldDiv}>
            <label className={style.fieldLabel}>Stream Title:</label>
            <input
              className={style.fieldText}
              onChange={(e) => setName(e.target.value)}
              type="text"
              value={name}
            />
          </div>

          <div className={style.checkboxDiv}>
            <label className={style.fieldLabel}>
              Private viewing?
              <input
                className={style.checkbox}
                type="checkbox"
                checked={privateStream}
                onChange={privacyCheckboxOnChange}
              ></input>
            </label>
          </div>

          <div className={style.fieldDiv}>
            <label className={style.fieldLabel}>Tags:</label>
            <CreateableInputOnly style={customTagStyle} updateTags={setTags} />
          </div>

          <div className={style.fieldDiv}>
            <label className={style.fieldLabel}>Description:</label>
            <textarea
              className={style.descriptionText}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              value={description}
            />
          </div>

          <div className={style.fieldDiv}>
            <label className={style.fieldLabel}>Start Time:</label>
            <StreamDatePicker updateDate={setDate} />
          </div>
        </div>
        <div className={style.participants}>
          <label className={style.titleLabel}>Participants</label>
          <hr className={style.titleLine} />

          <div className={style.checkboxDiv}>
            <label className={style.fieldLabel}>
              Invite Only?
              <input
                className={style.checkbox}
                type="checkbox"
                checked={inviteOnly}
                onChange={inviteOnlyCheckboxOnChange}
              ></input>
            </label>
          </div>

          <div className={style.fieldDiv}>
            <label className={style.fieldLabel}>Teams:</label>
            <TeamBlock
              maxGroups={3}
              friends={user.friends}
              streamGroups={streamGroups}
              setStreamGroups={setStreamGroups}
            />
          </div>
        </div>
        <button className={style.submitButton} onClick={submissionHandler}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default NewScheduledStream;
