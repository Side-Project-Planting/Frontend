/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, useRef } from 'react';

import { Droppable, DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd';
import { CiSettings } from 'react-icons/ci';
import { IoIosStarOutline } from 'react-icons/io';
import { SlPlus } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { ITask, ITab } from 'types';

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
  EmptyPlanContainer,
  EmptyPlanContents,
} from './styles';

import { getAllPlanTitles } from '@apis';
import { ReactComponent as EmptyPlan } from '@assets/images/emptyPlan.svg';
import LabelFilter from '@components/LabelFilter';
import MemberFilter from '@components/MemberFilter';
import Modal from '@components/Modal';
import { ModalButton } from '@components/Modal/CommonModalStyles';
import { Tab, TasksContainer } from '@components/Tab';
import { usePlan } from '@hooks/usePlan';
import { usePlanTitle } from '@hooks/usePlanTitle';
import { useUpdateTab } from '@hooks/useUpdateTab';
import { currentPlanIdState, accessTokenState } from '@recoil/atoms';
import { useQueryClient } from '@tanstack/react-query';
import { authenticate } from '@utils/auth';

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
  const initialState = {
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
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [sortedTabs, setSortedTabs] = useState<{ id: number; title: string; taskOrder?: number[] }[]>([]);
  const [tasks, setTasks] = useState<Record<number, ITask[]>>({});
  const [currentPlanId, setCurrentPlanId] = useRecoilState(currentPlanIdState);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [newTabTitle, setNewTabTitle] = useState<string>('');
  const [isAddingTab, setIsAddingTab] = useState<boolean>(false);

  const [selectedLabels, setSelectedLabel] = useState<number[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const { plan, tasksByTab } = usePlan(currentPlanId, selectedLabels, selectedMembers);
  const { createTabMutate, deleteTabMutate, dragTabMutate } = useUpdateTab(Number(plan.id));

  const queryClient = useQueryClient();
  const { allPlanTitles } = usePlanTitle();

  const navigate = useNavigate();

  useEffect(() => {
    setTasks(tasksByTab);
    const tabById: Record<number, ITab> = {};
    plan.tabs.forEach((tab) => {
      tabById[tab.id] = tab;
    });
    const newSortedTabs = plan.tabOrder.map((tabId) => {
      return tabById[tabId];
    });
    setSortedTabs(newSortedTabs);
  }, [plan]);

  useEffect(() => {
    const checkAccessTokenAndGetPlanTitles = async () => {
      try {
        await authenticate(accessToken, setAccessToken, async () => {
          await queryClient.prefetchQuery({
            queryKey: ['allPlanTitles'],
            queryFn: getAllPlanTitles,
            // prefetch는 data가 staleTime보다 오래되었을때만 만료된다.
            staleTime: 60000,
          });
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    checkAccessTokenAndGetPlanTitles();
  }, [accessToken, setAccessToken]);

  useEffect(() => {
    if (currentPlanId === -1 && allPlanTitles.length > 0) {
      setCurrentPlanId(allPlanTitles[0].id);
    }
  }, [allPlanTitles]);

  const handleStartAddingTab = () => {
    setIsAddingTab(true);
    setNewTabTitle('');

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleAddTab = async () => {
    if (newTabTitle.trim() === '') {
      setIsAddingTab(false);
    } else {
      const requestBody = {
        planId: currentPlanId,
        title: newTabTitle,
      };

      createTabMutate(requestBody);

      // TODO: 서버에서 받아온 id로 변환해야함
      const newTabId = plan?.tabs.length || 0 + 1;
      setTasks((prev) => {
        const newTasks = { ...prev };
        newTasks[newTabId] = [];
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

  const handleDeleteTab = async (tabId: number) => {
    deleteTabMutate({ planId: currentPlanId, tabId });
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
  const onDragEnd = (result: IDragDropResult) => {
    const { destination, source, draggableId } = result;

    const sourceType = source.droppableId.split('-')[0];

    if (sourceType === 'tab') {
      const newSortedTabs = [...sortedTabs];
      newSortedTabs.splice(source.index, 1);
      newSortedTabs.splice(
        destination.index,
        0,
        sortedTabs.find((tab) => tab.id === Number(draggableId.split('-')[1])) as ITab,
      );

      const newTabOrder = newSortedTabs.map((tab) => tab.id);
      const prevIndex = newTabOrder.indexOf(Number(draggableId.split('-')[1])) - 1;
      const requestData = {
        planId: plan.id,
        targetId: Number(draggableId.split('-')[1]),
        newPrevId: prevIndex === -1 ? null : newTabOrder[prevIndex],
      };

      dragTabMutate(requestData);
      setSortedTabs(newSortedTabs);
    }

    if (sourceType === 'task') {
      if (!destination) return;

      if (destination.droppableId === source.droppableId && destination.index === source.index) return;

      const start = tasks[+Number(source.droppableId.split('-')[1])];
      const finish = tasks[+Number(destination.droppableId.split('-')[1])] || [];
      const updatedTask = start[source.index];

      start.splice(source.index, 1);
      if (start === finish) {
        start.splice(destination.index, 0, updatedTask);
        setTasks((prev) => {
          const newTasks = { ...prev };
          newTasks[+Number(source.droppableId.split('-')[1])] = [...start];
          return newTasks;
        });
        return;
      }
      updatedTask.tabId = +Number(destination.droppableId.split('-')[1]);
      finish.splice(destination.index, 0, updatedTask);
      // TODO: order가 추가될 수 있음
      const newStart = [...start];
      const newFinish = [...finish];
      setTasks((prev) => {
        const newTasks = {
          ...prev,
          [Number(source.droppableId.split('-')[1])]: newStart,
          [Number(destination.droppableId.split('-')[1])]: newFinish,
        };
        return newTasks;
      });
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

  return (
    <Wrapper>
      <SideContainer>
        <PlanCategory>
          {allPlanTitles.map((item, idx) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
            <li
              className={
                currentPlanId === -1 ? `${idx === 0 && 'isSelected'}` : `${currentPlanId === item.id && 'isSelected'}`
              }
              key={item.id}
              onClick={() => {
                navigate(`/plan/${item.id}`);
                setCurrentPlanId(item.id);
              }}
            >
              {item.title}
            </li>
          ))}
        </PlanCategory>
        <LabelFilter selectedLabels={selectedLabels} onChange={handleChangeLabel} />
      </SideContainer>
      <MainContainer>
        {plan === initialState && (
          <Wrapper>
            <EmptyPlanContainer>
              <EmptyPlanContents>
                <p>만들어진 플랜이 없어요 😵‍💫</p>
                <EmptyPlan />
                <ModalButton
                  type="button"
                  onClick={() => {
                    navigate('/create-plan');
                  }}
                >
                  새 플랜 만들기
                </ModalButton>
              </EmptyPlanContents>
            </EmptyPlanContainer>
          </Wrapper>
        )}
        <TopContainer>
          <MemberFilter selectedMember={selectedMembers} onClick={handleChangeMember} />
          <UtilContainer>
            <div className="icon">
              <IoIosStarOutline size={18} />
            </div>
            <div
              className="icon"
              onClick={() =>
                navigate('/setting', {
                  state: {
                    id: plan.id,
                    title: plan.title,
                    intro: plan.description,
                    isPublic: plan.public,
                    members: plan.members,
                  },
                })
              }
            >
              <CiSettings size={21} />
            </div>
          </UtilContainer>
        </TopContainer>
        <DragDropContext onDragEnd={onDragEnd as OnDragEndResponder}>
          <Droppable direction="horizontal" droppableId="tab" type="tab">
            {(provided) => (
              <TabGroup
                ref={provided.innerRef}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...provided.droppableProps}
              >
                {sortedTabs.map((item, index) => {
                  return (
                    <Tab
                      id={item.id}
                      key={item.id}
                      index={index}
                      title={item.title}
                      onDeleteTab={() => handleDeleteTab(item.id)}
                      tasks={tasks[item.id] || []}
                      onAddTask={setTasks}
                      // onRemoveTask={handleDeleteTask}
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
                <AddTabButton>
                  <SlPlus size={35} color="#8993A1" onClick={handleStartAddingTab} />
                </AddTabButton>
                {provided.placeholder}
              </TabGroup>
            )}
          </Droppable>
        </DragDropContext>
      </MainContainer>
      <Modal />
    </Wrapper>
  );
}

export default React.memo(Plan);
