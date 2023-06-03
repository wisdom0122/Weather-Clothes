import React, { useState } from "react";
import axios from "axios";
import delIcon from "../../assets/images/Vector.png";

const NoteApp = ({ postdate, setSelectedScheduleId }) => {
  // 전체 수정 관리
  const [isEditing, setIsEditing] = useState(false);
  // 아침 메모 수정 관리
  const [morningEdit, setmorningEdit] = useState(false);
  const [morningMemo, setMorningMemo] = useState("");
  const [morningLocate, setMorningLocate] = useState("");
  // 점심
  const [afternoonEdit, setAfternoonEdit] = useState(false);
  const [afternoonMemo, setAfternoonMemo] = useState("");
  const [afternoonLocate, setAfternoonLocate] = useState("");

  // 저녁
  const [eveningEdit, setEveningEdit] = useState(false);
  const [eveningMemo, setEveningMemo] = useState("");
  const [eveningLocate, setEveningLocate] = useState("");
  // 수정 모드
  const allowEditing = () => {
    setIsEditing(true);
  };
  // 수정 종료
  const saveEditing = () => {
    if (
      morningMemo.length < 1 &&
      morningLocate.length < 1 &&
      eveningMemo.length < 1 &&
      eveningLocate.length < 1 &&
      afternoonMemo.length < 1 &&
      afternoonLocate.length < 1
    ) {
      alert("일정을 입력해주세요");
    } else {
      setIsEditing(false);
      setmorningEdit(false);
      setAfternoonEdit(false);
      setEveningEdit(false);
      saveSchedule();
    }
  };
  // 아침 버튼
  const morningEditing = () => {
    if (isEditing) {
      setEveningEdit(false);
      setAfternoonEdit(false);
      setmorningEdit(true);
    }
    setSelectedScheduleId("morning");
  };
  const deleteMorning = () => {
    setMorningMemo("");
    setMorningLocate("");
    deleteSchedule();
  };
  //아침 메모
  const changeMorningMemo = (e) => {
    setMorningMemo(e.target.value);
  };
  //아침 지역
  const changeMorningLocate = (e) => {
    setMorningLocate(e.target.value);
  };

  //   --------------------------------------------
  //  점심 버튼
  const afternoonEditing = () => {
    if (isEditing) {
      setEveningEdit(false);
      setAfternoonEdit(true);
      setmorningEdit(false);
    }
    setSelectedScheduleId("afternoon");
  };
  const deleteAfternoon = () => {
    setAfternoonMemo("");
    setAfternoonLocate("");
    deleteSchedule();
  };
  const changeAfternoonMemo = (e) => {
    setAfternoonMemo(e.target.value);
  };
  const changeAfternoonLocate = (e) => {
    setAfternoonLocate(e.target.value);
  };
  //   저녁 버튼
  const eveningEditing = () => {
    if (isEditing) {
      setEveningEdit(true);
      setAfternoonEdit(false);
      setmorningEdit(false);
    }
    setSelectedScheduleId("evening");
  };
  const deleteEvening = () => {
    setEveningMemo("");
    setEveningLocate("");
    deleteSchedule();
  };
  const changeEveningMemo = (e) => {
    setEveningMemo(e.target.value);
  };
  const changeEveningLocate = (e) => {
    setEveningLocate(e.target.value);
  };

  const saveSchedule = async () => {
    try {
      if (morningMemo || afternoonMemo || eveningMemo) {
        let timeOfDay = "";
        if (morningMemo) {
          timeOfDay = "MORNING";
        } else if (afternoonMemo) {
          timeOfDay = "AFTERNOON";
        } else if (eveningMemo) {
          timeOfDay = "EVENING";
        }

        const scheduleData = {
          date: postdate,
          title: morningMemo || afternoonMemo || eveningMemo,
          timeOfDay: timeOfDay,
          regionName: morningLocate || afternoonLocate || eveningLocate,
        };

        const response = await axios.post("/api/schedules", scheduleData, {
          headers: {
            Cookie:
              "accessToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjgzMzY4MTE0LCJleHAiOjE2ODMzNjk5MTR9.Q2F7ss4hxL6O7ZXTSRB5M27zWBJG_rNJbUfvXoTmyhU; Path=/; Max-Age=604800; Expires=Sat, 13 May 2023 10:15:14 GMT; Secure; HttpOnly; SameSite=None",
          },
        });
        console.log("POST 요청 성공:", response);
      }
    } catch (error) {
      console.error("POST 요청 실패:", error);
    }
  };

  const deleteSchedule = async (id) => {
    try {
      const response = await axios.delete(`/api/schedules/${id}`, {
        headers: {
          Cookie:
            "accessToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjgzMzY4MTE0LCJleHAiOjE2ODMzNjk5MTR9.Q2F7ss4hxL6O7ZXTSRB5M27zWBJG_rNJbUfvXoTmyhU; Path=/; Max-Age=604800; Expires=Sat, 13 May 2023 10:15:14 GMT; Secure; HttpOnly; SameSite=None",
        },
      });
      console.log("Schedule deleted:", response.data);
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };
  return (
    <div>
      {/* 상단 라디오  */}
      <div className="radioBox">
        <label>
          <input
            onClick={morningEditing}
            type="radio"
            name="meal"
            value="morning"
          />
          아침
        </label>
        <label>
          <input
            onClick={afternoonEditing}
            type="radio"
            name="meal"
            value="afternoon"
          />
          점심
        </label>
        <label>
          <input
            onClick={eveningEditing}
            type="radio"
            name="meal"
            value="evening"
          />
          저녁
        </label>
      </div>

      <div className="flex row memoBox">
        <h3></h3>
        <div className="flex justify-center memoPtag">
          <span className="flex flex-row">
            <div className="flex flex-row">
              <input
                style={{ display: morningEdit ? "block" : "none" }}
                className="memoinput firstInput"
                type="text"
                value={morningMemo}
                onChange={changeMorningMemo}
              />
              <input
                placeholder="지역"
                style={{ display: morningEdit ? "block" : "none" }}
                className="memoinput secInput"
                type="text"
                value={morningLocate}
                onChange={changeMorningLocate}
              />
            </div>
            <div className="flex flex-row">
              <input
                style={{ display: morningEdit ? "none" : "block" }}
                className="memoinput bgYellow firstInput"
                onClick={morningEditing}
                value={morningMemo}
              ></input>
              <input
                style={{ display: morningEdit ? "none" : "block" }}
                className="memoinput bgYellow secInput"
                onClick={morningEditing}
                value={morningLocate}
              ></input>
              {morningEdit && (
                <button
                  onClick={deleteMorning}
                  style={{ display: morningEdit ? "block" : "none" }}
                >
                  <img src={delIcon} alt="삭제" />
                </button>
              )}
            </div>
          </span>
        </div>
      </div>

      <div className="flex row memoBox">
        <h3></h3>
        <div className="flex justify-center memoPtag">
          <span className="flex flex-row">
            <div className="flex flex-row">
              <input
                style={{ display: afternoonEdit ? "block" : "none" }}
                className="memoinput firstInput"
                type="text"
                value={afternoonMemo}
                onChange={changeAfternoonMemo}
              />
              <input
                placeholder="지역"
                style={{ display: afternoonEdit ? "block" : "none" }}
                className="memoinput secInput"
                type="text"
                value={afternoonLocate}
                onChange={changeAfternoonLocate}
              />
            </div>
            <div className="flex flex-row">
              <input
                style={{ display: afternoonEdit ? "none" : "block" }}
                className="memoinput bgYellow firstInput"
                onClick={afternoonEditing}
                value={afternoonMemo}
              ></input>
              <input
                style={{ display: afternoonEdit ? "none" : "block" }}
                className="memoinput bgYellow secInput"
                onClick={afternoonEditing}
                value={afternoonLocate}
              ></input>
              {afternoonEdit && (
                <button
                  onClick={deleteAfternoon}
                  style={{ display: afternoonEdit ? "block" : "none" }}
                >
                  <img src={delIcon} alt="삭제" />
                </button>
              )}
            </div>
          </span>
        </div>
      </div>

      <div className="flex row memoBox">
        <h3></h3>
        <div className="flex justify-center memoPtag">
          <span className="flex flex-row">
            <div className="flex flex-row">
              <input
                style={{ display: eveningEdit ? "block" : "none" }}
                className="memoinput firstInput"
                type="text"
                value={eveningMemo}
                onChange={changeEveningMemo}
              />
              <input
                placeholder="지역"
                style={{ display: eveningEdit ? "block" : "none" }}
                className="memoinput secInput"
                type="text"
                value={eveningLocate}
                onChange={changeEveningLocate}
              />
            </div>
            <div className="flex flex-row">
              <input
                style={{ display: eveningEdit ? "none" : "block" }}
                className="memoinput bgYellow firstInput"
                onClick={eveningEditing}
                value={eveningMemo}
              ></input>
              <input
                style={{ display: eveningEdit ? "none" : "block" }}
                className="memoinput bgYellow secInput"
                onClick={eveningEditing}
                value={eveningLocate}
              ></input>
              {eveningEdit && (
                <button
                  onClick={deleteEvening}
                  style={{ display: eveningEdit ? "block" : "none" }}
                >
                  <img src={delIcon} alt="삭제" />
                </button>
              )}
            </div>
          </span>
        </div>
      </div>

      {/* 입력 수정 삭제  */}
      <div className="flex justify-center relative">
        {isEditing ? (
          <div className="editOK" onClick={saveEditing}>
            확인
          </div>
        ) : (
          <div className="editButton" onClick={allowEditing}>
            일정 변경/수정/삭제
          </div>
        )}
      </div>
      <style jsx>{`
        .bgYellow {
          background-color: #f8f5bd;
          caret-color: transparent;
        }
        .memoBox {
          border-bottom: 1px solid #e2e2e2;
        }
        .memoinput {
          font-size: 1rem;
          margin: 0px;
          width: 100px;
          height: 30px;
        }
        .editOK {
          width: 100px;
          height: 37px;
          background: #eae689;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 20px 0px;
        }
        .editButton {
          position: absolute;
          right: 1.5%;
          bottom: 0%;
          transform: translateY(300%);
          cursor: pointer;
        }
        .radioBox {
          height: 40px;
          line-height: 40px;
          text-align: center;
        }
        .radioBox label {
          margin: 0px 3px;
        }
        .radioBox input {
          margin: 0px 3px;
        }
        h3 {
          margin: 17.5px 5px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ffffff;
        }
        .memoPtag {
          align-items: center;
        }
        .firstInput {
          width: 190px;
          height: 32px;
          margin: 0px 5px;
        }
        .secInput {
          width: 100px;
          height: 32px;
          margin: 0px 15px 0px 0px;
        }
      `}</style>
    </div>
  );
};

export default NoteApp;
