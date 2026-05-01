import { useCallback, useMemo, useReducer } from "react";
import { courses as initialCourses } from "../data/mockData";

const initialState = {
  query: "",
  selectedTeacher: "all",
};

function reducer(state, action) {
  switch (action.type) {
    case "setQuery":
      return {
        ...state,
        query: action.payload,
      };
    case "setTeacher":
      return {
        ...state,
        selectedTeacher: action.payload,
      };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

export default function useCourses(courseList = initialCourses) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setQuery = useCallback((value) => {
    dispatch({ type: "setQuery", payload: value });
  }, []);

  const setTeacher = useCallback((value) => {
    dispatch({ type: "setTeacher", payload: value });
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({ type: "reset" });
  }, []);

  const teachers = useMemo(
    () => ["all", ...new Set(courseList.map((course) => course.teacher))],
    [courseList]
  );

  const filteredCourses = useMemo(() => {
    return courseList.filter((course) => {
      const matchesQuery =
        state.query.trim() === "" ||
        course.title.toLowerCase().includes(state.query.toLowerCase()) ||
        course.description.toLowerCase().includes(state.query.toLowerCase());

      const matchesTeacher =
        state.selectedTeacher === "all" ||
        course.teacher === state.selectedTeacher;

      return matchesQuery && matchesTeacher;
    });
  }, [courseList, state.query, state.selectedTeacher]);

  return {
    query: state.query,
    selectedTeacher: state.selectedTeacher,
    teachers,
    filteredCourses,
    setQuery,
    setTeacher,
    resetFilters,
  };
}
