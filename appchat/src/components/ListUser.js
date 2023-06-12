import React, {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
export default function ListUser({handleUserClick}){
    const location = useLocation();
    const { listUser } = location.state;
    return (
        <div className="card">
            <div className="card-body">
                {/* <div className="p-2 border-bottom">
          <CreateRoom />
        </div> */}
                <div
                    style={{ height: "560px", overflow: "scroll" }}
                    className="list-unstyled mb-0"
                >
                    {listUser.map((user, index) => (
                        <div key={index} className="border-bottom p-2" onClick={() => handleUserClick(user.name, user.type)}>
                            <a className="d-flex justify-content-between">
                                <div className="d-flex flex-row">
                                    {user.type === 0 ? (
                                        <img
                                            src="https://lh3.googleusercontent.com/wF4jH0JKRq49EFDanpyw06A0wjcxLt6t0GvDPF8jcFT52hzr1YSy0L-TfANx0YY99V2cXjgBYbVOLBqfDPM9Y1RPtf6Lv35K04yO6sRlXgjl5CQO1HONhlHsItyET2pNndxjXZx7UHrf5KULl0nJStyUM7MUgoaxRrmI65rt1ae8cPlWTgLshnwuIdQ5KDK05zwB3ozROV0YAc_0Q_Edi8q9RZlltummznf6GO-wznHWALCgxn2f9FRj0D64Oucg4apuqfpO6EEXMU4B2G6KS6BqKGV0MXD_rCVmIEtGU-zGjTdcv5OMJfQ_82lVZWm8_wxg3b71c6gBDRYeBYFdlREFbS3kl2g4pYrVs2ZbgW1NR7xvHDtecVKiOJYWJw2sA3WlwOwcZLlG5fRv4DZbvkhN2015Iu95SaJKeUNEiH3Lz3DZFf1o1Ie0i5S3aALzDwFFhajXw0MOFeUZfGlQ3kc_OSEgSJ7Vd3kgK8ZxmRbN1DNdWbrIQUpdxZG8t7E1sBJ9OQ9fccFw-hVqencXsO2tXwBp9u0KpgWhM_WtaO58OjKWDEDXCuTbbFOSqg8X5r7p9IRoO0O1JYDHbj2w3SNXlkYdJWkfUHfa6ynFiCc_b0E__a-gZWOFI0XG5xQ5W2NKhxjHuKwYhq_CvWHd5y8DQXpf19Wg2zGII_JKt1mcHzldMWhj03CCxiOcl6JhpvyOTMpLqp4ERSXH2pcVFhXMaGgdOmQ9mvmdzKlBCPYEnhXcT7v_BGPUm22n-sz-z5UCjZyUd0knY1s9EUz-siP-DJSm0wQ6y2FicLZXyHk7PUbssFd6tXrNRVNGthE-pm_t1hW1uVrIn5THhwg5FM-iH1e66HRtwnFaz1v1co3Gca_T3J-SBqd4sBrlT4Vd9nGI3_jWd1mBRrZoDT0IDK6FC-A33T4_9wdSBVZ6wGDNDK5UG1HreGe5X__ElZpNokHuCHda-Mg3INku-4d3-G8oBEkQIC7rhoH5N0yDbY-Ux_GHtAo0RQn_av-_XzA-9MRwzFTetg8oHpcM13CFAzdS=w295-h292-s-no?authuser=1"
                                            alt="avatar"
                                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                            width="60"
                                        />
                                    ) : (
                                        <img
                                            src="https://lh3.googleusercontent.com/hAqdRP8qmGlv6Qj_rG5rAGyApBEbOqayhXGSVzGW5SSsWekFzLgKQBNuwq2JpmEtL_iMUnu0r8I5nUNfHFZ_zdBHUsk3DEFsSSyEQcfCFqR6CRv6WSTyPHpcU13X2UessL_r7FN2IsVigFe2y4fD7PGQ47s_7odYkzzaPbnh_8eUqANdp6wdOnX4RAk1ztHUvpGwbBlMmT46DHnhQ1pCzUDFS9Z24bJUUvP7t8ns5XW-Kma8XXlACfInvC5xJNOTVEQUjn9FqOYTAjZc5nQ6oM1Q8y4_za9_S0kOWUF1RnZ8LncQiIj46AlNiQdUfbIqFy9vsfJ5FJfQxxXW6v_bm7nbHjsYPO1cJV45oThHdlS9O-lhYKytPWoOGcmyr923onRDb0vV-7riKvxGzBg5Qh0N_NS2Hjeg-reHuZrf_d1UOBY3XUMigs_gUa4MJJzCB6yozEjYt4fBIU8u3LRlXI0tRkR3vXmlaiyn2kPerw8QXQP1rp41ZWgDp8z-S7pOiFhhpdCHj1Dm9f0O8BGMKAm-yC73Ic2-USV97UtBpBBxci1TeX7JIIOXJbGVqijAjAJflJCpmOD-RZn4xGCw3ZbbAWUS0hxWoq1S3ecjBxwT-pi28IZrym-EBmdbMjRzQX4h7bqCGC4Mc2LLbFmJ417REbEZG1akDaaUVE_V4xMu3Rjmp-bx1xIkn_X7nWSw0LPGuRqS7Fto52q9vPdOitQQg=w361-h394-no?authuser=1"
                                            alt="avatar"
                                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                            width="60"
                                        />
                                    )}
                                    <div>
                                        <h6 className="mb-0">{user.name}</h6>
                                        <p className="mb-0">{user.type === 0 ? "Teacher" : "Student"}</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}