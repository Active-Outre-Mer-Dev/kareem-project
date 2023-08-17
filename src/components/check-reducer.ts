import { Check } from "@/lib/check";

type Actions =
  | { type: "description"; payload: { id: string; description: string } }
  | { type: "check"; payload: { id: string; condition: string } }
  | { type: "filter"; payload: string }
  | { type: "step"; payload: State["step"] }
  | { type: "condition"; payload: { condition: string; id: string } };

type State = {
  isComplete: boolean;
  filter: string;
  checks: Check[];
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
          condition: task.id === action.payload.id ? action.payload.condition : task.condition
        };
      });

      const isComplete = newChecks.every(task => task.checked);
      return { ...state, checks: newChecks, isComplete };
    }
    case "condition": {
      const newChecks = state.checks.map(check => {
        return {
          ...check,
          condition: check.id === action.payload.id ? action.payload.condition : check.condition
        };
      });
      const isComplete = newChecks.every(check => check.condition);
      return {
        ...state,
        checks: newChecks,
        isComplete
      };
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
      // if (action.payload === "summary") {
      //   fetch("/api/user_checks", {
      //     method: "PUT",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ data: state.checks })
      //   });
      // }
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
