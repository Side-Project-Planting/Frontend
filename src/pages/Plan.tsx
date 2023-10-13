import React, { useEffect, useState, useRef } from 'react';

import { CiSettings } from 'react-icons/ci';
import { IoIosStarOutline } from 'react-icons/io';
import { SlPlus } from 'react-icons/sl';
import styled from 'styled-components';

import { getPlanInfo } from '@apis';
import LabelFilter from '@components/LabelFilter';
import MemberFilter from '@components/MemberFilter';
import { Tab, TasksContainer } from '@components/Tab';

type TaskType = {
  title: string;
  labels: string[];
  assignee: string;
  order: number;
};
type TabType = {
  id: number;
  title?: string;
  order?: number;
  tasks?: TaskType[];
};
type MemberType = {
  id: number;
  name: string;
  imgUrl?: string;
  isAdmin: boolean;
};
type PlanType = {
  title: string;
  description: string;
  isPublic: boolean;
  members: MemberType[];
  tabs: TabType[];
};

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
  const [plan, setPlan] = useState<PlanType>();
  const [selectedPlanName, setSelectedPlanName] = useState<string>('My Plan');
  const [newTabTitle, setNewTabTitle] = useState<string>('');
  const [isAddingTab, setIsAddingTab] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPlanInfo();
        setPlan(data);
      } catch (err) {
        throw new Error('플랜 정보를 가져오는데 실패했습니다.');
      }
    })();
  }, []);

  const handleAddTab = () => {
    setIsAddingTab(true);
    setNewTabTitle('');

    // 탭 추가 버튼 눌렀을 때 input에 focus
    // 연속으로 두 번쨰 누를 때만 focus가 되는 이상한 현상 있음
    // inputRef가 처음 클릭했을 때 null이다.
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  };

  const handleInputBlur = () => {
    if (newTabTitle.trim() === '') {
      setIsAddingTab(false);
    } else {
      const newTab: TabType = {
        id: plan!.tabs.length + 1,
        title: newTabTitle,
      };
      setPlan({ ...plan!, tabs: [...plan!.tabs, newTab] });
      setIsAddingTab(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTabTitle.trim() !== '') {
      const newTab: TabType = {
        id: plan!.tabs.length + 1,
        title: newTabTitle,
      };
      setPlan({ ...plan!, tabs: [...plan!.tabs, newTab] });
      setIsAddingTab(false);
    }
    // TODO newTabTitle===""일떄 enter를 누르면 탭 추가 취소
  };

  const editTabInfo = () => {
    // TODO 탭 정보 수정 및 삭제
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
        <LabelFilter />
        {/* TODO 라벨 필터링 */}
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
          {plan?.tabs?.map((item) => <Tab key={item.id} title={item.title!} onEdit={editTabInfo} />)}
          {isAddingTab && (
            <TabWrapper>
              <input
                type="text"
                ref={inputRef}
                value={newTabTitle}
                onChange={(e) => setNewTabTitle(e.target.value)}
                onBlur={handleInputBlur}
                onKeyDown={handleInputKeyDown}
              />
              {/* TODO 탭 추가하다 취소하는 버튼 추가 */}
              <TasksContainer />
            </TabWrapper>
          )}
          <AddTapButton onClick={handleAddTab}>
            <SlPlus size={35} color="#8993A1" />
          </AddTapButton>
        </TabGroup>
      </MainContainer>
    </Wrapper>
  );
}

export default Plan;
