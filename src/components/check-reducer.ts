import type { Task } from "./tasks-container";

type Actions =
  | { type: "description"; payload: { id: number; description: string } }
  | { type: "check"; id: number }
  | { type: "filter"; payload: string }
  | { type: "step"; payload: State["step"] };

type State = {
  isComplete: boolean;
  filter: string;
  checks: Task[];
  step: "checks" | "summary" | "success";
};

export const initialState: State = {
  isComplete: false,
  filter: "all",
  checks: [],
  step: "checks"
};

export function reducer(state: typeof initialState, action: Actions): State {
  switch (action.type) {
    case "check": {
      const newChecks = state.checks.map(task => {
        return {
          ...task,
          checked: task.id === action.id ? !task.checked : task.checked
        };
      });

      const isComplete = newChecks.every(task => task.checked);
      return { ...state, checks: newChecks, isComplete };
    }

    case "description": {
      const newChecks = state.checks.map(task => {
        return {
          ...task,
          description: task.id === action.payload.id ? action.payload.description : task.description
        };
      });
      return { ...state, checks: newChecks };
    }
    case "filter": {
      console.log(action.payload);
      return { ...state, filter: action.payload };
    }
    case "step": {
      if (action.payload === "summary") {
        fetch("/api/user_checks", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: state.checks })
        });
      }
      return {
        ...state,
        step: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
