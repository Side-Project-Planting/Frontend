import { IPlan, ITab } from 'types';

import { IDropEvent } from '@utils/drag';

export const initialState: IPlan = {
  id: 0,
  title: '',
  description: '',
  public: false,
  members: [],
  tabOrder: [],
  tabs: [],
  labels: [],
  tasks: [],
};

export type PlanAction =
  | { type: 'SET_PLAN'; payload: IPlan }
  | { type: 'FILTER'; payload: { labels: number[]; members: number[] } }
  | { type: 'TAB_DRAG_AND_DROP'; payload: IDropEvent }
  | { type: 'ADD_TAB'; payload: { newTabTitle: string; newTabId: number } }
  | { type: 'DELETE_TAB'; payload: { tabId: number } };

const planReducer = (state: IPlan, action: PlanAction) => {
  switch (action.type) {
    case 'SET_PLAN':
      return { ...action.payload };
    case 'FILTER': {
      const { labels, members } = action.payload;
      const filteredTasks = state?.tasks.filter((task) => {
        const labelFilter = labels.length === 0 || task.labels.some((label) => labels.includes(label));
        const memberFilter = members.length === 0 || members.includes(task.assigneeId!);

        return labelFilter && memberFilter;
      });

      return { ...state, tasks: filteredTasks };
    }

    case 'TAB_DRAG_AND_DROP': {
      const { source, destination } = action.payload;

      if (!destination) return state;
      if (source.index === destination.index) return state;
      if (!state) return state;

      const newTabOrder = [...state.tabOrder];
      const draggedTabIndex = newTabOrder.indexOf(source.id);
      const targetTabIndex = newTabOrder.indexOf(destination.id);
      newTabOrder.splice(draggedTabIndex, 1);
      newTabOrder.splice(targetTabIndex, 0, source.id);

      return { ...state, tabOrder: newTabOrder };
    }
    case 'ADD_TAB': {
      if (!state) return state;
      const { newTabTitle, newTabId } = action.payload;
      const newTab: ITab = {
        id: newTabId,
        title: newTabTitle,
      };
      const updatedTabs = [...state.tabs, newTab];
      const updatedTabOrder = [...state.tabOrder, newTab.id];

      return { ...state, tabs: updatedTabs, tabOrder: updatedTabOrder };
    }
    case 'DELETE_TAB': {
      if (!state) return state;
      const { tabId } = action.payload;
      const updatedTabOrder = state.tabOrder.filter((item) => item !== tabId);
      const updatedTabs = state.tabs.filter((tab) => tab.id !== tabId);

      return { ...state, tabOrder: updatedTabOrder, tabs: updatedTabs };
    }
    default:
      return state;
  }
};

export default planReducer;
