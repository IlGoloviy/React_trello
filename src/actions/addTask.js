export function addOnHold(body) {
  return {
    type: 'ADD_ON-HOLD',
    payload: body
  }
}

export function addInProgress(body) {
  return {
    type: 'ADD_IN-PROGRESS',
    payload: body
  }
}

export function addNeedsReview(body) {
  return {
    type: 'ADD_NEEDS-REVIEW',
    payload: body
  }
}

export function addApproved(body) {
  return {
    type: 'ADD_APPROVED',
    payload: body
  }
}

export function moveTaskInColumn(tasks, type) {
  return {
    type: `MOVED_TASK_${type.toUpperCase()}`,
    payload: tasks
  }
}

export function deleteTask(body) {
  return {
    type: 'DELETE_TASK',
    payload: body
  }
}