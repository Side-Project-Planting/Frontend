import React, { useEffect, useState, useRef } from 'react';

import { CiSettings } from 'react-icons/ci';
import { IoIosStarOutline } from 'react-icons/io';
import { SlPlus } from 'react-icons/sl';
import styled from 'styled-components';

import { getPlanInfo } from '@apis';
import LabelFilter from '@components/LabelFilter';
import MemberFilter from '@components/MemberFilter';
import { Tab, TasksContainer } from '@components/Tab';
import useModal from '@hooks/useModal';

interface Label {
  id: number;
  value: string;
}

interface TaskType {
  title: string;
  tabId: number;
  labels: Label[];
  assigneeId: number;
  order: number;
}

interface TabType {
  id: number;
  title: string;
}

interface MemberType {
  id: number;
  name: string;
  imgUrl?: string;
  isAdmin: boolean;
}

interface PlanType {
  title: string;
  description: string;
  isPublic: boolean;
  members: MemberType[];
  tabOrder: number[];
  tabs: TabType[] | ArrangedTab[];
  labels: Label[];
  tasks: TaskType[];
}

interface ArrangedTab {
  id: number;
  title: string;
  tasks?: TaskType[];
}

const Wrapper = styled.main`
  width: 100vw;
  min-height: 100vh;
  padding: 110px 70px 40px;
  display: flex;
  gap: 2rem;
  background-color: #f5f5f7;
`;

const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
`;

const PlanCategory = styled.ul`
  width: 11rem;
  height: 50%;
  border-radius: 1rem;
  padding: 2.5rem 1rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  overflow: auto;
  background-color: #ffffff;

  li {
    height: 3rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #8993a1;
    cursor: pointer;

    &.isSelected {
      background-color: #64d4ab;
      border-radius: 0.6rem;
      color: #ffffff;
    }
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TopContainer = styled.div`
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UtilContainer = styled.div`
  display: flex;
  gap: 0.8rem;

  .icon {
    background-color: #ffffff;
    width: 2.8rem;
    height: 2.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const TabGroup = styled.ul`
  width: calc(100vw - 22rem);
  height: calc(100% - 4rem);
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
`;

const AddTapButton = styled.button`
  height: 100%;
  background: none;
  margin-left: 5rem;
`;

const TabWrapper = styled.li`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  input {
    background: none;
    border: 1px solid #000000;
    padding-inline: 0.5rem;
  }

  .cancelTab {
    width: 100px;
    background-color: yellow;
    position: absolute;
    top: 4rem;
    left: 4rem;
    z-index: 10;
  }
`;

const planNameList = [
  { id: 1, name: 'My Plan' },
  { id: 2, name: 'Team Plan1' },
  { id: 3, name: 'Team Plan2' },
  { id: 4, name: 'Team Plan3' },
];

function Plan() {
  const [plan, setPlan] = useState<PlanType | null>(null);
  const [selectedPlanName, setSelectedPlanName] = useState<string>('My Plan');
  const [newTabTitle, setNewTabTitle] = useState<string>('');
  const [isAddingTab, setIsAddingTab] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { Modal, showModal, openModal, closeModal } = useModal();
  const [selectedLabels, setSelectedLabel] = useState<number[]>([]);

  const sortTabsAndFilterPlanByLabels = (data: PlanType, labels: number[]) => {
    if (!data) {
      return data;
    }

    // 라벨 배렬의 길이가 0보다 클때만 라벨 필터링
    const filteredByLabelTasks =
      labels.length > 0
        ? data.tasks.filter((task) => task.labels.some((label) => labels.includes(label.id)))
        : data.tasks;

    // {3: id=3인 탭, 1: id=1인 탭, 2:id=2인 탭}
    const tabIndex: Record<number, ArrangedTab> = {};
    data.tabs.forEach((tab) => {
      tabIndex[tab.id] = { ...tab, tasks: [] };
    });

    filteredByLabelTasks.forEach((task) => {
      const tab = tabIndex[task.tabId];
      if (tab) {
        tab.tasks!.push(task);
      }
    });

    const arrangedTabs = data.tabOrder.map((tabId) => {
      const tab = tabIndex[tabId];
      return tab;
    });

    return { ...data, tabs: arrangedTabs };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPlanInfo();
        const sortedTabsAndFilteredPlan = sortTabsAndFilterPlanByLabels(data, selectedLabels);
        setPlan(sortedTabsAndFilteredPlan);
      } catch (error) {
        throw new Error('플랜 정보를 가져오는데 실패했습니다.');
      }
    };

    fetchData();
  }, [selectedLabels]);

  const handleAddStatus = () => {
    setIsAddingTab(true);
    setNewTabTitle('');

    // 탭 추가 버튼 눌렀을 때 input에 focus
    // 연속으로 두 번쨰 누를 때만 focus가 되는 이상한 현상 있음
    // inputRef가 처음 클릭했을 때 null이다.
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  };

  const handleAddTab = () => {
    if (newTabTitle.trim() === '') {
      setIsAddingTab(false);
    } else {
      const newTab: TabType = {
        id: (plan?.tabs.length || 0) + 1,
        title: newTabTitle,
      };

      setPlan((prev) => {
        if (!prev) {
          return prev;
        }
        return { ...plan!, tabs: [...plan!.tabs, newTab] };
      });

      setIsAddingTab(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTabTitle.trim() !== '') {
      handleAddTab();
    }
    // TODO newTabTitle===""일떄 enter를 누르면 탭 추가 취소
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

  return (
    <Wrapper>
      <SideContainer>
        <PlanCategory>
          {planNameList.map((item) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
            <li
              className={`${selectedPlanName === item.name && 'isSelected'}`}
              key={item.id}
              onClick={() => {
                setSelectedPlanName(item.name);
                // TODO 서버에 planId로 플랜 정보 요청
              }}
            >
              {item.name}
            </li>
          ))}
        </PlanCategory>
        <LabelFilter labelList={plan?.labels || []} selectedLabels={selectedLabels} onChange={handleChangeLabel} />
      </SideContainer>
      <MainContainer>
        {/* TODO 멤버 필터링 */}
        <TopContainer>
          <MemberFilter />
          <UtilContainer>
            {/* TODO 클릭시 즐겨찾기 토글, 설정으로 이동 */}
            <div className="icon">
              <IoIosStarOutline size={25} />
            </div>
            <div className="icon">
              <CiSettings size={28} />
            </div>
          </UtilContainer>
        </TopContainer>
        <TabGroup>
          {plan?.tabs?.map((item) => (
            <Tab
              key={item.id}
              title={item.title!}
              onEdit={() => handleDeleteTab(item.id)}
              tasks={(item as ArrangedTab).tasks!}
              onClickHandler={openModal}
            />
          ))}
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
              {/* TODO 탭 추가하다 취소하는 버튼 추가 */}
              <TasksContainer onClickHandler={openModal} />
            </TabWrapper>
          )}
          <AddTapButton>
            <SlPlus size={35} color="#8993A1" onClick={handleAddStatus} />
          </AddTapButton>
        </TabGroup>
      </MainContainer>
      {showModal && (
        <Modal
          type="addTask"
          onClose={closeModal}
          requestAPI={() => {
            // TODO: 할 일 추가 API 입력
          }}
          members={plan?.members.map((member) => [member.name, member.id.toString()])}
          allLabels={['개발도서', '코테', '이력서']}
        />
      )}
    </Wrapper>
  );
}

export default Plan;
