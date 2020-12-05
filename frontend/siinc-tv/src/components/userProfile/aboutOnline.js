import React, {useState} from 'react';
import style from './profile.module.css'
import streamPlaceHolder from '../../assets/placeholderprevstream.png'; //todo


function AboutOnline(props) {
    
    const userName = props.userName;
    const currentLables = ['Label 1','Labe 2','Label 3'] //todo
    const prevStreams = ['Stream 1','Stream2','Stream3'] //todo


    function CurrentStream(){
        return(
        <div>
            <img className={style.streamThumbnail} src={streamPlaceHolder}/>
            <h3 className={style.titleMatch}>
                Stream 1
            </h3>
            <p className={style.matchPeople}>{userName} and user1 </p>
            <div className={style.points}> 
                <div className={style.catagory}> Category </div>
                {currentLables.map((value, index) => {
                    return <label className={style.catagoryLabel} key={index}>{value}</label>
                })}
            </div>
        </div>
        );
    }

    function PrevStream(){
        return(
            <div>
            <div className={style.div40}>
                <img className={style.streamThumbnail} src={streamPlaceHolder}/>
            </div>
            <div className={style.div60}>
                <div className={style.content}>
                    <h3 className={style.titleMatch}>
                        Stream 3
                    </h3>
                    <p>{userName}, user2 and 2 more...</p>
                    <p>Category</p>
                    <div>
                            {currentLables.map((value, index) => {
                                return <label className={style.catagoryLabel} key={index}>{value}</label>
                            })}
                    </div>
                </div>
            </div>
            <div className={style.clearfix}></div>
        </div>
        );
    }


    return (
        <div className={style.container}>
            <div className={style.div100}>
                <div className={style.div40}>
                    <div className={style.content}>
                        <div className={style.headStream}>Current Stream Live</div>
                        <CurrentStream/>
                    </div>
                </div>
                <div className={style.div60}>
                    <div className={style.content}>
                        <div className={style.headStream}>Prevoius Streams</div>
                        <PrevStream></PrevStream> {/* todo */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutOnline