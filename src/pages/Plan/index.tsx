/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, useRef } from 'react';

import axios from 'axios';
import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd';
import { CiSettings } from 'react-icons/ci';
import { IoIosStarOutline } from 'react-icons/io';
import { SlPlus } from 'react-icons/sl';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ITask, ITab, IMember, ILabel } from 'types';

import {
  Wrapper,
  SideContainer,
  PlanCategory,
  MainContainer,
  TopContainer,
  UtilContainer,
  TabGroup,
  TabWrapper,
  AddTabButton,
  TabContainer,
} from './styles';

import { getPlanInfo } from '@apis';
import LabelFilter from '@components/LabelFilter';
import MemberFilter from '@components/MemberFilter';
import Modal from '@components/Modal';
import { Tab, TasksContainer } from '@components/Tab';
import { currentPlanIdState, labelsState, membersState, planTitlesState } from '@recoil/atoms';
import registDND, { IDropEvent } from '@utils/drag';

interface IPlan {
  id: number;
  title: string;
  description: string;
  isPublic: boolean;
  members: IMember[];
  tabOrder: number[];
  tabs: ITab[];
  labels: ILabel[];
  tasks: ITask[];
}

interface IDragDropResult {
  source: {
    droppableId: string;
    index: number;
  };
  destination: {
    droppableId: string;
    index: number;
  };
  draggableId: string;
}

function Plan() {
  const { planId } = useParams();
  const [currentPlanId, setCurrentPlanId] = useRecoilState(currentPlanIdState);
  setCurrentPlanId(planId ? +planId : -1);
  const [originalPlan, setOriginalPlan] = useState<IPlan | null>(null);
  const [plan, setPlan] = useState<IPlan | null>(null);
  const [tasks, setTasks] = useState<Record<number, ITask[]>>({});
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [newTabTitle, setNewTabTitle] = useState<string>('');
  const [isAddingTab, setIsAddingTab] = useState<boolean>(false);

  const [selectedLabels, setSelectedLabel] = useState<number[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const setMembers = useSetRecoilState(membersState);
  const setLabels = useSetRecoilState(labelsState);
  const [planTitles, setPlanTitles] = useRecoilState(planTitlesState);

  const navigate = useNavigate();

  const filterAndSetPlan = (data: IPlan, labels: number[], members: number[]) => {
    if (!data) {
      return;
    }

    const filteredTasks = data.tasks.filter((task) => {
      // 라벨 배열의 길이가 0보다 클때만 라벨 필터링
      const labelFilter = labels.length === 0 || task.labels.some((label) => labels.includes(label));
      // 멤버 필터링
      const memberFilter = members.length === 0 || members.includes(task.assigneeId!);

      return labelFilter && memberFilter;
    });

    const filteredPlan = { ...data, tasks: filteredTasks };
    setPlan(filteredPlan);

    const tasksByTab: Record<number, ITask[]> = {};
    filteredTasks.forEach((task) => {
      if (!tasksByTab[task.tabId]) {
        tasksByTab[task.tabId] = [];
      }
      tasksByTab[task.tabId].push(task);
    });
    setTasks(tasksByTab);
  };

  useEffect(() => {
    const getPlanTitles = async () => {
      try {
        const { data } = await axios.get('/api/plans/all');
        setPlanTitles(data);
        if (currentPlanId === -1) setCurrentPlanId(data[0].id);
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
      }
    };
    getPlanTitles();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (currentPlanId === -1) return;
      try {
        const data = await getPlanInfo(currentPlanId);
        setMembers(data.members);
        setLabels(data.labels);
        setOriginalPlan(data); // 원래의 플랜 데이터 저장
        filterAndSetPlan(data, selectedLabels, selectedMembers);
      } catch (error) {
        throw new Error('플랜 정보를 가져오는데 실패했습니다.');
      }
    };

    fetchData();
  }, [currentPlanId]);

  useEffect(() => {
    if (originalPlan) {
      // 원래 플랜 데이터를 기반으로 다시 필터링
      filterAndSetPlan(originalPlan, selectedLabels, selectedMembers);
    }
  }, [selectedLabels, selectedMembers, originalPlan]);

  const handleDrag = ({ source, destination }: IDropEvent) => {
    if (!destination) return;
    if (source.index === destination.index) return;

    if (!plan) return;
    const newTabOrder = [...plan.tabOrder];
    const draggedTabIndex = newTabOrder.indexOf(source.id);
    const targetTabIndex = newTabOrder.indexOf(destination.id);
    newTabOrder.splice(draggedTabIndex, 1);
    newTabOrder.splice(targetTabIndex, 0, source.id);

    setPlan((prev) => {
      if (!prev) return prev;

      return { ...prev, tabOrder: newTabOrder };
    });

    // const prevIndex = newTabOrder.indexOf(source.id) - 1;
    // const requestData = {
    //   planId: plan.id,
    //   targetId: source.id,
    //   newPrevId: prevIndex === -1 ? null : newTabOrder[prevIndex],
    // };
    // TODO: 탭 순서 변경 요청 날리기
  };

  useEffect(() => {
    const clear = registDND(handleDrag);
    return () => clear();
  }, [plan]);

  if (!plan) {
    return <div>Loading...</div>;
  }

  const tabById: Record<number, ITab> = {};
  plan.tabs.forEach((tab) => {
    tabById[tab.id] = tab;
  });
  const sortedTabs = plan.tabOrder.map((tabId) => tabById[tabId]);

  const handleStartAddingTab = () => {
    setIsAddingTab(true);
    setNewTabTitle('');

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleAddTab = () => {
    if (newTabTitle.trim() === '') {
      setIsAddingTab(false);
    } else {
      // TODO: 서버에 탭 추가 요청
      // 서버에서 받아온 tabId를 newTab에 넣어줘야 한다.

      // const requestBody = {
      //   planId,
      //   name: newTabTitle,
      // };
      const newTab: ITab = {
        id: (plan?.tabs.length || 0) + 1,
        title: newTabTitle,
      };

      setPlan((prev) => {
        if (!prev) {
          return prev;
        }
        return { ...plan, tabs: [...plan.tabs, newTab], tabOrder: [...plan.tabOrder, newTab.id] };
      });
      setTasks((prev) => {
        const newTasks = { ...prev };
        newTasks[newTab.id] = [];
        return newTasks;
      });

      setIsAddingTab(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTab();
    }
  };

  const handleDeleteTask = (tabId: number, taskId: number) => {
    if (tasks) {
      setTasks((prev) => {
        const newTasks = { ...prev };
        newTasks[tabId] = newTasks[tabId].filter((task) => task.id !== taskId);
        return newTasks;
      });
    }
  };

  const handleEditTask = (tabId: number, taskId: number, editedTask: ITask) => {
    if (tasks) {
      let idx = 0;
      while (tasks[tabId][idx] && tasks[tabId][idx].id !== taskId) idx += 1;
      setTasks((prev) => {
        const newTasks = { ...prev };
        newTasks[tabId].splice(idx, 1);
        newTasks[tabId].splice(idx, 0, editedTask);
        return newTasks;
      });
    }
  };

  const handleDeleteTab = (tabId: number) => {
    if (plan) {
      const updatedTabOrder = plan.tabOrder.filter((item) => item !== tabId);
      const updatedPlan = { ...plan, tabOrder: updatedTabOrder, tabs: plan.tabs.filter((tab) => tab.id !== tabId) };
      setPlan(updatedPlan);
      // TODO: 서버에 tabId로 삭제 요청
    }
  };

  const handleChangeLabel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const clickedLabel = Number(e.target.value);
    setSelectedLabel((prev) => {
      if (prev.includes(clickedLabel)) {
        return prev.filter((item) => item !== clickedLabel);
      }
      return [...prev, clickedLabel];
    });
  };

  const handleChangeMember = async (memberId: number) => {
    setSelectedMembers((prev) => {
      if (prev.includes(memberId)) {
        return prev.filter((item) => item !== memberId);
      }
      return [...prev, memberId];
    });
  };

  const handleSaveTabTitle = (title: string) => {
    // TODO : 서버로 planId, tabId, title로 title 수정 요청 날리기
    return title;
  };

  const onDragEnd = (result: IDragDropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const start = tasks[+source.droppableId];
    const finish = tasks[+destination.droppableId];

    const updatedTask = start[source.index];
    start.splice(source.index, 1);

    if (start === finish) {
      start.splice(destination.index, 0, updatedTask);

      setTasks((prev) => {
        const newTasks = { ...prev };
        newTasks[+source.droppableId] = [...start];
        return newTasks;
      });
      return;
    }

    updatedTask.tabId = +destination.droppableId;
    finish.splice(destination.index, 0, updatedTask);

    const newStart = [...start].map((item, index) => {
      const newItem = { ...item };
      newItem.order = index;
      return item;
    });
    const newFinish = [...finish].map((item, index) => {
      const newItem = { ...item };
      newItem.order = index;
      return item;
    });

    setTasks((prev) => {
      const newTasks = {
        ...prev,
        [source.droppableId]: newStart,
        [destination.droppableId]: newFinish,
      };
      return newTasks;
    });
  };

  return (
    <Wrapper>
      <SideContainer>
        <PlanCategory>
          {planTitles.map((item, idx) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
            <li
              className={
                currentPlanId === -1 ? `${idx === 0 && 'isSelected'}` : `${currentPlanId === item.id && 'isSelected'}`
              }
              key={item.id}
              onClick={() => {
                navigate(`/plan/${item.id}`);
              }}
            >
              {item.title}
            </li>
          ))}
        </PlanCategory>
        <LabelFilter selectedLabels={selectedLabels} onChange={handleChangeLabel} />
      </SideContainer>
      <MainContainer>
        <TopContainer>
          <MemberFilter selectedMember={selectedMembers} onClick={handleChangeMember} />
          <UtilContainer>
            <div className="icon">
              <IoIosStarOutline size={25} />
            </div>
            <div className="icon" onClick={() => navigate('/setting')}>
              <CiSettings size={28} />
            </div>
          </UtilContainer>
        </TopContainer>
        <TabGroup data-droppable-id={1} className="droppable">
          <DragDropContext onDragEnd={onDragEnd as OnDragEndResponder}>
            <TabContainer>
              {sortedTabs.map((item, index) => {
                return (
                  <Tab
                    id={item.id}
                    key={item.id}
                    index={index}
                    title={item.title}
                    onDeleteTab={() => handleDeleteTab(item.id)}
                    tasks={tasks[item.id]}
                    onSaveTitle={handleSaveTabTitle}
                    onAddTask={setTasks}
                    onRemoveTask={handleDeleteTask}
                    onEditTask={handleEditTask}
                  />
                );
              })}

              {isAddingTab && (
                <TabWrapper>
                  <input
                    type="text"
                    ref={inputRef}
                    value={newTabTitle}
                    onChange={(e) => setNewTabTitle(e.target.value)}
                    onBlur={handleAddTab}
                    onKeyDown={handleInputKeyDown}
                  />
                  <TasksContainer />
                </TabWrapper>
              )}
            </TabContainer>
          </DragDropContext>
          <AddTabButton>
            <SlPlus size={35} color="#8993A1" onClick={handleStartAddingTab} />
          </AddTabButton>
        </TabGroup>
      </MainContainer>
      <Modal />
    </Wrapper>
  );
}

export default Plan;
