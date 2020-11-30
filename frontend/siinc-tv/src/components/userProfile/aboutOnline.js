import React, {useState} from 'react';
import style from './profile.module.css'
import streamPlaceHolder from '../../assets/placeholderprevstream.png'; //todo


function AboutOnline(props) {
    
    const userName = props.userName;
    const lables = ['Label 1','Labe 2','Label 3'] //todo

    function CurrentStream(){
        return(
        <div className={style.div40}>
            <div className={style.content}>
                <div className={style.currentStream}>Current Stream Live</div>
                <img className={style.streamThumbnail} src={streamPlaceHolder}/>
                <h3 className={style.titleMatch}>
                    Title Match 3
                </h3>
                <p className={style.matchPeople}>{userName} and User B vs V2</p>
                <div className={style.points}> 
                    <div className={style.catagory}> Category </div>
                    {lables.map((value, index) => {
                        return <label className={style.catagoryLabel} key={index}>{value}</label>
                    })}
                </div>
            </div>
        </div>
        );
    }


    return (
        <div className={style.container}>
            <div className={style.ml20}>
                <div className={style.div40}>
                    <div className={style.content}>
                        <div className={style.currentStream}>Current Stream Live</div>
                        <img className={style.streamThumbnail} src={streamPlaceHolder}/> 
                        <h3 className={style.titleMatch}>
                            Title Match 3
                        </h3>
                        <p className={style.matchPeople}>{userName} and User B vs V2</p>
                        <div className={style.points}> 
                            <div className={style.catagory}> Category </div>
                            {lables.map((value, index) => {
                                return <label className={style.catagoryLabel} key={index}>{value}</label>
                            })}
                        </div>
                    </div>
                </div>
                <div className={style.div60}>
                    <div className={style.content}>
                        <h2>Prevoius Streams</h2>
                        <div class="div-40 mb-15">
                            <img src="images/p2.png" alt="img" class="w-100" />
                        </div>
                        <div class="div-60 mb-15">
                            <div class="content">
                                <h3 class="mb-5 mt-0">
                                    Title Match 3
                                </h3>
                                <p class="mb-5  mt-0">User B vs V2</p>
                                <p class="mb-5 mt-0">Category</p>
                                <div class="points mt-10">
                                    <label>Label 1</label>
                                    <label>Label 2</label>
                                    <label>Label 3</label>
                                </div>
                            </div>
                        </div>

                        <div class="clearfix"></div>

                        <div class="div-40 mb-15">
                            <img src="images/p2.png" alt="img" class="w-100" />
                        </div>
                        <div class="div-60 mb-15">
                            <div class="content">
                                <h3 class="mb-5 mt-0">
                                    Title Match 3
                                </h3>
                                <p class="mb-5  mt-0">User B vs V2</p>
                                <p class="mb-5 mt-0">Category</p>
                                <div class="points mt-10">
                                    <label>Label 1</label>
                                    <label>Label 2</label>
                                    <label>Label 3</label>
                                </div>
                            </div>
                        </div>

                        <div class="clearfix"></div>

                        <div class="div-40 mb-15">
                            <img src="images/p2.png" alt="img" class="w-100" />
                        </div>
                        <div class="div-60 mb-15">
                            <div class="content">
                                <h3 class="mb-5 mt-0">
                                    Title Match 3
                                </h3>
                                <p class="mb-5  mt-0">User B vs V2</p>
                                <p class="mb-5 mt-0">Category</p>
                                <div class="points mt-10">
                                    <label>Label 1</label>
                                    <label>Label 2</label>
                                    <label>Label 3</label>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutOnline