import { Check } from "@/lib/check";

type Actions =
  | { type: "check"; payload: { id: string; condition: string } }
  | { type: "filter"; payload: string }
  | { type: "step"; payload: State["step"] }
  | { type: "condition"; payload: { condition: string; id: string } }
  | { type: "person"; payload: { person: "boss" | "mechanic"; id: string } }
  | { type: "resolved"; payload: { id: string; resolved: boolean } };

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

    case "filter": {
      return { ...state, filter: action.payload };
    }
    case "step": {
      return {
        ...state,
        step: action.payload
      };
    }
    case "person": {
      const newChecks = state.checks.map(check => ({
        ...check,
        notification:
          check.id === action.payload.id
            ? { ...check.notification, person: action.payload.person }
            : check.notification
      }));
      return { ...state, checks: newChecks };
    }
    case "resolved": {
      const newChecks = state.checks.map(check => ({
        ...check,
        notification:
          check.id === action.payload.id
            ? { ...check.notification, resolved: action.payload.resolved }
            : check.notification
      }));
      return { ...state, checks: newChecks };
    }

    default: {
      return state;
    }
  }
}
