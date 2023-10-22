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

const getDelta = (startEvent: MouseEvent, moveEvent: MouseEvent) => {
  return {
    deltaX: moveEvent.pageX - startEvent.pageX,
    deltaY: moveEvent.pageY - startEvent.pageY,
  };
};

export default function registDND(onDrop: (event: TDropEvent) => void) {
  const handleStart = (startEvent: MouseEvent) => {
    const item = (startEvent.target as HTMLElement).closest<HTMLElement>('.dnd-item');

    if (!item || item.classList.contains('moving')) {
      return;
    }

    let destination: HTMLElement | null | undefined;
    let destinationItem: HTMLElement | null | undefined;
    let destinationIndex: number;
    let destinationId: number;

    // tab을 갖고 있는 ul
    const source = item.closest<HTMLElement>('[data-droppable-id]');
    if (!source) throw Error('Need `data-droppable-id` at dnd-item parent');

    let movingItem: HTMLElement;

    const sourceIndex = Number(item.dataset.index);
    const sourceId = Number(item.dataset.id);

    const itemRect = item.getBoundingClientRect();

    // tab이랑 똑같이 생긴 ghost 요소를 만든다.
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
    ghostItem.style.transform = 'scale(1.05)';
    ghostItem.style.transition = 'transform 200ms ease, opacity 200ms ease, boxShadow 200ms ease';

    // placeholder 아이템이 들어갈 자리를 만들어준다.
    item.classList.add('placeholder');
    item.style.cursor = 'grabbing';

    document.body.style.cursor = 'grabbing';
    document.body.appendChild(ghostItem);

    // 고스트가 아닌 dnd-item에 item에 대해서
    document.querySelectorAll<HTMLElement>('.dnd-item:not(.ghost)').forEach((el) => {
      el.style.transition = 'all 200ms ease';
    });

    const moveHandler = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();

      const { deltaX, deltaY } = getDelta(startEvent, moveEvent);
      ghostItem.style.top = `${itemRect.top + deltaY}px`;
      ghostItem.style.left = `${itemRect.left + deltaX}px`;

      const ghostItemRect = ghostItem.getBoundingClientRect();

      const pointTarget = document.elementFromPoint(
        ghostItemRect.left + ghostItemRect.width / 2,
        ghostItemRect.top + ghostItemRect.height / 2,
      );

      const currentDestinationItem = pointTarget?.closest<HTMLElement>('.dnd-item');
      const currentDestination = pointTarget?.closest<HTMLElement>('[data-droppable-id]');
      const currentDestinationDroppableId = currentDestination?.dataset.droppableId;
      const currentDestinationIndex = Number(currentDestinationItem?.dataset.index);

      const currentSourceItem = movingItem ?? item;
      const currentSourceIndex = Number(currentSourceItem.dataset.index);
      const currentSource = currentSourceItem.closest<HTMLElement>('[data-droppable-id]')!;
      const currentSourceDroppableId = currentSource.dataset.droppableId;

      if (
        currentDestinationItem?.isSameNode(currentSourceItem) ||
        currentDestinationItem?.classList.contains('moving')
      ) {
        return;
      }

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

        currentDestination.querySelectorAll<HTMLElement>('.dnd-item').forEach((v, i) => {
          v.dataset.index = `${i}`;
          v.style.transform = '';
          v.classList.remove('moved');
        });
        currentSource.querySelectorAll<HTMLElement>('.dnd-item').forEach((v, i) => {
          v.dataset.index = `${i}`;
          v.style.transform = '';
          v.classList.remove('moved');
        });
      }

      if (!currentDestinationItem) {
        return;
      }

      const TAB_MARGIN = 24;
      const distance = itemRect.width + TAB_MARGIN;

      destinationItem = currentDestinationItem;
      destination = currentDestinationItem.closest<HTMLElement>('[data-droppable-id]');
      destinationId = Number(destinationItem.dataset.id);

      const isForward = currentSourceIndex < currentDestinationIndex;
      const isDestinationMoved = destinationItem.classList.contains('moved');
      let indexDiff = currentDestinationIndex - currentSourceIndex;
      if (isDestinationMoved) {
        indexDiff += isForward ? -1 : 1;
      }
      destinationIndex = currentSourceIndex + indexDiff;

      //   드래그 할 때 이동
      const transX = indexDiff * distance;
      currentSourceItem.style.transform = `translate3d(${transX}px, 0, 0)`;

      let target = currentDestinationItem;
      while (target && target.classList.contains('dnd-item') && !target.classList.contains('placeholder')) {
        if (isDestinationMoved) {
          target.style.transform = '';
          target.classList.remove('moved');
          target = (isForward ? target.nextElementSibling : target.previousElementSibling) as HTMLElement;
        } else {
          target.style.transform = `translate3d(${isForward ? -distance : distance}px, 0 , 0)`;
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
        { once: true },
      );
      setTimeout(() => {
        currentDestinationItem?.classList.remove('moving');
      }, 200);
    };

    const handleEnd = () => {
      const sourceItem = movingItem ?? item;
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

          onDrop({
            source: {
              id: sourceId,
              index: sourceIndex,
            },
            destination: destination
              ? {
                  id: destinationId, // 타겟 탭 id가 와야함
                  index: destinationIndex,
                }
              : undefined,
          });
        },
        { once: true },
      );

      document.removeEventListener(moveEventName, moveHandler);
    };

    document.addEventListener(moveEventName, moveHandler, { passive: false });
    document.addEventListener(endEventName, handleEnd, { once: true });
  };

  document.addEventListener(startEventName, handleStart);
  return () => document.removeEventListener(startEventName, handleStart);
}
