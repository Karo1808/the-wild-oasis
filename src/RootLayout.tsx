import { Outlet } from "react-router-dom";
import { useUser } from "./features/authentication/useUser";
import Spinner from "./ui/Spinner";
import { styled } from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RootLayout = () => {
  const { isLoading } = useUser();
  if (isLoading)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  return <Outlet />;
};

export default RootLayout;
