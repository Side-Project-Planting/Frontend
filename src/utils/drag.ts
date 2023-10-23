/* eslint-disable no-param-reassign */

export type TDropItem = {
  id: number;
  index: number;
};

export type TDropEvent = {
  source: TDropItem;
  destination?: TDropItem;
};

const startEventName = 'mousedown';
const moveEventName = 'mousemove';
const endEventName = 'mouseup';

// x, y 방향 이동 거리 반환하는 함수
const getDelta = (startEvent: MouseEvent, moveEvent: MouseEvent) => {
  return {
    deltaX: moveEvent.pageX - startEvent.pageX,
    deltaY: moveEvent.pageY - startEvent.pageY,
  };
};

export default function registDND(onDrop: (event: TDropEvent) => void) {
  const handleStart = (startEvent: MouseEvent) => {
    // 드래그할 탭 요소
    const item = (startEvent.target as HTMLElement).closest<HTMLElement>('.dnd-item');

    if (!item || item.classList.contains('moving')) return;

    // 탭을 드래그해서 이동시킬 목표지점
    // (EX) tabOrder=[2, 1, 3]이고 id=2인 탭을 id=3인 탭으로 옮기고 싶을 때
    // id=3인 탭이 속한 부모 요소
    let destination: HTMLElement | null | undefined;
    // id=3인 탭 요소
    let destinationItem: HTMLElement | null | undefined;
    // id=3인 탭의 index는 2
    let destinationIndex: number;
    // id=3인 탭의 id는 3
    let destinationId: number;

    // 드래그되는 탭 관련
    // id=2인 탭이 속한 부모 요소
    const source = item.closest<HTMLElement>('[data-droppable-id]');
    // id=2인 탭의 index는 0
    const sourceIndex = Number(item.dataset.index);
    // id=2인 탭의 id는 2
    const sourceId = Number(item.dataset.id);
    if (!source) throw Error('dnd-item의 부모 요소에는 data-droppable-id가 주어져야 합니다.');

    let movingItem: HTMLElement;

    const itemRect = item.getBoundingClientRect();

    // tab이랑 똑같이 생긴 ghost 탭 요소 생성
    const ghostItem = item.cloneNode(true) as HTMLElement;
    ghostItem.classList.add('ghost');
    ghostItem.style.position = 'fixed';
    ghostItem.style.top = `${itemRect.top}px`;
    ghostItem.style.left = `${itemRect.left}px`;
    ghostItem.style.width = `${itemRect.width}px`;
    ghostItem.style.height = `${itemRect.height}px`;
    ghostItem.style.pointerEvents = 'none';

    ghostItem.style.opacity = '0.95';
    ghostItem.style.boxShadow = '0 30px 60px rgba(0, 0, 0, .2)';
    ghostItem.style.transition = 'transform 200ms ease, opacity 200ms ease, boxShadow 200ms ease';

    // placeholder 아이템이 들어갈 자리를 만들어준다.
    item.style.cursor = 'grabbing';
    item.classList.add('placeholder');

    document.body.style.cursor = 'grabbing';
    document.body.appendChild(ghostItem);

    // ghost가 아닌 dnd-item탭 요소에 대해서
    document.querySelectorAll<HTMLElement>('.dnd-item:not(.ghost)').forEach((el) => {
      el.style.transition = 'all 200ms ease';
    });

    const handleMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();

      const { deltaX, deltaY } = getDelta(startEvent, moveEvent);
      ghostItem.style.top = `${itemRect.top + deltaY}px`;
      ghostItem.style.left = `${itemRect.left + deltaX}px`;

      const ghostItemRect = ghostItem.getBoundingClientRect();

      // pointTarget : ghostItemRect 객체의 중앙 좌표에 위치한 DOM 요소
      const pointTarget = document.elementFromPoint(
        ghostItemRect.left + ghostItemRect.width / 2,
        ghostItemRect.top + ghostItemRect.height / 2,
      );

      // 현재 목표지점 탭
      // pointTarget으로부터 가장 가까운 className이 "dnd-item"인 탭이 목표지점 탭이 됨
      const currentDestinationItem = pointTarget?.closest<HTMLElement>('.dnd-item');
      const currentDestination = pointTarget?.closest<HTMLElement>('[data-droppable-id]');
      const currentDestinationDroppableId = currentDestination?.dataset.droppableId;
      const currentDestinationIndex = Number(currentDestinationItem?.dataset.index);

      // 현재 드래그되는 탭
      const currentSourceItem = movingItem || item;
      const currentSource = currentSourceItem.closest<HTMLElement>('[data-droppable-id]')!;
      const currentSourceDroppableId = currentSource.dataset.droppableId;
      const currentSourceIndex = Number(currentSourceItem.dataset.index);

      // 목표지점 탭이 없는 경우 return
      if (!currentDestinationItem) return;
      // 드래그되는 탭과 목표지점 탭이 같은 경우 return
      if (currentDestinationItem?.isSameNode(currentSourceItem) || currentDestinationItem?.classList.contains('moving'))
        return;

      if (
        currentDestination &&
        currentDestinationDroppableId &&
        currentDestinationDroppableId !== currentSourceDroppableId
      ) {
        if (!movingItem) {
          movingItem = item.cloneNode(true) as HTMLElement;
          item.classList.remove('dnd-item');
          item.style.display = 'none';
        }

        currentDestination.appendChild(movingItem);
        destination = currentDestination;
        destinationIndex = currentDestination.querySelectorAll('.dnd-item').length - 1;

        currentDestination.querySelectorAll<HTMLElement>('.dnd-item').forEach((el, idx) => {
          el.dataset.index = `${idx}`;
          el.style.transform = '';
          el.classList.remove('moved');
        });
        currentSource.querySelectorAll<HTMLElement>('.dnd-item').forEach((el, idx) => {
          el.dataset.index = `${idx}`;
          el.style.transform = '';
          el.classList.remove('moved');
        });
      }

      // 탭 마진 값
      const TAB_MARGIN = 24;
      const distance = itemRect.width + TAB_MARGIN;

      destinationItem = currentDestinationItem;
      destination = currentDestinationItem.closest<HTMLElement>('[data-droppable-id]');
      destinationId = Number(destinationItem.dataset.id);

      // 드래그하는 방향 (앞: index가 0 => 1)
      // bug: 드래그하다가 방향을 바꾸는 경우 isForward를 제대로 판단할 수 없음
      const isForward = currentSourceIndex < currentDestinationIndex;
      // console.log(isForward);
      const isDestinationMoved = destinationItem.classList.contains('moved');
      let indexDiff = currentDestinationIndex - currentSourceIndex;
      if (isDestinationMoved) {
        indexDiff += isForward ? -1 : 1;
      }
      destinationIndex = currentSourceIndex + indexDiff;

      // 드래그 할 때 움직일 거리
      const transX = indexDiff * distance;
      currentSourceItem.style.transform = `translate(${transX}px, 0)`;

      let target = currentDestinationItem;
      while (target && target.classList.contains('dnd-item') && !target.classList.contains('placeholder')) {
        if (isDestinationMoved) {
          target.style.transform = '';
          target.classList.remove('moved');
          target = (isForward ? target.nextElementSibling : target.previousElementSibling) as HTMLElement;
        } else {
          target.style.transform = `translate(${isForward ? -distance : distance}px, 0)`;
          target.classList.add('moved');
          target = (isForward ? target.previousElementSibling : target.nextElementSibling) as HTMLElement;
        }
      }

      currentDestinationItem.classList.add('moving');
      currentDestinationItem.addEventListener(
        'transitionend',
        () => {
          currentDestinationItem?.classList.remove('moving');
        },
        { once: true }, // 이벤트가 한 번만 일어나도록하는 옵션
      );
      setTimeout(() => {
        currentDestinationItem?.classList.remove('moving');
      }, 200);
    };

    const handleEnd = () => {
      const sourceItem = movingItem || item;
      item.classList.remove('placeholder');
      movingItem?.classList.remove('placeholder');

      document.body.removeAttribute('style');

      const elementRect = sourceItem.getBoundingClientRect();
      ghostItem.classList.add('moving');
      ghostItem.style.left = `${elementRect.left}px`;
      ghostItem.style.top = `${elementRect.top}px`;
      ghostItem.style.opacity = '1';
      ghostItem.style.transform = 'none';
      ghostItem.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.15)';
      ghostItem.style.transition = 'all 200ms ease';

      ghostItem.addEventListener(
        'transitionend',
        () => {
          setTimeout(() => {
            document.querySelectorAll<HTMLElement>('.dnd-item').forEach((el) => {
              el.removeAttribute('style');
              el.classList.remove('moving', 'moved');
            });

            item.classList.add('dnd-item');
            item.removeAttribute('style');
            movingItem?.remove();
          }, 0);

          ghostItem.remove();

          // 콜백으로 받은 onDrop 함수 실행
          onDrop({
            source: {
              id: sourceId,
              index: sourceIndex,
            },
            destination: destination
              ? {
                  id: destinationId,
                  index: destinationIndex,
                }
              : undefined,
          });
        },
        { once: true },
      );

      document.removeEventListener(moveEventName, handleMove);
    };

    document.addEventListener(moveEventName, handleMove);
    document.addEventListener(endEventName, handleEnd, { once: true });
  };

  document.addEventListener(startEventName, handleStart);
  return () => document.removeEventListener(startEventName, handleStart);
}
