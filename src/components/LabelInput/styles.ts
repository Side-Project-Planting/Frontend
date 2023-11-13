import styled from 'styled-components';

export const LabelsWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  #label-search {
    position: absolute;
    width: 100%;
    max-height: 10rem;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    border-top: 1px solid lightgray;
    border-radius: 0 0 8px 8px;
    background-color: #fafafa;
  }

  #no-coincide-label {
    padding: 1rem;
  }
`;

export const LabelsContainer = styled.div`
  height: 5rem;
  padding: 0.3rem 1rem;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  align-items: center;
  gap: 0.5rem;
  background-color: #fafafa;
  border-radius: 8px;
  font-size: 0.9rem;

  #labels {
    padding: 1rem 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    overflow: auto;
    gap: 0.5rem;
  }

  #task-label-input {
    width: 5rem;
    height: 2rem;
  }
`;

export const SearchedLabel = styled.button.attrs<{ id: number; $isFocus: boolean }>((props) => ({
  id: props.id,
}))`
  padding: 0.5rem 1rem;
  border: 0;
  background-color: ${(prop) => (prop.$isFocus ? 'rgb(127, 127, 127, 0.3)' : 'transparent')};
  text-align: start;
`;
