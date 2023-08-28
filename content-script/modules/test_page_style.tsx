import styled from "styled-components";

const Mydiv = styled.div`
  overflow: scroll;
  position: absolute;
  left: 20px;
  z-index: 10;
  margin-left: 20%;
  margin-right: auto;
  margin-top: 100px;
  width: 900px;
  max-width: 700px;
  img {
    max-width: 600px;
    height: auto;
    margin: 0 auto;
  }
  video {
    max-width: 600px;
    height: auto;
  }
  background-color: #eaddff;
  .flex {
    display: flex;
  }
  .flex-col {
    flex-direction: column;
  }
  .gap-4 {
    gap: 1rem;
  }
  .p-4 {
    padding: 1rem;
  }
  .shadow-sm {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }
  .rounded-md {
    border-radius: 0.375rem;
  }
  .text-white {
    --tw-text-opacity: 1;
    color: rgba(255, 255, 255, var(--tw-text-opacity));
  }
`;

export { Mydiv };
