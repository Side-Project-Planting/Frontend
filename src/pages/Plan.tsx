import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosStarOutline } from 'react-icons/io';
import { CiSettings } from 'react-icons/ci';
import { SlPlus } from 'react-icons/sl';
import Tab from '../components/Tab';
import MemberFilter from '../components/MemberFilter';
import LabelFilter from '../components/LabelFilter';

interface Task {
  title: string;
  labels: string[];
  assignee: string;
  order: number;
}

type TabType = {
  id: number;
  title?: string;
  order?: number;
  tasks?: Task[];
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
  padding-right: 10rem;
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  position: relative;
`;

const AddTapButton = styled.button`
  background: none;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

const planObject = {
  title: 'planting',
  description: '안녕하세요 저희는 일정 공유 관리 서비스를 개발하고 있는 플랜팅입니다.',
  isPublic: true,
  members: [
    { id: 1, name: '신우성', imgUrl: '', isAdmin: true },
    { id: 2, name: '김태훈', imgUrl: '', isAdmin: false },
    { id: 3, name: '허준영', imgUrl: '', isAdmin: false },
    { id: 4, name: '한현', imgUrl: '', isAdmin: false },
  ],
  tabs: [
    {
      id: 1,
      title: 'To do',
      order: 0,
      tasks: [{ title: '이펙티브 완독', labels: ['개발도서'], assignee: '허준영', order: 0 }],
    },
    {
      id: 2,
      title: 'In Progress',
      order: 1,
      tasks: [
        { title: '타입스크립트 Chap1', labels: ['개발도서'], assignee: '허준영', order: 0 },
        { title: '백준 삼성 기출', labels: ['코테'], assignee: '허준영', order: 1 },
      ],
    },
    {
      id: 3,
      title: 'Done',
      order: 2,
      tasks: [{ title: 'NC SOFT 서류 제출', labels: ['이력서'], assignee: '허준영', order: 0 }],
    },
  ],
};
function Plan() {
  const [plan, setPlan] = useState<PlanType>(planObject);
  const [selectedPlanName, setSelectedPlanName] = useState<string>('My Plan');
  const [newTabTitle, setNewTabTitle] = useState<string>('');

  const planNameList = [
    { id: 1, name: 'My Plan' },
    { id: 2, name: 'Team Plan1' },
    { id: 3, name: 'Team Plan2' },
    { id: 4, name: 'Team Plan3' },
  ];
  console.log(plan);
  const addTab = () => {
    const newTab: TabType = {
      id: planObject.tabs.length + 1,
    };
    setPlan({ ...plan, tabs: [...plan.tabs, newTab] });
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
          {planObject.tabs.map((item) => (
            <Tab
              key={item.id}
              title={item.title}
              newTabTitle={newTabTitle}
              onEdit={editTabInfo}
              setNewTabTitle={setNewTabTitle}
            />
          ))}
          {/* TODO 클릭시 탭 추가 */}
          <AddTapButton onClick={addTab}>
            <SlPlus size={35} color="#8993A1" />
          </AddTapButton>
        </TabGroup>
      </MainContainer>
    </Wrapper>
  );
}

export default Plan;
