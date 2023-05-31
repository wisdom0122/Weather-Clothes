import React, { useState } from "react";

const Note = () => {
  const [meal, setMeal] = useState("");
  const [notes, setNotes] = useState({
    아침: "",
    점심: "",
    저녁: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState("");

  const handleMealSelection = (selectedMeal) => {
    setMeal(selectedMeal);
    setIsEditing(false);
    setEditedNote("");
  };

  const handleNoteChange = (e) => {
    setEditedNote(e.target.value);
  };

  const handleNoteSave = () => {
    setNotes({ ...notes, [meal]: editedNote });
    setIsEditing(false);
    setEditedNote("");
  };

  const handleNoteEdit = () => {
    setIsEditing(true);
    setEditedNote(notes[meal]);
  };

  const handleNoteDelete = () => {
    setNotes({ ...notes, [meal]: "" });
  };

  return (
    <div>
      <div>
        <label>
          <input
            type="radio"
            name="meal"
            value="아침"
            checked={meal === "아침"}
            onChange={() => handleMealSelection("아침")}
          />
          아침
        </label>
        <label>
          <input
            type="radio"
            name="meal"
            value="점심"
            checked={meal === "점심"}
            onChange={() => handleMealSelection("점심")}
          />
          점심
        </label>
        <label>
          <input
            type="radio"
            name="meal"
            value="저녁"
            checked={meal === "저녁"}
            onChange={() => handleMealSelection("저녁")}
          />
          저녁
        </label>

        {isEditing && (
          <div>
            <textarea
              value={editedNote}
              onChange={handleNoteChange}
              placeholder="메모를 입력하세요."
            ></textarea>
            <button onClick={handleNoteSave}>저장</button>
          </div>
        )}
        {notes[meal] && !isEditing && (
          <button onClick={handleNoteEdit}>수정</button>
        )}
        {notes[meal] && <button onClick={handleNoteDelete}>삭제</button>}
      </div>
      <div>
        <ul>
          <li>
            아침:
            <span onClick={handleNoteEdit} className="note-content">
              {notes["아침"] ? notes["아침"] : "메모 입력"}
            </span>
          </li>
          <li>
            점심:
            <span onClick={handleNoteEdit} className="note-content">
              {notes["점심"] ? notes["점심"] : "메모 입력"}
            </span>
          </li>
          <li>
            저녁:
            <span onClick={handleNoteEdit} className="note-content">
              {notes["저녁"] ? notes["저녁"] : "메모 입력"}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Note;
