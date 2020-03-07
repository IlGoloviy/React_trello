export default function reducer(state = {
  OnHold: [],
  InProgress: [],
  NeedsReview: [],
  Approved: [],
  tasks: []
}, action) {

  switch (action.type) {
    case 'GET_DATA_FULFILLED': {
      return {
        ...state,
        tasks: action.payload
      }
    }
    case 'ADD_TASK_FULFILLED': {
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      }
    }
    case 'ADD_IN-PROGRESS': {
      return {
        ...state,
        InProgress: [...state.InProgress, action.payload]
      }
    }
    case 'ADD_NEEDS-REVIEW': {
      return {
        ...state,
        NeedsReview: [...state.NeedsReview, action.payload]
      }
    }
    case 'ADD_APPROVED': {
      return {
        ...state,
        Approved: [...state.Approved, action.payload]
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
    case 'DELETE_TASK': {
      return {
        ...action.payload
      }
    }
    default: {
      return state;
    }
  }
}