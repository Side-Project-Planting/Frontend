/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, useRef } from 'react';

import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd';
import { CiSettings } from 'react-icons/ci';
import { IoIosStarOutline } from 'react-icons/io';
import { SlPlus } from 'react-icons/sl';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
// import { ITask, ITab, IMember, ILabel } from 'types';
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
  TabContainer,
  EmptyPlanContainer,
  EmptyPlanContents,
} from './styles';

import { createNewTab, deleteTab, getAllPlanTitles } from '@apis';
import { ReactComponent as EmptyPlan } from '@assets/images/emptyPlan.svg';
import LabelFilter from '@components/LabelFilter';
import MemberFilter from '@components/MemberFilter';
import Modal from '@components/Modal';
import { ModalButton } from '@components/Modal/CommonModalStyles';
import { Tab, TasksContainer } from '@components/Tab';
import { usePlan } from '@hooks/usePlan';
// import { currentPlanIdState, labelsState, membersState, planTitlesState, accessTokenState } from '@recoil/atoms';
import { currentPlanIdState, planTitlesState, accessTokenState } from '@recoil/atoms';
import { authenticate } from '@utils/auth';
import registDND, { IDropEvent } from '@utils/drag';

// interface IPlan {
//   id: number;
//   title: string;
//   description: string;
//   public: boolean;
//   members: IMember[];
//   tabOrder: number[];
//   tabs: ITab[];
//   labels: ILabel[];
//   tasks: ITask[];
// }

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
  const { planId } = useParams();
  const [currentPlanId, setCurrentPlanId] = useRecoilState(currentPlanIdState);
  // const [originalPlan, setOriginalPlan] = useState<IPlan | null>(null);
  const [tasks, setTasks] = useState<Record<number, ITask[]>>({});
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [newTabTitle, setNewTabTitle] = useState<string>('');
  const [isAddingTab, setIsAddingTab] = useState<boolean>(false);

  const [selectedLabels, setSelectedLabel] = useState<number[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  // const setMembers = useSetRecoilState(membersState);
  // const setLabels = useSetRecoilState(labelsState);
  const [planTitles, setPlanTitles] = useRecoilState(planTitlesState);

  const navigate = useNavigate();
  console.log(planTitles);
  const { plan, tasksByTab } = usePlan(currentPlanId, selectedLabels, selectedMembers);

  useEffect(() => {
    const getPlanTitles = async () => {
      try {
        const { data } = await getAllPlanTitles();
        setPlanTitles(data);
        if (currentPlanId === -1 && data.length > 0) setCurrentPlanId(data[0].id);
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
      }
    };

    authenticate(accessToken, setAccessToken, getPlanTitles);
  }, []);

  useEffect(() => {
    // 플랜 4가 삭제되어도 recoil은 4를 갖고 있어서 fetch할때 에러가 난다.
    // setting에서 플랜 삭제시 planTitles에서 4를 없앤다.
    // setting에서 플랜 삭제시 바로 currentPlanId를 planTitles의 0로 바꾸고 싶었지만
    // 0번째를 삭제한 경우 planTitle이 변화가 없기 떄문에 currentPlanId가 삭제된 id와 동일해서 못 받아온다.
    if (planId === undefined && planTitles.length > 0) {
      setCurrentPlanId(planTitles[0].id);
    }
    // const fetchData = async () => {
    //   // planTitles가 빈 배열인 경우 데이터를 가져올 데이터가 없다.
    //   if (currentPlanId === -1 || planTitles.length === 0) return;
    //   try {
    //     const data = await getPlanInfo(planId === undefined ? planTitles[0].id : currentPlanId);
    //     setMembers(data.members);
    //     setLabels(data.labels);
    //     // setOriginalPlan(data); // 원래의 플랜 데이터 저장
    //     // filterAndSetPlan(data, selectedLabels, selectedMembers);
    //   } catch (error) {
    //     throw new Error('플랜 정보를 가져오는데 실패했습니다.');
    //   }
    // };
    // fetchData();
    // 의존성에 planTitles를 넣어줘야 플랜이 없다가 생성했을때 플랜페이지로 돌아와서 plan정보를 받아옴
  }, [planId, planTitles]);

  // useEffect(() => {
  //   if (originalPlan) {
  //     // 원래 플랜 데이터를 기반으로 다시 필터링
  //     // filterAndSetPlan(originalPlan, selectedLabels, selectedMembers);
  //   }
  // }, [selectedLabels, selectedMembers, originalPlan]);

  const handleDrag = ({ source, destination }: IDropEvent) => {
    if (!destination) return;
    if (source.index === destination.index) return;

    if (!plan) return;
    const newTabOrder = [...plan.tabOrder];
    const draggedTabIndex = newTabOrder.indexOf(source.id);
    const targetTabIndex = newTabOrder.indexOf(destination.id);
    newTabOrder.splice(draggedTabIndex, 1);
    newTabOrder.splice(targetTabIndex, 0, source.id);

    // setPlan((prev) => {
    //   if (!prev) return prev;

    //   return { ...prev, tabOrder: newTabOrder };
    // });

    // const prevIndex = newTabOrder.indexOf(source.id) - 1;
    // const requestData = {
    //   planId: plan.id,
    //   targetId: source.id,
    //   newPrevId: prevIndex === -1 ? null : newTabOrder[prevIndex],
    // };
    // TODO: 탭 순서 변경 요청 날리기
  };

  // useEffect(() => {
  //   const clear = registDND(handleDrag);
  //   return () => clear();
  // }, [plan]);

  useEffect(() => {
    const clear = registDND(handleDrag);
    return () => clear();
  }, [tasksByTab]); // Adjust the dependencies based on your use case

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

  const handleAddTab = async () => {
    if (newTabTitle.trim() === '') {
      setIsAddingTab(false);
    } else {
      // TODO: 서버에 탭 추가 요청
      // 서버에서 받아온 tabId를 newTab에 넣어줘야 한다.
      const requestBody = {
        planId: currentPlanId,
        name: newTabTitle,
      };

      try {
        const response = await createNewTab(requestBody);
        // eslint-disable-next-line
        console.log(response);
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
      }

      // const newTab: ITab = {
      //   id: (plan?.tabs.length || 0) + 1,
      //   title: newTabTitle,
      // };

      // setPlan((prev) => {
      //   if (!prev) {
      //     return prev;
      //   }
      //   return { ...plan, tabs: [...plan.tabs, newTab], tabOrder: [...plan.tabOrder, newTab.id] };
      // });

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

  const handleDeleteTab = async (tabId: number) => {
    try {
      const response = await deleteTab(tabId, currentPlanId);

      if (response.status === 204) {
        // eslint-disable-next-line no-alert
        window.alert('탭이 삭제되었습니다.');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error, '탭이 삭제가 되지 않았습니다.');
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

  const handleSaveTabTitle = async (title: string) => {
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

    // TODO: order가 추가될 수 있음
    const newStart = [...start];
    const newFinish = [...finish];

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
              <IoIosStarOutline size={25} />
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
                    tasks={tasksByTab[item.id]}
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

export default React.memo(Plan);
