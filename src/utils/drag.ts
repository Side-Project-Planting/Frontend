/* eslint-disable no-param-reassign */

const startEventName = 'mousedown';
const moveEventName = 'mousemove';
const endEventName = 'mouseup';

const getDelta = (startEvent: MouseEvent, moveEvent: MouseEvent) => {
  const se = startEvent;
  const me = moveEvent;

  return {
    deltaX: me.pageX - se.pageX,
    deltaY: me.pageY - se.pageY,
  };
};

export type DropItem = {
  //   droppableId: string;
  id: number;
  index: number;
};

export type DropEvent = {
  source: DropItem;
  destination?: DropItem;
};

export default function registDND(onDrop: (event: DropEvent) => void) {
  const startHandler = (startEvent: MouseEvent) => {
    const item = (startEvent.target as HTMLElement).closest<HTMLElement>('.dnd-item');

    if (!item || item.classList.contains('moving')) {
      return;
    }

    // 여기가 드래그할 때 타겟아이템 관련 id, index다.
    let destination: HTMLElement | null | undefined;
    let destinationItem: HTMLElement | null | undefined;
    let destinationIndex: number;
    let destinationDroppableId: string;
    let destinationId: number;

    const source = item.closest<HTMLElement>('[data-droppable-id]'); // tab을 갖고 있는 ul
    if (!source) throw Error('Need `data-droppable-id` at dnd-item parent');

    let movingItem: HTMLElement;
    // 사실 필요없다.
    const sourceIndex = Number(item.dataset.index);
    const sourceId = Number(item.dataset.id);
    const sourceDroppableId = source.dataset.droppableId!;

    const itemRect = item.getBoundingClientRect();

    // tab이랑 똑같이 생긴애 하나 만든다.
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

    // 사실 여기도 필요 없을 듯
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

      console.log('point', pointTarget);
      const currentDestinationItem = pointTarget?.closest<HTMLElement>('.dnd-item');
      const currentDestination = pointTarget?.closest<HTMLElement>('[data-droppable-id]');
      const currentDestinationDroppableId = currentDestination?.dataset.droppableId;
      const currentDestinationIndex = Number(currentDestinationItem?.dataset.index);
      const currentDestinationId = Number(currentDestinationItem?.dataset.id);

      console.log('currentDestinationId', currentDestinationId, currentDestinationIndex, currentDestinationItem);

      const currentSourceItem = movingItem ?? item;
      const currentSourceIndex = Number(currentSourceItem.dataset.index);
      const currentSourceId = Number(currentSourceItem.dataset.id);
      const currentSource = currentSourceItem.closest<HTMLElement>('[data-droppable-id]')!;
      const currentSourceDroppableId = currentSource.dataset.droppableId;

      console.log('currentSourceId', currentSourceId);

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
        destinationDroppableId = currentDestinationDroppableId;
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

      console.log(
        `'${currentSourceDroppableId}': ${currentSourceIndex} -> '${currentDestinationDroppableId}': ${currentDestinationIndex}`,
      );

      if (!currentDestinationItem) {
        return;
      }

      const ITEM_MARGIN = 24;
      const distance = itemRect.width + ITEM_MARGIN;

      console.log(itemRect);

      destinationItem = currentDestinationItem;
      destination = currentDestinationItem.closest<HTMLElement>('[data-droppable-id]');
      destinationDroppableId = `${destination?.dataset.droppableId}`;
      destinationId = Number(destinationItem.dataset.id);

      console.log('destinationItem', destinationItem, destinationId);

      const isForward = currentSourceIndex < currentDestinationIndex;
      const isDestinationMoved = destinationItem.classList.contains('moved');
      let indexDiff = currentDestinationIndex - currentSourceIndex;
      if (isDestinationMoved) {
        indexDiff += isForward ? -1 : 1;
      }
      destinationIndex = currentSourceIndex + indexDiff;

      //   드래그 할 때 이동
      const transX = indexDiff * distance;
      console.log('isForward', isForward, 'transX', transX);
      currentSourceItem.style.transform = `translate3d(${transX}px, 0, 0)`;

      let target = currentDestinationItem;
      while (target && target.classList.contains('dnd-item') && !target.classList.contains('placeholder')) {
        console.log('플레이스홀더');
        if (isDestinationMoved) {
          target.style.transform = '';
          target.classList.remove('moved');
          target = (isForward ? target.nextElementSibling : target.previousElementSibling) as HTMLElement;
        } else {
          console.log('밑으로 간다');
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

    const endHandler = () => {
      const sourceItem = movingItem ?? item;
      item.classList.remove('placeholder');
      movingItem?.classList.remove('placeholder');

      document.body.removeAttribute('style');
      //   clearDroppableShadow();

      const elementRect = sourceItem.getBoundingClientRect();
      ghostItem.classList.add('moving');
      ghostItem.style.left = `${elementRect.left}px`;
      ghostItem.style.top = `${elementRect.top}px`;
      ghostItem.style.opacity = '1';
      ghostItem.style.transform = 'none';
      ghostItem.style.borderWidth = '0px';
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

          console.log(
            `result >> '${sourceDroppableId}': ${sourceIndex} -> '${destinationDroppableId}': ${destinationIndex}`,
          );

          onDrop({
            source: {
              //   droppableId: sourceDroppableId,
              id: sourceId,
              index: sourceIndex,
            },
            destination: destination
              ? {
                  //   droppableId: destinationDroppableId,
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
    document.addEventListener(endEventName, endHandler, { once: true });
  };

  document.addEventListener(startEventName, startHandler);
  return () => document.removeEventListener(startEventName, startHandler);
}
