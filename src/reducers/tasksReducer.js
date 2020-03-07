export default function reducer(state = {
    tasks: [],
    OnHold: [],
    InProgress: [],
    NeedsReview: [],
    Approved: [],
  }, action) {
  
    switch (action.type) {
      case 'GET_DATA_FULFILLED': {
        return {
          ...action.payload
        }
      }
      case 'ADD_TASK_ON-HOLD_FULFILLED': {
        return {
          ...state,
          tasks: [...state.tasks, action.payload],
          OnHold: [...state.OnHold, action.payload]
        }
      }
      case 'ADD_TASK_IN-PROGRESS_FULFILLED': {
        return {
          ...state,
          tasks: [...state.tasks, action.payload],
          InProgress: [...state.InProgress, action.payload]
        }
      }
      case 'ADD_TASK_NEEDS-REVIEW_FULFILLED': {
        return {
          ...state,
          tasks: [...state.tasks, action.payload],
          NeedsReview: [...state.NeedsReview, action.payload]
        }
      }
      case 'ADD_TASK_APPROVED_FULFILLED': {
        return {
          ...state,
          tasks: [...state.tasks, action.payload],
          Approved: [...state.Approved, action.payload]
        }
      }
      case 'DELETE_TASK_FULFILLED': {
        return {
          ...state,
          tasks: state.tasks.filter(task => {
            return task.id !== action.payload;
          }),
          OnHold: state.OnHold.filter(task => {
            return task.id !== action.payload
          }),
          InProgress: state.InProgress.filter(task => {
            return task.id !== action.payload
          }),
          NeedsReview: state.NeedsReview.filter(task => {
            return task.id !== action.payload
          }),
          Approved: state.Approved.filter(task => {
            return task.id !== action.payload
          })
        }
      }
      case 'MOVED_TASK_ONHOLD': {
        return {
          ...state,
          OnHold: action.payload
        }
      }
      case 'MOVED_TASK_INPROGRESS': {
        return {
          ...state,
          InProgress: action.payload
        }
      }
      case 'MOVED_TASK_NEEDSREVIEW': {
        return {
          ...state,
          NeedsReview: action.payload
        }
      }
      case 'MOVED_TASK_APPROVED': {
        return {
          ...state,
          Approved: action.payload
        }
      }

      default: {
        return state;
      }
    }
  }